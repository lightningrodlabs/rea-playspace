import { html, fixture, expect } from '@open-wc/testing';
import { setupApolloClientMock } from './mocks';
import { HodCreateHreaModelerForm } from '../dist';
import { setupApolloClientElement } from '@holochain-open-dev/common';

describe('HodCreateHreaModelerForm', () => {
  it('create hrea-modeler has a placeholder', async () => {
    const client = await setupApolloClientMock();

    customElements.define(
      'hod-create-hrea-modeler-form',
      setupApolloClientElement(HodCreateHreaModelerForm, client)
    );

    const el = await fixture(
      html` <hod-create-hrea-modeler-form></hod-create-hrea-modeler-form> `
    );

    expect(el.shadowRoot.innerHTML).to.include('CREATE PROFILE');
  });
});
