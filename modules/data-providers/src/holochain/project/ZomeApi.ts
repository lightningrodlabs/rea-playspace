import { AddOutput, TreeNode, ThingInput } from "./types";
import { AppAgentClient, RoleName, ZomeName } from '@holochain/client';
import { ZomeClient } from '@holochain-open-dev/utils';

export class ZomeApi extends ZomeClient<string> {
  constructor(
    public client: AppAgentClient,
    public roleName: RoleName,
    public zomeName: ZomeName = 'projects'
  ) {
    super(client, roleName, zomeName);
  }

  public async put_thing (input: ThingInput): Promise<AddOutput> {
    return await this.callZome('put_thing', input) as Promise<AddOutput>;
  };

  public async get_thing (path_str: string) : Promise<Array<TreeNode>> {
    return (await this.callZome('get_thing', path_str)).tree as Promise<Array<TreeNode>>;
  }

  public async delete_thing (path_str: string) : Promise<void> {
    await this.callZome('delete_thing', path_str);
    return;
  }

  public async signal_call (message: string): Promise<void> {
    //await this.client.callZome('ui_updated', message);
    return;
  }
}

