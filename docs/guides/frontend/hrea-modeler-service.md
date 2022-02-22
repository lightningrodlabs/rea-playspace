# Frontend Docs >> HreaModelerService ||30

The `HreaModelerService` is a state-less class that provides typings wrapping the zome calls that can be made to `hc_zome_hrea_modelers`.

```js
import { HreaModelerService } from '@holochain-open-dev/hrea-modeler';

const service = new HreaModelerService(cellClient);

service.getMyHreaModeler().then(myHreaModeler => console.log(myHreaModeler));
```

Learn more about the services [here](https://holochain-open-dev.github.io/reusable-modules/frontend/using/#services). 