use hdk::prelude::{*};
use holo_hash::{ActionHashB64, EntryHashB64};
use projects_integrity::Thing;

// returned after successful write to DHT
#[derive(Serialize, Deserialize, Debug)]
pub struct AddOutput {
  pub header_hash: ActionHashB64,
  pub entry_hash: EntryHashB64,
}

// Passed in from UI
#[derive(Serialize, Deserialize, Debug)]
pub struct ThingInput {
  pub path: String,
  pub data: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthoredThing {
    pub thing: Thing,
    pub author: AgentPubKey,
    pub address: ActionHash,
}

impl TryFrom<Record> for AuthoredThing {
    type Error = WasmError;

    fn try_from(value: Record) -> ExternResult<Self> {
        let maybe_thing: Option<Thing> = value.entry.to_app_option().map_err(|e| {
            wasm_error!(WasmErrorInner::Guest(format!(
                "Failed to deserialize Thing: {:?}",
                e
            )))
        })?;

        return match maybe_thing {
            Some(thing) => Ok(AuthoredThing {
                thing,
                author: value.action().author().clone(),
                address: value.action_address().clone(),
            }),
            None => Err(wasm_error!(WasmErrorInner::Guest(
                "Not a Thing Record".to_string()
            ))),
        }
    }
}

// Sent back to UI
#[derive(Clone, Serialize, Deserialize, Debug, Default, PartialEq)]
pub struct Content {
    pub name: String,
    pub data: String,
}

// Remote call input
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SignalPayload {
    pub message: String
}

#[derive(Clone, Serialize, Deserialize, Debug, Default)]
pub struct Tree<T> 
where
    T: PartialEq
{
    pub tree: Vec<Node<T>>,
}

impl<T> Tree<T>
where
    T: PartialEq
{
    // create a new tree with a root node at index 0
    pub fn new(root: T) -> Self {
        Self {
            tree: vec![Node::new(0, None, root)]
        }
    }

    // inserts value into parent, return index of new node or 0 if parent doesn't exist
    pub fn insert(&mut self, parent: usize, val: T) -> usize {
        let idx = self.tree.len();
        match self.tree.get_mut(parent) {
            None => 0,
            Some(node) => {
                node.children.push(idx);
                self.tree.push(Node::new(idx, Some(parent), val));
                idx
            }
        }
    }
}

#[derive(Clone, Serialize, Deserialize, Debug, Default)]
pub struct Node<T>
where
    T: PartialEq
{
    pub idx: usize,
    pub val: T,
    pub parent: Option<usize>,
    pub children: Vec<usize>,
}

impl<T> Node<T>
where
    T: PartialEq
{
    pub fn new(idx: usize, parent: Option<usize>, val: T) -> Self {
        Self {
            idx,
            val,
            parent,
            children: vec![],
        }
    }
}