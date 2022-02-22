# Frontend Docs >> HreaModelerStore ||20

The `HreaModelerStore` is a JS class that contains `svelte` stores, to which you can subscribe to get reactive updates in your elements.

```js
import { HreaModelerStore } from "@holochain-open-dev/hrea-modeler";

const config = {
  avatarMode: "identicon",
  additionalFields: ["Location", "Bio"], // Custom app level hrea-modeler fields
};
const store = new HreaModelerStore(cellClient, config);
```

> Learn how to setup the `CellClient` object [here](https://www.npmjs.com/package/@holochain-open-dev/cell-client).

The config for the `HreaModelerStore` has these options:

```ts
export interface HreaModelerConfig {
  zomeName: string; // default: 'hrea-modeler'
  avatarMode: "identicon" | "avatar"; // default: 'avatar'
  additionalFields: string[]; // default: []
  minNicknameLength: number; // default: 3
}
```

Learn more about the stores and how to integrate them in different frameworks [here](https://holochain-open-dev.github.io/reusable-modules/frontend/using/#stores).
