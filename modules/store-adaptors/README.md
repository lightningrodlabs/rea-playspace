# Store Adaptors

Allows adapting different kinds of stores, including Svelte `Readable<T>`s and simply adapting them for use in a React application that automatically dispatches updates to the UI.

For example, using the Holochain profile module is a simple as this:

```ts
import { wrapReadable, SyncExternalStoreApi } from "store-adaptors";
import { Profile, ProfilesService, ProfilesStore } from "@holochain-open-dev/profiles";

const profilesStore = await connectProfiles();
const myProfileReadable = await profilesStore.fetchMyProfile();
const profile = useStore<Profile>(wrapReadable(myProfileReadable));
```

If the `Readable<T>` updates, it will dispatch to the React useSyncExternalStore event listener.

This entire module is only about 36 lines of code excluding comments and whitespace.
