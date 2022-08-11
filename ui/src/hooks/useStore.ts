import React from "react";
import { StoreSubscriber } from "lit-svelte-stores";
import { useController } from '@lit-labs/react/use-controller.js';

export const useStore = (store) =>
  useController(React, (host) => new StoreSubscriber(host, () => store));