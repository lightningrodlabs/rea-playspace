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
} from '@scoped-elements/material-web';
import { SlAvatar } from '@scoped-elements/shoelace';

import { sharedStyles } from './utils/shared-styles';
import { HreaModelerStore } from '../hrea-modeler-store';
import { hreaModelerStoreContext } from '../context';
import { resizeAndExport } from './utils/image';
import { EditHreaModeler } from './edit-hrea-modeler';
import { HreaModeler } from '../types';

/**
 * A custom element that fires event on value change.
 *
 * @element create-hrea-modeler
 * @fires hrea-modeler-created - Fired after the hreaModeler has been created. Detail will have this shape: { hreaModeler: { nickname, fields } }
 */
export class CreateHreaModeler extends ScopedElementsMixin(LitElement) {
  /** Dependencies */

  /**
   * `HreaModelerStore` that is requested via context.
   * Only set this property if you want to override the store requested via context.
   */
  @contextProvided({ context: hreaModelerStoreContext })
  @property({ type: Object })
  store!: HreaModelerStore;

  /** Private properties */

  async createHreaModeler(hreaModeler: HreaModeler) {
    await this.store.createHreaModeler(hreaModeler);

    this.dispatchEvent(
      new CustomEvent('hrea-modeler-created', {
        detail: {
          hreaModeler,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <mwc-card>
        <div class="column" style="margin: 16px;">
          <span
            class="title"
            style="margin-bottom: 24px; align-self: flex-start"
            >Create HreaModeler</span
          >
          <edit-hrea-modeler
            save-hrea-modeler-label="Create HreaModeler"
            @save-hrea-modeler=${(e: CustomEvent) =>
              this.createHreaModeler(e.detail.hreaModeler)}
          ></edit-hrea-modeler></div
      ></mwc-card>
    `;
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      'edit-hrea-modeler': EditHreaModeler,
      'mwc-card': Card,
    };
  }
  static get styles() {
    return [sharedStyles];
  }
}
