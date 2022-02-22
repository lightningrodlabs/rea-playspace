import { html, LitElement } from 'lit';
import { query, property, state } from 'lit/decorators.js';
import { contextProvided } from '@holochain-open-dev/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { Dictionary } from '@holochain-open-dev/core-types';
import {
  TextField,
  Button,
  Card,
  IconButton,
  Fab,
  CircularProgress,
} from '@scoped-elements/material-web';
import { SlAvatar } from '@scoped-elements/shoelace';

import { sharedStyles } from './utils/shared-styles';
import { HreaModelerStore } from '../hrea-modeler-store';
import { hreaModelerStoreContext } from '../context';
import { resizeAndExport } from './utils/image';
import { EditHreaModeler } from './edit-hrea-modeler';
import { HreaModeler } from '../types';
import { StoreSubscriber } from 'lit-svelte-stores';

/**
 * @element update-hrea-modeler
 * @fires hrea-modeler-updated - Fired after the hreaModeler has been created. Detail will have this shape: { hreaModeler: { nickname, fields } }
 */
export class UpdateHreaModeler extends ScopedElementsMixin(LitElement) {
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

  async updateHreaModeler(hreaModeler: HreaModeler) {
    await this.store.updateHreaModeler(hreaModeler);

    this.dispatchEvent(
      new CustomEvent('hrea-modeler-updated', {
        detail: {
          hreaModeler,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (this._loading)
      return html`<div
        class="column"
        style="align-items: center; justify-content: center; flex: 1;"
      >
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;

    return html`
      <edit-hrea-modeler
        .hreaModeler=${this._myHreaModeler.value}
        save-hrea-modeler-label="Update HreaModeler"
        @save-hrea-modeler=${(e: CustomEvent) =>
          this.updateHreaModeler(e.detail.hreaModeler)}
      ></edit-hrea-modeler>
    `;
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      'mwc-circular-progress': CircularProgress,
      'edit-hrea-modeler': EditHreaModeler,
      'mwc-card': Card,
    };
  }
  static get styles() {
    return [sharedStyles];
  }
}
