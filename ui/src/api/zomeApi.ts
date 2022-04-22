import { EntryHashB64, HeaderHashB64 } from "@holochain-open-dev/core-types";
import { AppWebsocket } from "@holochain/client";
import { callZome } from "./callZome";
import { AddOutput, NewProjectOutput, Project, RustNode, ThingInput, UpdateProjectInput } from "../types/holochain";

export default class ZomeApi {
  appWs: AppWebsocket

  constructor(client: AppWebsocket) {
    this.appWs = client;
  }

  public async put_thing (input: ThingInput): Promise<AddOutput> {
    return await callZome(this.appWs, 'projects', 'put_thing', input) as Promise<AddOutput>;
  };

  public async get_thing (path_str: string) : Promise<Array<RustNode>> {
    return (await callZome(this.appWs,'projects', 'get_thing', path_str)).tree as Promise<Array<RustNode>>;
  }

  public async create_project (project: Project) : Promise<NewProjectOutput> {
    return await callZome(this.appWs, 'projects', 'create_project', project) as Promise<NewProjectOutput>;
  }

  public async get_project (entry_hash: EntryHashB64) : Promise<Project> {
    return await callZome(this.appWs, 'projects', 'get_project', entry_hash) as Promise<Project>;
  }

  public async update_project (input: UpdateProjectInput) : Promise<NewProjectOutput> {
    return await callZome(this.appWs, 'projects', 'update_project', input) as Promise<NewProjectOutput>;
  }

  public async delete_project (header_hash: HeaderHashB64) : Promise<HeaderHashB64> {
    return await callZome(this.appWs, 'projects', 'delete_project', header_hash) as Promise<HeaderHashB64>
  }
}

