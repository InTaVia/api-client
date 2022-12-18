# intavia api client

this ia a typescript client for the [intavia api](https://intavia-backend.acdh-dev.oeaw.ac.at).

you can find more info about the project on the [intavia website](https://intavia.eu).

## how to use

configure the api base url:

```ts
import { configureApiBaseUrl } from "@intavia/api-client";

const baseUrl = process.env.NEXT_PUBLIC_INTAVIA_API_BASE_URL;

configureApiBaseUrl(baseUrl);
```

call endpoint:

```ts
import { searchEntities } from "@intavia/api-client";

const response = await searchEntities.request({ q: "stefan" });
```

use [`zod`](https://github.com/colinhacks/zod) validation schemas:

```ts
import type { Person } from "@intavia/api-client";
import { person as personSchema } from "@intavia/api-client";

const person: Person = {
	id: "1",
	kind: "person",
	label: { default: "stefan" },
};

const result = personSchema.safeParse(person);

if (result.success === true) {
	console.log("Definitely a person.\n", result.data);
} else {
	console.error("You sure this is a person?\n", result.error);
}
```
