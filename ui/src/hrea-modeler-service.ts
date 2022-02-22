import { CellClient } from '@holochain-open-dev/cell-client';
import { AgentPubKeyB64 } from '@holochain-open-dev/core-types';
import { AgentHreaModeler, HreaModeler } from './types';

export class HreaModelerService {
  constructor(public cellClient: CellClient, public zomeName = 'hreaModeler') {}

  /**
   * Get my hreaModeler, if it has been created
   * @returns my hreaModeler
   */
  async getMyHreaModeler(): Promise<AgentHreaModeler> {
    return this.callZome('get_my_hrea_modeler', null);
  }

  /**
   * Get the hreaModeler for the given agent, if they have created it
   * 
   * @param agentPubKey the agent to get the hreaModeler for
   * @returns the hreaModeler of the agent
   */
  async getAgentHreaModeler(agentPubKey: AgentPubKeyB64): Promise<AgentHreaModeler> {
    return this.callZome('get_agent_hrea_modeler', agentPubKey);
  }

  /**
   * Get the hreaModeler for the given agent
   * 
   * @param agentPubKeys the agents to get the hreaModeler for
   * @returns the hreaModeler of the agents, in the same order as the input parameters
   */
  async getAgentsHreaModeler(
    agentPubKeys: AgentPubKeyB64[]
  ): Promise<AgentHreaModeler[]> {
    return this.callZome('get_agents_hrea_modeler', agentPubKeys);
  }

  /**
   * Search hreaModeler that start with nicknamePrefix
   * 
   * @param nicknamePrefix must be of at least 3 characters
   * @returns the hreaModeler with the nickname starting with nicknamePrefix
   */
  async searchHreaModeler(nicknamePrefix: string): Promise<Array<AgentHreaModeler>> {
    return this.callZome('search_hrea_modelers', {
      nicknamePrefix: nicknamePrefix,
    });
  }

  /**
   * Get the hreaModeler for all the agents in the DHT
   * 
   * @returns the hreaModeler for all the agents in the DHT
   */
  async getAllHreaModeler(): Promise<Array<AgentHreaModeler>> {
    return this.callZome('get_all_hrea_modelers', null);
  }

  /**
   * Create my hreaModeler
   * 
   * @param hreaModeler the hreaModeler to create
   * @returns my hreaModeler with my agentPubKey
   */
   async createHreaModeler(hreaModeler: HreaModeler): Promise<AgentHreaModeler> {
    const hreaModelerResult = await this.callZome('create_hrea_modeler', hreaModeler);

    return {
      agentPubKey: hreaModelerResult.agentPubKey,
      hreaModeler: hreaModelerResult.hreaModeler,
    };
  }

  /**
   * Update my hreaModeler
   * 
   * @param hreaModeler the hreaModeler to create
   * @returns my hreaModeler with my agentPubKey
   */
  async updateHreaModeler(hreaModeler: HreaModeler): Promise<AgentHreaModeler> {
    const hreaModelerResult = await this.callZome('update_hrea_modeler', hreaModeler);

    return {
      agentPubKey: hreaModelerResult.agentPubKey,
      hreaModeler: hreaModelerResult.hreaModeler,
    };
  }

  private callZome(fn_name: string, payload: any) {
    return this.cellClient.callZome(this.zomeName, fn_name, payload);
  }
}
