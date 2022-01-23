#[cfg(test)]
pub mod tests {
    use hdk::prelude::*;
    use zome_a::*;

    #[test]
    fn test_init_handler() {
        assert_eq!(init_handler(), Ok(InitCallbackResult::Pass),);
    }
}
