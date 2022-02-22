import { css, html, LitElement } from 'lit';
import { property, state, query } from 'lit/decorators.js';

import {
  MenuSurface,
  List,
  ListItem,
  TextField,
} from '@scoped-elements/material-web';
import { contextProvided } from '@holochain-open-dev/context';
import { StoreSubscriber } from 'lit-svelte-stores';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';

import { AgentHreaModeler } from '../types';
import { sharedStyles } from './utils/shared-styles';
import { HreaModelerStore } from '../hrea-modeler-store';
import { hreaModelerStoreContext } from '../context';
import { AgentAvatar } from './agent-avatar';

/**
 * @element search-agent
 * @fires agent-selected - Fired when the user selects some agent. Detail will have this shape: { agentPubKey: 'uhCAkSEspAJks5Q8863Jg1RJhuJHJpFWzwDJkxVjVSk9JueU' }
 */
export class SearchAgent extends ScopedElementsMixin(LitElement) {
  /** Public attributes */

  /**
   * Whether to clear the field when an agent is selected.
   * @attr clear-on-select
   */
  @property({ type: Boolean, attribute: 'clear-on-select' })
  clearOnSelect = false;

  /**
   * Whether to include my own agent as a possible agent to select.
   * @attr include-myself
   */
  @property({ type: Boolean, attribute: 'include-myself' })
  includeMyself = false;

  /**
   * Label for the agent searching field.
   * @attr field-label
   */
  @property({ type: String, attribute: 'field-label' })
  fieldLabel = 'Search agent';

  /** Dependencies */

  /**
   * `HreaModelerStore` that is requested via context.
   * Only set this property if you want to override the store requested via context.
   */
  @contextProvided({ context: hreaModelerStoreContext })
  @property({ type: Object })
  store!: HreaModelerStore;

  /** Private properties */

  private _knownHreaModeler = new StoreSubscriber(
    this,
    () => this.store?.knownHreaModeler
  );

  private get _filteredAgents(): Array<AgentHreaModeler> {
    let filtered = Object.entries(this._knownHreaModeler.value)
      .filter(([agentPubKey, hreaModeler]) =>
        hreaModeler.nickname.startsWith(this._currentFilter as string)
      )
      .map(([agentPubKey, hreaModeler]) => ({ agentPubKey, hreaModeler }));
    if (!this.includeMyself) {
      filtered = filtered.filter(
        agent => this.store.myAgentPubKey !== agent.agentPubKey
      );
    }

    return filtered;
  }

  @state()
  private _currentFilter: string | undefined = undefined;

  private _lastSearchedPrefix: string | undefined = undefined;

  @query('#textfield')
  private _textField!: TextField;
  @query('#overlay')
  private _overlay!: MenuSurface;

  firstUpdated() {
    this.addEventListener('blur', () => this._overlay.close());
  }

  async searchAgents(nicknamePrefix: string): Promise<void> {
    this._lastSearchedPrefix = nicknamePrefix;
    await this.store.searchHreaModeler(nicknamePrefix);
  }

  onFilterChange() {
    if (this._textField.value.length < 3) return;

    this._overlay.show();

    this._currentFilter = this._textField.value;

    const filterPrefix = this._currentFilter.slice(0, 3);
    if (filterPrefix !== this._lastSearchedPrefix) {
      this.searchAgents(filterPrefix);
    }
  }

  onUsernameSelected(agent: AgentHreaModeler) {
    // If nickname matches agent, user has selected it
    if (agent) {
      this.dispatchEvent(
        new CustomEvent('agent-selected', {
          detail: {
            agentPubKey: agent.agentPubKey,
          },
        })
      );

      // If the consumer says so, clear the field
      if (this.clearOnSelect) {
        this._textField.value = '';
        this._currentFilter = undefined;
      } else {
        this._textField.value = agent.hreaModeler.nickname;
      }
      this._overlay.close();
    }
  }

  render() {
    return html`
      <div style="position: relative; flex: 1; display: flex;">
        <mwc-textfield
          id="textfield"
          style="flex: 1;"
          class="input"
          .label=${this.fieldLabel}
          placeholder="At least 3 chars..."
          outlined
          @input=${() => this.onFilterChange()}
          @focus=${() => this._currentFilter && this._overlay.show()}
        >
        </mwc-textfield>
        <mwc-menu-surface absolute id="overlay" x="4" y="28">
          ${this._filteredAgents.length > 0
            ? html`
                <mwc-list
                  style="min-width: 80px;"
                  @selected=${(e: CustomEvent) =>
                    this.onUsernameSelected(
                      this._filteredAgents[e.detail.index]
                    )}
                >
                  ${this._filteredAgents.map(
                    agent => html` <mwc-list-item
                      graphic="avatar"
                      .value=${agent.agentPubKey}
                      style="--mdc-list-item-graphic-size: 32px;"
                    >
                      <agent-avatar
                        slot="graphic"
                        .agentPubKey=${agent.agentPubKey}
                      ></agent-avatar>
                      <span style="margin-left: 8px;"
                        >${agent.hreaModeler.nickname}</span
                      >
                    </mwc-list-item>`
                  )}
                </mwc-list>
              `
            : html`<mwc-list-item>No agents match the filter</mwc-list-item>`}
        </mwc-menu-surface>
      </div>
    `;
  }

  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: flex;
        }
        #list {
          margin-top: 16px;
          margin-left: 16px;
        }
      `,
    ];
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      'agent-avatar': AgentAvatar,
      'mwc-textfield': TextField,
      'mwc-menu-surface': MenuSurface,
      'mwc-list': List,
      'mwc-list-item': ListItem,
    };
  }
}
