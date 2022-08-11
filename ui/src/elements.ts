import { createComponent } from "@lit-labs/react";
import * as React from "react";
import {
  CreateProfile as NativeCreateProfile,
  ListProfiles as NativeListProfiles,
  ProfilePrompt as NativeProfilePrompt,
  ProfilesContext as NativeProfilesContext,
  MyProfile as NativeMyProfile,
} from "@holochain-open-dev/profiles";

export const ProfilesContext = createComponent(
  React,
  "profiles-context",
  NativeProfilesContext,
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

export const MyProfile = createComponent(
  React,
  "my-profile",
  NativeMyProfile,
  {}
);

export const CreateProfile = createComponent(
  React,
  "create-profile",
  NativeCreateProfile,
  {
    onProfileCreated: "profile-created"
  }
);

export const ProfilePrompt = createComponent(
  React,
  "profile-prompt",
  NativeProfilePrompt,
  {}
);