use hdk::prelude::*;

#[hdk_entry(id = "project")]
#[derive(Clone)]
#[serde(rename_all = "camelCase")]
pub struct Project {
    pub id: String,
    pub name: String,
}
