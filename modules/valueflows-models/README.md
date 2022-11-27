# Valueflows Models

This is a set of models implementing the [Valueflows data structures](https://www.valueflo.ws/specification/uml/). The [Valuflows GraphQL schema](https://lab.allmende.io/valueflows/vf-schemas/vf-graphql) can also produce Typescript structural types. However, those are normally not transpiled to Typescript but they could be, a la [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) and [this guide](https://www.apollographql.com/docs/react/development-testing/static-typing/).

While that would allow having a set of structurally typed models for use in Typescript that are automatically kept in sync between applications, even if they don't use the GraphQL client, they still don't provide the extra functionality such as:
* automatically serializing only the fields that matter for storage,
* automatically creating IDs if not present in the data,
* automatically initializing a created date,
* more comming soon.

On the other hand, since I do use versions of the structural types in addition to the models, there is no reason not to replace the structural types in this repo with the ones that cna be generated from the GraphQL schema.

Eventually, we will define a complete set of Validators for form fields required by Valueflows. We can keep those in this repo and make sure they are kept inline with the current schema. We can also make sure that internationalization is available for them.

Additionally, there is code in the REA-Playspace that deals with accounting that should be added to this repo to allow people to have a consistent and tested implementation of the accounting algorithms to use client side for certain advanced UX cases.

Once some patterns emerge from the work in this repo, we could use the [Valueflows TTL Schema](https://lab.allmende.io/valueflows/valueflows/-/blob/master/release-doc-in-process/all_vf.TTL) to automatically generate the models based on the SOR.

Finally, we could use some of that tooling to create a much better implementation of the schema that additionally has the type data needed to genrate the field validators as well.