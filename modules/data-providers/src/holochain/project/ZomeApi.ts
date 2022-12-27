import { AddOutput, TreeNode, ThingInput } from "./types";
import { CellId } from '@holochain/client';
import { HolochainClient } from "@holochain-open-dev/cell-client";

export class ZomeApi {
  client: HolochainClient;
  cellId: CellId;

  constructor(holochainClient: HolochainClient, cellId: CellId) {
    this.client = holochainClient;
    this.cellId = cellId;
  }

  public async put_thing (input: ThingInput): Promise<AddOutput> {
    return await this.client.callZome(this.cellId, 'projects', 'put_thing', input) as Promise<AddOutput>;
  };

  public async get_thing (path_str: string) : Promise<Array<TreeNode>> {
    return (await this.client.callZome(this.cellId, 'projects', 'get_thing', path_str)).tree as Promise<Array<TreeNode>>;
  }

  public async delete_thing (path_str: string) : Promise<void> {
    await this.client.callZome(this.cellId, 'projects', 'delete_thing', path_str);
    return;
  }

  public async signal_call (message: string): Promise<void> {
    //await this.client.callZome(this.cellId, 'projects', 'ui_updated', message);
    return;
  }
}

