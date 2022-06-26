import { AddOutput, RustNode, ThingInput } from "../types/holochain";
import { HolochainClient } from "@holochain-open-dev/cell-client";
import { getCellId } from "../hcWebsockets";

export default class ZomeApi {
  client: HolochainClient

  constructor(holochainClient: HolochainClient) {
    this.client = holochainClient
  }

  public async put_thing (input: ThingInput): Promise<AddOutput> {
    return await this.client.callZome(getCellId(), 'projects', 'put_thing', input) as Promise<AddOutput>;
  };

  public async get_thing (path_str: string) : Promise<Array<RustNode>> {
    console.log('get thing: ', );
    console.log('path_str: ', path_str );
    console.log('cellId: ', getCellId());
    // errors here vvv
    try {
      const res = (await this.client.callZome(getCellId(), 'projects', 'get_thing', path_str)).tree as Promise<Array<RustNode>>;
      console.log('res: ', res);
    return  res;
    } catch (err) {
      console.error('call Zome: ', err);
    }
  }

  public async delete_thing (path_str: string) : Promise<void> {
    await this.client.callZome(getCellId(), 'projects', 'delete_thing', path_str);
    return;
  }
}

