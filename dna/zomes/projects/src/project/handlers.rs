use hdk::prelude::*;
use hdk::prelude::holo_hash::*;
use super::Project;

#[hdk_extern]
pub fn get_project(entry_hash: EntryHashB64) -> ExternResult<Option<Project>> {
  let maybe_element = get(EntryHash::from(entry_hash), GetOptions::default())?;

  match maybe_element {
    None => Ok(None),
    Some(element) => {
      let project: Project = element.entry()
        .to_app_option()?
        .ok_or(WasmError::Guest("Could not deserialize element to Project.".into()))?;
    
      Ok(Some(project))
    }
  }
}


#[derive(Serialize, Deserialize, Debug)]
pub struct NewProjectOutput {
  header_hash: HeaderHashB64,
  entry_hash: EntryHashB64,
}

#[hdk_extern]
pub fn create_project(project: Project) -> ExternResult<NewProjectOutput> {
  let header_hash = create_entry(&project)?;

  let entry_hash = hash_entry(&project)?;

  let output = NewProjectOutput {
    header_hash: HeaderHashB64::from(header_hash),
    entry_hash: EntryHashB64::from(entry_hash)
  };

  Ok(output)
}


#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateProjectInput {
  original_header_hash: HeaderHashB64,
  updated_project: Project
}

#[hdk_extern]
pub fn update_project(input: UpdateProjectInput) -> ExternResult<NewProjectOutput> {
  let header_hash = update_entry(HeaderHash::from(input.original_header_hash), &input.updated_project)?;

  let entry_hash = hash_entry(&input.updated_project)?;

  let output = NewProjectOutput {
    header_hash: HeaderHashB64::from(header_hash),
    entry_hash: EntryHashB64::from(entry_hash)
  };

  Ok(output)
}


#[hdk_extern]
pub fn delete_project(header_hash: HeaderHashB64) -> ExternResult<HeaderHash> {
  delete_entry(HeaderHash::from(header_hash))
}

