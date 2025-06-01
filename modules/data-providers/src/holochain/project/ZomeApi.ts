import { AddOutput, TreeNode, ThingInput } from "./types";
import { CellId, AppWebsocket } from '@holochain/client';

export class ZomeApi {
  client: AppWebsocket;
  cellId: CellId;

  constructor(holochainClient: AppWebsocket, cellId: CellId) {
    this.client = holochainClient;
    this.cellId = cellId;
  }

  public async put_thing (input: ThingInput): Promise<AddOutput> {
    return await this.client.callZome({
      cell_id: this.cellId,
      zome_name: 'projects',
      fn_name: 'put_thing',
      payload: input
    });
  };

  public async get_thing (path_str: string) : Promise<Array<TreeNode>> {
    return (await this.client.callZome({
      cell_id: this.cellId,
      zome_name: 'projects',
      fn_name: 'get_thing',
      payload: path_str
    }) as { tree: Array<TreeNode>}).tree;
  }

  public async delete_thing (path_str: string) : Promise<void> {
    await this.client.callZome({
      cell_id: this.cellId,
      zome_name: 'projects',
      fn_name: 'delete_thing',
      payload: path_str
    });
    return;
  }

  public async signal_call (message: string): Promise<void> {
    // await this.client.callZome({
    //   cell_id: this.cellId,
    //   zome_name: 'projects',
    //   fn_name: 'ui_updated',
    //   payload: message
    // });
    return;
  }
}

