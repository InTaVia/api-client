import "fake-indexeddb/auto";

import { faker } from "@faker-js/faker";
import { range } from "@stefanprobst/range";
import { suite, test } from "uvu";
import * as assert from "uvu/assert";

import {
	type Entity,
	type Event,
	type Person,
	type VocabularyEntry,
	entityKinds,
} from "../src/index.js";
import * as client from "../src/local-client.js";

const occupations = createOccupations(20);
const entities = Array<Entity>();
const events = Array<Event>();

function createRandomOccupation(): VocabularyEntry {
	return {
		id: faker.datatype.uuid(),
		label: {
			default: faker.name.jobTitle(),
		},
	};
}

function createOccupations(n: number): Array<VocabularyEntry> {
	const occupations = Array<VocabularyEntry>();
	range(1, n).forEach(() => {
		occupations.push(createRandomOccupation());
	});
	return occupations;
}

function createLifeEvent(entityId: string, entityName: string, kind: "birth" | "death"): Event {
	const date = faker.date.birthdate().toISOString().slice(0, 10);

	const event: Event = {
		id: faker.datatype.uuid(),
		label: {
			default: `${kind} of ${entityName}`,
		},
		kind: `${kind}-event`,
		startDate: date,
		endDate: date,
		relations: [
			{
				role: `${kind === "birth" ? "born" : "deceased"} person`,
				entity: entityId,
			},
		],
	};

	events.push(event);
	return event;
}

function createRandomPerson(): Person {
	const id = faker.datatype.uuid();
	const gender = faker.name.sexType();
	const name = faker.name.fullName({ sex: gender });
	const birthEvent = createLifeEvent(id, name, "birth");
	const deathEvent = createLifeEvent(id, name, "death");

	return {
		id: id,
		kind: "person",
		label: {
			default: name,
		},
		gender: {
			id: `gender-${gender}`,
			label: {
				default: gender,
			},
		},
		occupations: faker.helpers.arrayElements(
			occupations.map((occupation) => {
				return occupation.id;
			}),
			faker.datatype.number(3),
		),
		relations: [
			{
				role: "born person",
				event: birthEvent.id,
			},
			{
				role: "deceased person",
				event: deathEvent.id,
			},
		],
	};
}

function createRandomEntity(): Entity {
	const kind = faker.helpers.arrayElement(entityKinds);

	switch (kind) {
		case "person":
			return createRandomPerson();
		// case "group":
		// 	return createRandomGroup();
		// case "place":
		// 	return createRandomPlace();
		default:
			return createRandomPerson();
	}
}

function createRandomEntitiesAndEvents() {
	range(0, 99).forEach(() => {
		entities.push(createRandomEntity());
	});
}

test("local client should set and get entity", async () => {
	const payload: Entity = createRandomEntity();

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
	createRandomEntitiesAndEvents();

	// Store entities in db
	entities.forEach(async (entity) => {
		await client.setEntity(entity);
	});

	// Store events in db
	events.forEach(async (event) => {
		await client.setEvent(event);
	});
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
