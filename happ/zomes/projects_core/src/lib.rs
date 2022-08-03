use hdi::prelude::*;

// Actual blob of data stored on the DHT
#[hdk_entry_helper]
#[derive(Clone)]
#[serde(rename_all = "camelCase")]
pub struct Thing {
  pub data: String,
}

#[hdk_entry_defs]
#[unit_enum(UnitEntryTypes)]
pub enum EntryTypes {
    #[entry_def(required_validations = 5)]
    Thing(Thing), 
}

#[hdk_link_types]
pub enum LinkTypes {
    Path,
    Data,
}
