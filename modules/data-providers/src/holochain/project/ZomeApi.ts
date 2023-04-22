import { AddOutput, TreeNode, ThingInput } from "./HolochainTypes";
import { AppAgentCallZomeRequest, AppAgentClient, RoleName, ZomeName } from '@holochain/client';

export class ZomeApi {
  constructor(
    public client: AppAgentClient,
    public roleName: RoleName,
    public zomeName: ZomeName = 'projects'
  ) {}

  protected callZome(fn_name: string, payload: any) {
    const req: AppAgentCallZomeRequest = {
      role_name: this.roleName,
      zome_name: this.zomeName,
      fn_name,
      payload,
    };
    return this.client.callZome(req);
  }

  public async put_thing (input: ThingInput): Promise<AddOutput> {
    return await this.callZome('put_thing', input) as Promise<AddOutput>
  }

  public async get_thing (path_str: string) : Promise<Array<TreeNode>> {
    return (await this.callZome('get_thing', path_str)).tree as Promise<Array<TreeNode>>
  }

  public async delete_thing (path_str: string) : Promise<void> {
    await this.callZome('delete_thing', path_str)
    return
  }

  public async signal_call (_message: string): Promise<void> {
    //await this.client.callZome('ui_updated', message)
    return
  }
}

