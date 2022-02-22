import { AgentPubKeyB64, Dictionary } from '@holochain-open-dev/core-types';

export interface HreaModeler {
  nickname: string;
  fields: Dictionary<string>;
}

export interface AgentHreaModeler {
  agentPubKey: AgentPubKeyB64;
  hreaModeler: HreaModeler;
}

export interface SearchHreaModelerInput {
  nicknamePrefix: string;
}