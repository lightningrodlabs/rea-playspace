import { hashToString } from 'holochain-ui-test-utils';

export class HreaModelerMock {
  constructor() {
    this.agents = [];
  }

  create_hrea_modeler({ username }, provenance) {
    const agent = {
      agent_pub_key: hashToString(provenance),
      hrea-modeler: { username, fields: {} },
    };
    this.agents.push(agent);

    return agent;
  }

  search_hrea_modelers({ username_prefix }) {
    return this.agents
      .filter(a => a.hrea-modeler.username.startsWith(username_prefix.slice(0, 3)))
      .map(a => ({
        agent_pub_key: a.agent_pub_key,
        ...a,
      }));
  }

  get_my_hrea_modeler(_, provenance) {
    const agent = this.findAgent(hashToString(provenance));

    if (!agent)
      return {
        agent_pub_key: hashToString(provenance),
      };
    return {
      agent_pub_key: agent.agent_pub_key,
      hrea-modeler: agent ? agent.hrea-modeler : undefined,
    };
  }

  get_agent_hrea_modeler({ agent_address }) {
    const agent = this.findAgent(agent_address);
    return agent ? agent.username : undefined;
  }

  findAgent(agent_address) {
    return this.agents.find(user => user.agent_pub_key === agent_address);
  }
}
