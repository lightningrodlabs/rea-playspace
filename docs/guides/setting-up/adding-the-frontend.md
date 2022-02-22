# Setting Up >> Adding the Frontend ||20

> This guide assumes you are building a web application written in JS or TS, using NPM as the package manager.

> [Go here](https://holochain-open-dev.github.io/reusable-modules/frontend/frameworks/) to look at examples of integration of this module in different frontend frameworks (Vue, Svelte, etc.).

1. Install this module and its necessary dependencies with:

```bash
npm install @holochain-open-dev/hrea-modeler @holochain-open-dev/context @holochain-open-dev/cell-client
```

Careful! If you are using NPM workspaces (which is the case for the apps generated with the Holochain scaffolding and RAD tools), you need to specify which workspace you want to install those dependencies to. In the case of the apps generated with the RAD tools:

```bash
npm install @holochain-open-dev/hrea-modeler @holochain-open-dev/context @holochain-open-dev/cell-client -w ui
```

2. [Choose which elements you need](../frontend/elements.md) and import them:

**If you are developing a normal web-app**:

```js
import "@holochain-open-dev/hrea-modeler/create-hrea-modeler";
import "@holochain-open-dev/hrea-modeler/list-hrea-modelers";
```

This will define all the elements from this module in the global `CustomElementsRegistry`. You can read more about Custom Elements [here](https://developers.google.com/web/fundamentals/web-components/customelements).

OR

**If you are using the `@open-wc/scoped-elements`** pattern (maybe because you are developing a library rather than a full SPA), you can import the elements' classes directly from the `@holochain-open-dev/hrea-modeler` package instead of defining them globally:

```js
import { LitElement, html } from "lit";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { CreateHreaModeler } from "@holochain-open-dev/hrea-modeler";

export class HreaModelerTest extends ScopedElementsMixin(LitElement) {
  render() {
    return html` <create-hrea-modeler></create-hrea-modeler> `;
  }

  static get scopedElements() {
    return {
      "create-hrea-modeler": CreateHreaModeler,
    };
  }
}
```

3. Connect to Holochain with the `HolochainClient`, and create the `HreaModelerStore` with it:

```js
import {
  HreaModelerStore,
  hrea-modelerStoreContext,
} from "@holochain-open-dev/hrea-modeler";
import { HolochainClient } from "@holochain-open-dev/cell-client";

async function setupHreaModelerStore() {
  const client = await HolochainClient.connect(
    // TODO: change this to the port where holochain is listening,
    // or `ws://localhost:${process.env.HC_PORT}` if you used the scaffolding tooling to bootstrap the application
    `ws://localhost:8888`,
    // TODO: change "my-app-id" for the installed_app_id of your application
    "my-app-id"
  );
  // TODO: change "my-cell-role" for the roleId that you can find in your "happ.yaml"
  const cellClient = client.forCell(client.cellDataByRoleId("my-cell-role"));

  const store = new HreaModelerStore(cellClient, {
    avatarMode: "avatar",
  });
}
```


4. Import the `<context-provider>` element and add it to your html **wrapping the whole section of your page in which you are going to be placing** the elements from `@holochain-open-dev/hrea-modeler`:

```js
// This can be placed in the index.js, at the top level of your web-app.
import "@holochain-open-dev/context/context-provider";
```

And then in your html:

```html
<context-provider>
  <create-hrea-modeler></create-hrea-modeler>
</context-provider>
```

5. Attach the `hrea-modelerStore` to the `<context-provider>` element:

- Go to [this page](https://holochain-open-dev.github.io/reusable-modules/frontend/frameworks/), select the framework you are using, and follow its example.

These are the high level instructions for it:

1. Set the `context` property of the `<context-provider>` element to `hrea-modelerStoreContext`.
2. Set the `value` property of it to your already instantiated `HreaModelerStore` object.

If you **are not using any framework**:

```js
const contextElement = document.querySelector("context-provider");
contextElement.context = hrea-modelerStoreContext;
contextElement.value = store;
```

> You can read more about the context pattern [here](https://holochain-open-dev.github.io/reusable-modules/frontend/using/#context).

5. Add the Material Icons font in your `<head>` tag:

```html
<head>
  ...
  <link
    href="https://fonts.googleapis.com/css?family=Material+Icons&display=block"
    rel="stylesheet"
  />
</head>
```

You can see a full working example of the UI working in [here](https://github.com/holochain-open-dev/hrea-modeler/blob/main/ui/demo/index.html).


That's it! You can spend some time now to take a look at [which elements are available for you to reuse](../frontend/elements.md).