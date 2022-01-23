#[cfg(test)]
pub mod tests {
    use ::fixt::prelude::*;
    use hdk::prelude::*;
    use hdk_unit_testing::mock_hdk::*;
    use zome_a::*;

    #[test]
    fn test_init_handler() {
      // set up a mock hdk
        let mut mock_hdk = MockHdkT::new();
        let mock_hdk_ref = &mut mock_hdk;

        // mock the zome_info call
        let zome_info = ZomeInfo::new(
            "test_zome_name".into(),
            ZomeId::new(1),
            SerializedBytes::default(),
            EntryDefs::from(vec![]),
            vec![],
        );
        mock_hdk_ref
            .expect_zome_info()
            .times(1)
            .return_const(Ok(zome_info));

        // mock the `create` (create_cap_grant) call
        let mut functions: GrantedFunctions = BTreeSet::new();
        functions.insert(("test_zome_name".into(), "recv_remote_signal".into()));
        let cap_grant_entry = CapGrantEntry {
            tag: "".into(),
            // empty access converts to unrestricted
            access: ().into(),
            functions,
        };
        let create_input = CreateInput::new(
            EntryDefId::CapGrant,
            Entry::CapGrant(cap_grant_entry),
            ChainTopOrdering::default(),
        );
        let header_hash = fixt!(HeaderHash);
        mock_create(mock_hdk_ref, create_input, Ok(header_hash));

        // set the hdk to the mock hdk
        set_hdk(mock_hdk);
        assert_eq!(init_handler(), Ok(InitCallbackResult::Pass),);
    }
}
