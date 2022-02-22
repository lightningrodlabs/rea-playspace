import { CellClient } from '@holochain-open-dev/cell-client';
import {
  AgentPubKeyB64,
  Dictionary,
  serializeHash,
} from '@holochain-open-dev/core-types';
import merge from 'lodash-es/merge';

import { HreaModelerService } from './hrea-modeler-service';
import { AgentHreaModeler, HreaModeler } from './types';
import { writable, Writable, derived, Readable, get } from 'svelte/store';
import { defaultConfig, HreaModelerConfig } from './config';

export class HreaModelerStore {
  /** Private */
  private _service: HreaModelerService;
  private _knownHreaModelerStore: Writable<Dictionary<HreaModeler>> = writable({});

  /** Static info */
  public myAgentPubKey: AgentPubKeyB64;

  /** Readable stores */

  // Store containing all the hreaModeler that have been fetched
  // The key is the agentPubKey of the agent
  public knownHreaModeler: Readable<Dictionary<HreaModeler>> = derived(
    this._knownHreaModelerStore,
    i => i
  );

  // Store containing my hreaModeler
  public myHreaModeler: Readable<HreaModeler> = derived(
    this._knownHreaModelerStore,
    hreaModeler => hreaModeler[this.myAgentPubKey]
  );

  // Returns a store with the hreaModeler of the given agent
  hreaModelerOf(agentPubKey: AgentPubKeyB64): Readable<HreaModeler> {
    return derived(this._knownHreaModelerStore, hreaModeler => hreaModeler[agentPubKey]);
  }

  config: HreaModelerConfig;

  constructor(
    protected cellClient: CellClient,
    config: Partial<HreaModelerConfig> = {}
  ) {
    this.config = merge(defaultConfig, config);
    this._service = new HreaModelerService(cellClient, this.config.zomeName);
    this.myAgentPubKey = serializeHash(cellClient.cellId[1]);
  }

  /** Actions */

  /**
   * Fetches the hreaModeler for all agents in the DHT
   *
   * You can subscribe to `knowHreaModeler` to get updated with all the hreaModeler when this call is done
   *
   * Warning! Can be very slow
   */
  async fetchAllHreaModeler(): Promise<void> {
    const allHreaModeler = await this._service.getAllHreaModeler();

    this._knownHreaModelerStore.update(hreaModeler => {
      for (const hreaModeler of allHreaModeler) {
        hreaModeler[hreaModeler.agentPubKey] = hreaModeler.hreaModeler;
      }
      return hreaModeler;
    });
  }

  /**
   * Fetches the hreaModeler for the given agent
   */
  async fetchAgentHreaModeler(
    agentPubKey: AgentPubKeyB64
  ): Promise<HreaModeler | undefined> {
    // For now, optimistic return of the cached hreaModeler
    // TODO: implement cache invalidation

    const knownHreaModeler = get(this._knownHreaModelerStore);

    if (knownHreaModeler[agentPubKey]) return knownHreaModeler[agentPubKey];

    const hreaModeler = await this._service.getAgentHreaModeler(agentPubKey);

    if (!hreaModeler) return;

    this._knownHreaModelerStore.update(hreaModeler => {
      hreaModeler[hreaModeler.agentPubKey] = hreaModeler.hreaModeler;
      return hreaModeler;
    });
    return hreaModeler.hreaModeler;
  }

  /**
   * Fetches the hreaModeler for the given agents in the DHT
   *
   * You can subscribe to knowHreaModeler to get updated with all the hreaModeler when this call is done
   *
   * Use this over `fetchAgentHreaModeler` when fetching multiple hreaModeler, as it will be more performant
   */
  async fetchAgentsHreaModeler(agentPubKeys: AgentPubKeyB64[]): Promise<void> {
    // For now, optimistic return of the cached hreaModeler
    // TODO: implement cache invalidation

    const knownHreaModeler = get(this._knownHreaModelerStore);

    const agentsWeAlreadKnow = Object.keys(knownHreaModeler);
    const hreaModelerToFetch = agentPubKeys.filter(
      pubKey => !agentsWeAlreadKnow.includes(pubKey)
    );

    if (hreaModelerToFetch.length === 0) {
      return;
    }

    const fetchedHreaModeler = await this._service.getAgentsHreaModeler(
      hreaModelerToFetch
    );

    this._knownHreaModelerStore.update(hreaModeler => {
      for (const fetchedHreaModeler of fetchedHreaModeler) {
        hreaModeler[fetchedHreaModeler.agentPubKey] = fetchedHreaModeler.hreaModeler;
      }
      return hreaModeler;
    });
  }

  /**
   * Fetch my hreaModeler
   *
   * You can subscribe to `myHreaModeler` to get updated with my hreaModeler
   */
  async fetchMyHreaModeler(): Promise<void> {
    const hreaModeler = await this._service.getMyHreaModeler();
    if (hreaModeler) {
      this._knownHreaModelerStore.update(hreaModeler => {
        hreaModeler[hreaModeler.agentPubKey] = hreaModeler.hreaModeler;
        return hreaModeler;
      });
    }
  }

  /**
   * Search the hreaModeler for the agent with nicknames starting with the given nicknamePrefix
   *
   * @param nicknamePrefix must be of at least 3 characters
   * @returns the hreaModeler with the nickname starting with nicknamePrefix
   */
  async searchHreaModeler(nicknamePrefix: string): Promise<AgentHreaModeler[]> {
    const searchedHreaModeler = await this._service.searchHreaModeler(nicknamePrefix);

    this._knownHreaModelerStore.update(hreaModeler => {
      for (const hreaModeler of searchedHreaModeler) {
        hreaModeler[hreaModeler.agentPubKey] = hreaModeler.hreaModeler;
      }
      return hreaModeler;
    });
    return searchedHreaModeler;
  }

  /**
   * Create my hreaModeler
   *
   * Note that there is no guarantee on nickname uniqness
   *
   * @param hreaModeler hreaModeler to be created
   */
  async createHreaModeler(hreaModeler: HreaModeler): Promise<void> {
    await this._service.createHreaModeler(hreaModeler);

    this._knownHreaModelerStore.update(hreaModeler => {
      hreaModeler[this.myAgentPubKey] = hreaModeler;
      return hreaModeler;
    });
  }

  /**
   * Update my hreaModeler
   *
   * @param hreaModeler hreaModeler to be created
   */
  async updateHreaModeler(hreaModeler: HreaModeler): Promise<void> {
    await this._service.updateHreaModeler(hreaModeler);

    this._knownHreaModelerStore.update(hreaModeler => {
      hreaModeler[this.myAgentPubKey] = hreaModeler;
      return hreaModeler;
    });
  }
}
