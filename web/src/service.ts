import { EntryHashB64, HeaderHashB64 } from "@holochain-open-dev/core-types";
import { AppWebsocket, CellId, HoloHashB64, InstalledCell } from "@holochain/client";
import { AddOutput, Content, NewProjectOutput, Project, ThingInput, Tree, UpdateProjectInput } from "./types/types";
import { HashToString } from "./utils";

class HoloService {
  client: AppWebsocket
  cell_id: CellId;
  agentPubKey: Uint8Array;

  constructor(client: AppWebsocket, cellData: InstalledCell, agentPubKey: Uint8Array) {
    this.client = client;
    this.cell_id = cellData.cell_id;
    this.agentPubKey = agentPubKey;
  }

  getAgent = () => {
    return HashToString(this.agentPubKey);
  }

  put_thing = async (input: ThingInput): Promise<AddOutput>  => {
    return await this.call('projects', 'put_thing', input) as Promise<AddOutput>;
  }; 

  get_thing = async (path_str: string) : Promise<Tree<Content>> => {
    return await this.call('projects', 'get_thing', path_str) as Promise<Tree<Content>>;
  }

  create_project = async (project: Project) : Promise<NewProjectOutput> => {
    return await this.call('projects', 'create_project', project) as Promise<NewProjectOutput>;
  }

  get_project = async (entry_hash: EntryHashB64) : Promise<Project> => {
    return await this.call('projects', 'get_project', entry_hash) as Promise<Project>;
  }

  update_project = async (input: UpdateProjectInput) : Promise<NewProjectOutput> => {
    return await this.call('projects', 'update_project', input) as Promise<NewProjectOutput>;
  }

  delete_project = async (header_hash: HeaderHashB64) : Promise<HeaderHashB64> => {
    return await this.call('projects', 'delete_project', header_hash) as Promise<HeaderHashB64>
  }

  call = async (zome: string, fn_name: string, payload: any): Promise<any> => {
    return this.client.callZome({
      cap_secret: null,
      cell_id: this.cell_id,
      zome_name: zome,
      fn_name: fn_name,
      payload: payload,
      provenance: this.agentPubKey
    })
  }
}

export default HoloService;

