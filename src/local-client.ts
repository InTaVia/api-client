import { isAfter, isBefore, isValid } from "date-fns";
import localforage from "localforage";

import { type GetEntityById, type GetEventById, type SearchEntities } from "./client.js";
import { type Entity, type Event } from "./models.js";
import { type PaginatedResponse } from "./types.js";

const entities = localforage.createInstance({ name: "entities" });
const events = localforage.createInstance({ name: "events" });

export async function setEntity(entity: Entity): Promise<Entity> {
	return entities.setItem(entity.id, entity);
}

export async function getEntityById({
	id,
}: GetEntityById.PathParams): Promise<GetEntityById.Response | null> {
	// TODO: should we throw instead of returning null, to match http client 404?
	return entities.getItem<Entity>(id);
}

//

export async function setEvent(event: Event): Promise<Event> {
	return events.setItem(event.id, event);
}

export async function getEventById({
	id,
}: GetEventById.PathParams): Promise<GetEventById.Response | null> {
	return events.getItem<Event>(id);
}

//

export async function searchEntities(
	params: SearchEntities.SearchParams,
): Promise<SearchEntities.Response> {
	const results: Array<Entity> = [];

	/** label filter */
	const terms = params.q?.toLowerCase().split(/\s+/) ?? [];
	const hasLabelSearchTerm = terms.length > 0;
	function matchesLabel(entity: Entity) {
		return terms.some((term) => {
			return entity.label.default.toLowerCase().includes(term);
		});
	}

	/** enitity kind filter */
	const kinds = params.kind ?? [];
	const hasKindFilter = kinds.length > 0;
	function matchesKind(entity: Entity) {
		return kinds.some((kind) => {
			return entity.kind === kind;
		});
	}

	/** entity date filter */
	const startBefore = params.bornBefore;
	const startAfter = params.bornAfter;
	const endBefore = params.diedBefore;
	const endAfter = params.diedAfter;
	const hasStartBeforeFilter = startBefore != null && isValid(new Date(startBefore));
	const hasStartAfterFilter = startAfter != null && isValid(new Date(startAfter));
	const hasEndBeforeFilter = endBefore != null && isValid(new Date(endBefore));
	const hasEndAfterFilter = endAfter != null && isValid(new Date(endAfter));
	function checkIfDateIsBefore(date: string, dateToCompare: string) {
		return isBefore(new Date(date), new Date(dateToCompare));
	}
	function checkIfDateIsAfter(date: string, dateToCompare: string) {
		return isAfter(new Date(date), new Date(dateToCompare));
	}

	/** entity gender filter */
	const genders = params.gender ?? [];
	const hasGender = genders.length > 0;
	function matchesGender(entity: Entity) {
		if (entity.kind !== "person") return false;
		return genders.some((gender) => {
			return entity.gender?.label.default.toLowerCase() === gender.toLowerCase();
		});
	}

	/** entity gender_id filter */
	const genderIds = params.gender_id ?? [];
	const hasGenderIds = genderIds.length > 0;
	function hasGenderId(entity: Entity) {
		if (entity.kind !== "person") return false;
		return genderIds.some((genderId) => {
			return entity.gender?.id === genderId;
		});
	}

	await entities.iterate<Entity, void>((entity) => {
		if (hasLabelSearchTerm && !matchesLabel(entity)) return;
		if (hasKindFilter && !matchesKind(entity)) return;
		if (hasGender && !matchesGender(entity)) return;
		if (hasGenderIds && !hasGenderId(entity)) return;

		results.push(entity);
	});

	return paginate(results, params.page, params.limit);
}

//

function paginate<T>(results: Array<T>, page = 1, limit = 50): PaginatedResponse<T> {
	return {
		count: results.length,
		page,
		pages: Math.ceil(results.length / limit),
		results: results.slice((page - 1) * limit, page * limit),
	};
}
