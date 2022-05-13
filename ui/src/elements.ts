import { createComponent } from "@lit-labs/react";
import * as React from "react";
import { ContextProviderElement } from "@holochain-open-dev/context";
import {
  CreateProfile as NativeCreateProfile,
  ListProfiles as NativeListProfiles,
  SearchAgent as NativeSearchAgent,
  ProfilePrompt as NativeProfilePrompt
} from "@holochain-open-dev/profiles";

export const ContextProvider = createComponent(
  React,
  "context-provider",
  ContextProviderElement,
  {}
);

export const ListProfiles = createComponent(
  React,
  "list-profiles",
  NativeListProfiles,
  {
    onagentselected: "agent-selected"
  }
);

export const CreateProfile = createComponent(
  React,
  "create-profile",
  NativeCreateProfile,
  {}
);

export const ProfilePrompt = createComponent(
  React,
  "profile-prompt",
  NativeProfilePrompt,
  {}
);

export const SearchAgent = createComponent(
  React,
  "search-agent",
  NativeSearchAgent,
  {}
);


