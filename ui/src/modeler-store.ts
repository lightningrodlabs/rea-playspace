import { CellClient } from '@holochain-open-dev/cell-client';
import { defaultConfig, ProfilesConfig, ProfilesStore } from '@holochain-open-dev/profiles';

export class ModelerStore {
  public profilesStore: ProfilesStore;
  //public service: ModelerService;

  constructor(
    protected cellClient: CellClient,
  ) {
    const config: Partial<ProfilesConfig> = {avatarMode: "identicon"};
    this.profilesStore = new ProfilesStore(cellClient, config);
  }
}