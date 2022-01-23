#[cfg(test)]
pub mod tests {
    use ::fixt::prelude::*;
    use hdk::prelude::*;
    use zomeA::*;

    #[test]
    fn test_init_handler() {
        assert_eq!(init_handler(), Ok(InitCallbackResult::Pass),);
    }
}
