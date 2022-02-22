import { contextProvided } from '@holochain-open-dev/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

import { hreaModelerStoreContext } from '../context';
import { HreaModelerStore } from '../hrea-modeler-store';
import { sharedStyles } from './utils/shared-styles';
import { EditHreaModeler } from './edit-hrea-modeler';
import { HreaModelerDetail } from './hrea-modeler-detail';
import { IconButton } from '@scoped-elements/material-web';
import { UpdateHreaModeler } from './update-hrea-modeler';

/**
 * @element hrea-modeler-detail
 */
export class MyHreaModeler extends ScopedElementsMixin(LitElement) {
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
  private _editing = false;

  render() {
    if (this._editing)
      return html`<update-hrea-modeler
        @hrea-modeler-updated=${() => (this._editing = false)}
      ></update-hrea-modeler>`;

    return html`
      <hrea-modeler-detail .agentPubKey=${this.store.myAgentPubKey}>
        <mwc-icon-button
          slot="action"
          icon="edit"
          @click=${() => (this._editing = true)}
        ></mwc-icon-button>
      </hrea-modeler-detail>
    `;
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      'mwc-icon-button': IconButton,
      'hrea-modeler-detail': HreaModelerDetail,
      'update-hrea-modeler': UpdateHreaModeler,
    };
  }

  static styles = [sharedStyles];
}
