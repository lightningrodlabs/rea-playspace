import { contextProvided } from "@holochain-open-dev/context";
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { modelerStoreContext } from "./context";
import { ModelerStore } from "./modeler-store";
import {
  CircularProgress,
} from '@scoped-elements/material-web';
import { ListProfiles } from "@holochain-open-dev/profiles";

const sleep = (ms: number) => new Promise(resolve => setTimeout(() => resolve(null), ms));

export class HreaModeler extends ScopedElementsMixin(LitElement)  {
  
  @state()
  loading = true;

  @contextProvided({ context: modelerStoreContext })
  _modelerStore!: ModelerStore;

  async firstUpdated() {
    await sleep(3);

    this.loading = false;
  }

  render() {
    if (this.loading) {
      return html`<div class="column center-content" style="flex: 1;">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
    }

    return html`
      <style id="chessStyle"></style>
      <div class="row board" style="justify-content: center">
        <h3>Hello from HreaModeler</h3>
        <list-profiles></list-profiles>
      </div>
    `;
  }

  static get scopedElements() {
    return {
      'mwc-circular-progress': CircularProgress,
      'list-profiles': ListProfiles,
    };
  }


}