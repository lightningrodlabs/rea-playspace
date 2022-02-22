import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

import {
  Button,
  CircularProgress,
  TextField,
} from '@scoped-elements/material-web';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { contextProvided } from '@holochain-open-dev/context';
import { StoreSubscriber } from 'lit-svelte-stores';

import { sharedStyles } from './utils/shared-styles';
import { CreateHreaModeler } from './create-hrea-modeler';
import { HreaModelerStore } from '../hrea-modeler-store';
import { hreaModelerStoreContext } from '../context';

/**
 * @element hrea-modeler-prompt
 * @slot hero - Will be displayed above the create-hrea-modeler form when the user is prompted with it
 */
export class HreaModelerPrompt extends ScopedElementsMixin(LitElement) {
  /** Public attributes */

  /** Dependencies */

  /**
   * `HreaModelerStore` that is requested via context.
   * Only set this property if you want to override the store requested via context.
   */
  @contextProvided({ context: hreaModelerStoreContext })
  @property({ type: Object })
  store!: HreaModelerStore;

  /** Private properties */

  @state()
  private _loading = true;

  private _myHreaModeler = new StoreSubscriber(this, () => this.store?.myHreaModeler);

  async firstUpdated() {
    await this.store.fetchMyHreaModeler();
    this._loading = false;
  }

  renderPrompt() {
    return html` <div
      class="column"
      style="align-items: center; justify-content: center; flex: 1;"
    >
      ${this._loading
        ? html`<mwc-circular-progress indeterminate></mwc-circular-progress>`
        : html` <div class="column" style="align-items: center;">
            <slot name="hero"></slot>
            <create-hrea-modeler></create-hrea-modeler>
          </div>`}
    </div>`;
  }

  render() {
    return html`
      ${!this._loading && this._myHreaModeler.value
        ? html`<slot></slot>`
        : this.renderPrompt()}
    `;
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      'mwc-textfield': TextField,
      'mwc-button': Button,
      'mwc-circular-progress': CircularProgress,
      'create-hrea-modeler': CreateHreaModeler,
    };
  }

  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: flex;
        }
      `,
    ];
  }
}
