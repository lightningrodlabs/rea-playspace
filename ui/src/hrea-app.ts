import { LitElement, css, html } from 'lit';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { appUrl, appId, cellRollId } from './constants';
import "@holochain-open-dev/profiles/profile-prompt";
import "@holochain-open-dev/profiles/list-profiles";
import { state } from "lit/decorators.js";
import {
  CircularProgress,
} from '@scoped-elements/material-web';
import {
  CreateProfile,
  Profile,
  ProfilePrompt,
  ProfilesStore,
  profilesStoreContext,
} from "@holochain-open-dev/profiles";
import { ContextProvider, Context } from '@holochain-open-dev/context';
import { HolochainClient } from "@holochain-open-dev/cell-client";
import { StoreSubscriber } from 'lit-svelte-stores';
import { ModelerStore } from './modeler-store';
import { modelerStoreContext } from './context';
import { HreaModeler } from './hrea-modeler';

export class HreaApp extends ScopedElementsMixin(LitElement) {

  _title: string = "Holo-REA Modeler"
  // _appWebsocket: AppWebsocket | undefined;
  // _appInfo: InstalledAppInfo | undefined;
  // _cellData: InstalledCell | undefined;
  _client!: HolochainClient | undefined;
  _cell!:  | undefined;

  // @state()
  // _activeProjectHash: string | undefined = undefined;
  @state()
  _loading = true;
  // @state()
  // _signedIn = false;
  
  _modelerStore!: ContextProvider<Context<ModelerStore>>;
  _profilesStore!: ContextProvider<Context<ProfilesStore>>;

  _myProfile: StoreSubscriber<Profile> = new StoreSubscriber(this, () => this._profilesStore?.value.myProfile);

  async firstUpdated() {
    await this.connectToHolochain();    
    this._loading = false;
  }

  async connectToHolochain() {
    this._client = await HolochainClient.connect(appUrl, appId);
    const cellData = this._client.cellDataByRoleId(cellRollId)!;
    const cellClient = this._client.forCell(cellData);

    //this._cellClient.addSignalHandler((signal: any) => {});

    const modelerStore = new ModelerStore(cellClient);

    // Fetching our profile has a side-effect of executing init
    await modelerStore.profilesStore.fetchMyProfile();

    this._profilesStore = new ContextProvider(
      this,
      profilesStoreContext,
      modelerStore.profilesStore
    );

    this._modelerStore = new ContextProvider(this, modelerStoreContext, modelerStore);
  }

  renderMyProfile() {
    if (!this._myProfile.value) return html``;
    return html`
      <div class="row center-content" slot="actionItems">
        <agent-avatar
          .agentPubKey=${this._profilesStore.value.myAgentPubKey}
        ></agent-avatar>
        <span style="margin: 0 16px;">${this._myProfile.value.nickname}</span>
      </div>
    `;
  }


  render() {
    if (this._loading) {
      return html`<div class="column center-content" style="flex: 1;">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
    }
    return html`
      <main>
        <h1>${this._title}</h1>
          <profile-prompt>
            <h2>Welcome</h2>
            
          </profile-prompt>
      </main>
${this.renderMyProfile()}
    `;
  }

  static get scopedElements() {
    return {
      'profile-prompt': ProfilePrompt,
      'mwc-circular-progress': CircularProgress,
    };
  }

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--lit-element-background-color);
    }

    main {
      flex-grow: 1;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;
}
