import "fake-indexeddb/auto";

import { range } from "@stefanprobst/range";
import { suite, test } from "uvu";
import * as assert from "uvu/assert";

import { type Entity, type Event } from "../src/index.js";
import * as client from "../src/local-client.js";

test("local client should set and get entity", async () => {
	const payload: Entity = {
		id: "entity123",
		kind: "person",
		label: { default: "Entity 123" },
		relations: [],
	};

	const written = await client.setEntity(payload);
	const read = await client.getEntityById({ id: payload.id });

	assert.equal(written, read);
	assert.equal(payload, read);
});

test("local client should set and get event", async () => {
	const payload: Event = {
		id: "event123",
		kind: "it-happened",
		label: { default: "Event 123" },
		relations: [],
	};

	const written = await client.setEvent(payload);
	const read = await client.getEventById({ id: payload.id });

	assert.equal(written, read);
	assert.equal(payload, read);
});

const search = suite("local client search");

// TODO: better db population for search tests
search.before(async () => {
	const genders = [
		{
			id: "gender-female",
			label: { default: "female" },
		},
		{
			id: "gender-male",
			label: { default: "male" },
		},
		{
			id: "gender-unknown",
			label: { default: "unknown" },
		},
	];

	for (const n of range(1, 100)) {
		if (n % 2 === 0) {
			await client.setEntity({
				id: `entity-${n}`,
				label: { default: `Entity ${n}` },
				kind: "person",
				gender: genders[n % 3]!,
				relations: [],
			});
		} else {
			await client.setEntity({
				id: `entity-${n}`,
				label: { default: `Entity ${n}` },
				kind: "group",
				relations: [],
			});
		}
	}
});

search("local client should return entities filtered by label", async () => {
	const results = await client.searchEntities({ q: "50" });

	assert.is(results.count, 1);
	assert.is(results.page, 1);
	assert.is(results.pages, 1);
	assert.is(results.results.length, 1);
	assert.equal(results.results, [await client.getEntityById({ id: "entity-50" })]);
});

search("local client should return first page of results", async () => {
	const results = await client.searchEntities({ q: "ty" });

	assert.is(results.count, 100);
	assert.is(results.page, 1);
	assert.is(results.pages, 2);
	assert.is(results.results.length, 50);
});

search("local client should return specified page of results", async () => {
	const results = await client.searchEntities({ q: "ty", page: 2 });

	assert.is(results.count, 100);
	assert.is(results.page, 2);
	assert.is(results.pages, 2);
	assert.is(results.results.length, 50);
});

search("local client should use specified limit param to paginate results", async () => {
	const results = await client.searchEntities({ q: "ty", page: 2, limit: 10 });

	assert.is(results.count, 100);
	assert.is(results.page, 2);
	assert.is(results.pages, 10);
	assert.is(results.results.length, 10);
});

search("local client should return entities filtered by kind", async () => {
	const results = await client.searchEntities({ kind: ["person"] });

	assert.is(results.count, 50);
});

search("local client should return entities filtered by multiple kinds", async () => {
	const results = await client.searchEntities({ kind: ["group", "person"] });

	assert.is(results.count, 100);
});

search("local client should only return entities matching kind filter", async () => {
	const results = await client.searchEntities({ kind: ["place"] });

	assert.is(results.count, 0);
});

search("local client should only return entities matching kind filter", async () => {
	const results = await client.searchEntities({ q: "13", kind: ["group"] });

	assert.is(results.count, 1);
});

search("local client should return entities matching gender filter", async () => {
	const results = await client.searchEntities({ gender: ["female"] });

	assert.is(results.count, 16);
});

search("local client should return entities matching multiple gender filters", async () => {
	const results = await client.searchEntities({ gender: ["female", "male"] });

	assert.is(results.count, 33);
});

search(
	"local client should return entities matching multiple filters including gender",
	async () => {
		const results = await client.searchEntities({ q: "18", gender: ["female"] });

		assert.is(results.count, 1);
	},
);

search("local client should return entities matching genderId filter", async () => {
	const results = await client.searchEntities({ gender_id: ["gender-female"] });

	assert.is(results.count, 16);
});

search("local client should return entities matching multiple genderId filters", async () => {
	const results = await client.searchEntities({ gender_id: ["gender-female", "gender-male"] });

	assert.is(results.count, 33);
});

search(
	"local client should return entities matching multiple filters including genderId",
	async () => {
		const results = await client.searchEntities({ q: "18", gender_id: ["gender-female"] });

		assert.is(results.count, 1);
	},
);

search.run();
test.run();
