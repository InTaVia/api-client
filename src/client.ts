/* eslint-disable @typescript-eslint/no-namespace */

import type { RequestOptions } from "@stefanprobst/request";
import { request } from "@stefanprobst/request";

import { createApiUrl } from "./lib.js";
import type {
	Dataset,
	Entity,
	EntityKind,
	EntityRelationRole,
	Event,
	EventKind,
	Gender,
	VocabularyEntry,
} from "./models.js";
import type { Bin, IsoDateString, PaginatedRequest, PaginatedResponse, RootNode } from "./types.js";

export namespace GetEntityById {
	export type PathParams = {
		id: Entity["id"];
	};
	export type Params = PathParams;
	export type Response = Entity;
}

export const getEntityById = {
	pathname(params: GetEntityById.PathParams): string {
		return `/v2/api/entity/${encodeURIComponent(params.id)}`;
	},
	url(params: GetEntityById.Params): URL {
		const url = createApiUrl({
			pathname: getEntityById.pathname(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: GetEntityById.Params): Promise<GetEntityById.Response> {
		const url = getEntityById.url(params);
		const options = getEntityById.options();
		return request(url, options);
	},
};

//

export namespace RetrieveEntitiesByIds {
	export type SearchParams = PaginatedRequest<never>;
	export type Params = SearchParams;
	export type RequestBody = {
		ids: Array<Entity["id"]>;
	};
	export type Response = PaginatedResponse<Entity>;
}

export const retrieveEntitiesByIds = {
	pathname(): string {
		return "/v2/api/entities/retrieve";
	},
	searchParams(params: RetrieveEntitiesByIds.SearchParams): RetrieveEntitiesByIds.SearchParams {
		return params;
	},
	url(params: RetrieveEntitiesByIds.Params): URL {
		const url = createApiUrl({
			pathname: retrieveEntitiesByIds.pathname(),
			searchParams: retrieveEntitiesByIds.searchParams(params),
		});
		return url;
	},
	options(data: RetrieveEntitiesByIds.RequestBody): RequestOptions {
		return { json: data, method: "post", responseType: "json" };
	},
	request(
		data: RetrieveEntitiesByIds.RequestBody,
		params: RetrieveEntitiesByIds.Params,
	): Promise<RetrieveEntitiesByIds.Response> {
		const url = retrieveEntitiesByIds.url(params);
		const options = retrieveEntitiesByIds.options(data);
		return request(url, options);
	},
};

//

export namespace GetEventById {
	export type PathParams = {
		id: Event["id"];
	};
	export type Params = PathParams;
	export type Response = Event;
}

export const getEventById = {
	pathname(params: GetEventById.PathParams): string {
		return `/v2/api/event/${encodeURIComponent(params.id)}`;
	},
	url(params: GetEventById.Params): URL {
		const url = createApiUrl({
			pathname: getEventById.pathname(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: GetEventById.Params): Promise<GetEventById.Response> {
		const url = getEventById.url(params);
		const options = getEventById.options();
		return request(url, options);
	},
};

//

export namespace RetrieveEventsByIds {
	export type SearchParams = PaginatedRequest<never>;
	export type Params = SearchParams;
	export type RequestBody = {
		ids: Array<Event["id"]>;
	};
	export type Response = PaginatedResponse<Event>;
}

export const retrieveEventsByIds = {
	pathname(): string {
		return "/v2/api/events/retrieve";
	},
	searchParams(params: RetrieveEventsByIds.SearchParams): RetrieveEventsByIds.SearchParams {
		return params;
	},
	url(params: RetrieveEventsByIds.Params): URL {
		const url = createApiUrl({
			pathname: retrieveEventsByIds.pathname(),
			searchParams: retrieveEventsByIds.searchParams(params),
		});
		return url;
	},
	options(data: RetrieveEventsByIds.RequestBody): RequestOptions {
		return { json: data, method: "post", responseType: "json" };
	},
	request(
		data: RetrieveEventsByIds.RequestBody,
		params: RetrieveEventsByIds.Params,
	): Promise<RetrieveEventsByIds.Response> {
		const url = retrieveEventsByIds.url(params);
		const options = retrieveEventsByIds.options(data);
		return request(url, options);
	},
};

//

export namespace SearchEntities {
	export type SearchParams = PaginatedRequest<{
		/**
		 * Searches across labels of all entity proxies.
		 */
		q?: string;
		/**
		 * Limit query to specific entity types.
		 */
		kind?: Array<EntityKind>;
		/**
		 * Filter persons by occupation label.
		 */
		occupation?: string;
		/**
		 * Filter persons by occupation id (uri).
		 */
		occupations_id?: Array<VocabularyEntry["id"]>;
		/**
		 * Filter persons by gender label.
		 */
		gender?: Array<string>;
		/**
		 * Filter persons by gender id (uri).
		 */
		gender_id?: Array<Gender["id"]>;
		/**
		 * Filter persons born before a certain date.
		 */
		bornBefore?: IsoDateString;
		/**
		 * Filter persons born after a certain date.
		 */
		bornAfter?: IsoDateString;
		/**
		 * Filter persons died before a certain date.
		 */
		diedBefore?: IsoDateString;
		/**
		 * Filter persons died after a certain date.
		 */
		diedAfter?: IsoDateString;
		/**
		 * Limit query to source datasets.
		 */
		datasets?: Array<Dataset["id"]>;
	}>;
	export type Params = SearchParams;
	export type Response = PaginatedResponse<Entity>;
}

export const searchEntities = {
	pathname(): string {
		return "/v2/api/entities/search";
	},
	searchParams(params: SearchEntities.SearchParams): SearchEntities.SearchParams {
		return params;
	},
	url(params: SearchEntities.Params): URL {
		const url = createApiUrl({
			pathname: searchEntities.pathname(),
			searchParams: searchEntities.searchParams(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: SearchEntities.Params): Promise<SearchEntities.Response> {
		const url = searchEntities.url(params);
		const options = searchEntities.options();
		return request(url, options);
	},
};

//

export namespace SearchEvents {
	export type SearchParams = PaginatedRequest<{
		/**
		 * Searches across labels of all events.
		 */
		q?: string;
		/**
		 * Searches labels of related entities.
		 */
		related_entities?: string;
		/**
		 * Searches related entities using IDs.
		 */
		related_entities_id?: Array<Entity["id"]>;
		/**
		 * Searches labels of roles.
		 */
		role?: string;
		/**
		 * Searches roles using IDs.
		 */
		role_id?: Array<EntityRelationRole["id"]>;
		/**
		 * Searches labels of event kinds.
		 */
		event_kind?: string;
		/**
		 * Searches event kinds using IDs.
		 */
		event_kind_id?: EventKind["id"];
		/**
		 * Limit query to source datasets.
		 */
		datasets?: Array<Dataset["id"]>;
	}>;
	export type Params = SearchParams;
	export type Response = PaginatedResponse<Event>;
}

export const searchEvents = {
	pathname(): string {
		return "/v2/api/events/search";
	},
	searchParams(params: SearchEvents.SearchParams): SearchEvents.SearchParams {
		return params;
	},
	url(params: SearchEvents.Params): URL {
		const url = createApiUrl({
			pathname: searchEvents.pathname(),
			searchParams: searchEvents.searchParams(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: SearchEvents.Params): Promise<SearchEvents.Response> {
		const url = searchEvents.url(params);
		const options = searchEvents.options();
		return request(url, options);
	},
};

//

export namespace SearchOccupations {
	export type SearchParams = PaginatedRequest<{
		/**
		 * Filter by label in the occupations vocabulary.
		 */
		q?: string;
		/**
		 * Limit query to source datasets.
		 */
		datasets?: Array<Dataset["id"]>;
	}>;
	export type Params = SearchParams;
	export type Response = PaginatedResponse<VocabularyEntry>;
}

export const searchOccupations = {
	pathname(): string {
		return "/v2/api/vocabularies/occupations/search";
	},
	searchParams(params: SearchOccupations.SearchParams): SearchOccupations.SearchParams {
		return params;
	},
	url(params: SearchOccupations.Params): URL {
		const url = createApiUrl({
			pathname: searchOccupations.pathname(),
			searchParams: searchOccupations.searchParams(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: SearchOccupations.Params): Promise<SearchOccupations.Response> {
		const url = searchOccupations.url(params);
		const options = searchOccupations.options();
		return request(url, options);
	},
};

//

export namespace GetOccupationById {
	export type PathParams = {
		id: VocabularyEntry["id"];
	};
	export type Params = PathParams;
	export type Response = VocabularyEntry;
}

export const getOccupationById = {
	pathname(params: GetOccupationById.Params): string {
		return `/v2/api/vocabularies/occupations/${params.id}`;
	},
	url(params: GetOccupationById.Params): URL {
		const url = createApiUrl({
			pathname: getOccupationById.pathname(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: GetOccupationById.Params): Promise<GetOccupationById.Response> {
		const url = getOccupationById.url(params);
		const options = getOccupationById.options();
		return request(url, options);
	},
};

//

export namespace RetrieveOccupationsByIds {
	export type SearchParams = PaginatedRequest<never>;
	export type Params = SearchParams;
	export type RequestBody = {
		ids: Array<VocabularyEntry["id"]>;
	};
	export type Response = PaginatedResponse<VocabularyEntry>;
}

export const retrieveOccupationsByIds = {
	pathname(): string {
		return "/v2/api/vocabularies/occupations/retrieve";
	},
	searchParams(
		params: RetrieveOccupationsByIds.SearchParams,
	): RetrieveOccupationsByIds.SearchParams {
		return params;
	},
	url(params: RetrieveOccupationsByIds.Params): URL {
		const url = createApiUrl({
			pathname: retrieveOccupationsByIds.pathname(),
			searchParams: retrieveOccupationsByIds.searchParams(params),
		});
		return url;
	},
	options(data: RetrieveOccupationsByIds.RequestBody): RequestOptions {
		return { json: data, method: "post", responseType: "json" };
	},
	request(
		data: RetrieveOccupationsByIds.RequestBody,
		params: RetrieveOccupationsByIds.Params,
	): Promise<RetrieveOccupationsByIds.Response> {
		const url = retrieveOccupationsByIds.url(params);
		const options = retrieveOccupationsByIds.options(data);
		return request(url, options);
	},
};

//

export namespace SearchRelationRoles {
	export type SearchParams = PaginatedRequest<{
		/**
		 * Filter by label in the occupations vocabulary.
		 */
		q?: string;
		/**
		 * Limit query to source datasets.
		 */
		datasets?: Array<Dataset["id"]>;
	}>;
	export type Params = SearchParams;
	export type Response = PaginatedResponse<VocabularyEntry>;
}

export const searchRelationRoles = {
	pathname(): string {
		return "/v2/api/vocabularies/role/search";
	},
	searchParams(params: SearchRelationRoles.SearchParams): SearchRelationRoles.SearchParams {
		return params;
	},
	url(params: SearchRelationRoles.Params): URL {
		const url = createApiUrl({
			pathname: searchRelationRoles.pathname(),
			searchParams: searchRelationRoles.searchParams(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: SearchRelationRoles.Params): Promise<SearchRelationRoles.Response> {
		const url = searchRelationRoles.url(params);
		const options = searchRelationRoles.options();
		return request(url, options);
	},
};

//

export namespace GetRelationRoleById {
	export type PathParams = {
		id: VocabularyEntry["id"];
	};
	export type Params = PathParams;
	export type Response = VocabularyEntry;
}

export const getRelationRoleById = {
	pathname(params: GetRelationRoleById.Params): string {
		return `/v2/api/vocabularies/role/${params.id}`;
	},
	url(params: GetRelationRoleById.Params): URL {
		const url = createApiUrl({
			pathname: getRelationRoleById.pathname(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: GetRelationRoleById.Params): Promise<GetRelationRoleById.Response> {
		const url = getRelationRoleById.url(params);
		const options = getRelationRoleById.options();
		return request(url, options);
	},
};

//

export namespace RetrieveRelationRolesByIds {
	export type SearchParams = PaginatedRequest<never>;
	export type Params = SearchParams;
	export type RequestBody = {
		ids: Array<VocabularyEntry["id"]>;
	};
	export type Response = PaginatedResponse<VocabularyEntry>;
}

export const retrieveRelationRolesByIds = {
	pathname(): string {
		return "/v2/api/vocabularies/role/retrieve";
	},
	searchParams(
		params: RetrieveRelationRolesByIds.SearchParams,
	): RetrieveRelationRolesByIds.SearchParams {
		return params;
	},
	url(params: RetrieveRelationRolesByIds.Params): URL {
		const url = createApiUrl({
			pathname: retrieveRelationRolesByIds.pathname(),
			searchParams: retrieveRelationRolesByIds.searchParams(params),
		});
		return url;
	},
	options(data: RetrieveRelationRolesByIds.RequestBody): RequestOptions {
		return { json: data, method: "post", responseType: "json" };
	},
	request(
		data: RetrieveRelationRolesByIds.RequestBody,
		params: RetrieveRelationRolesByIds.Params,
	): Promise<RetrieveRelationRolesByIds.Response> {
		const url = retrieveRelationRolesByIds.url(params);
		const options = retrieveRelationRolesByIds.options(data);
		return request(url, options);
	},
};

//

export namespace SearchEventKinds {
	export type SearchParams = PaginatedRequest<{
		/**
		 * Filter by label in the occupations vocabulary.
		 */
		q?: string;
		/**
		 * Limit query to source datasets.
		 */
		datasets?: Array<Dataset["id"]>;
	}>;
	export type Params = SearchParams;
	export type Response = PaginatedResponse<VocabularyEntry>;
}

export const searchEventKinds = {
	pathname(): string {
		return "/v2/api/vocabularies/event_kind/search";
	},
	searchParams(params: SearchEventKinds.SearchParams): SearchEventKinds.SearchParams {
		return params;
	},
	url(params: SearchEventKinds.Params): URL {
		const url = createApiUrl({
			pathname: searchEventKinds.pathname(),
			searchParams: searchEventKinds.searchParams(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: SearchEventKinds.Params): Promise<SearchEventKinds.Response> {
		const url = searchEventKinds.url(params);
		const options = searchEventKinds.options();
		return request(url, options);
	},
};

//

export namespace GetEventKindById {
	export type PathParams = {
		id: VocabularyEntry["id"];
	};
	export type Params = PathParams;
	export type Response = VocabularyEntry;
}

export const getEventKindById = {
	pathname(params: GetEventKindById.Params): string {
		return `/v2/api/vocabularies/event_kind/${params.id}`;
	},
	url(params: GetEventKindById.Params): URL {
		const url = createApiUrl({
			pathname: getEventKindById.pathname(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: GetEventKindById.Params): Promise<GetEventKindById.Response> {
		const url = getEventKindById.url(params);
		const options = getEventKindById.options();
		return request(url, options);
	},
};

//

export namespace RetrieveEventKindsByIds {
	export type SearchParams = PaginatedRequest<never>;
	export type Params = SearchParams;
	export type RequestBody = {
		ids: Array<VocabularyEntry["id"]>;
	};
	export type Response = PaginatedResponse<VocabularyEntry>;
}

export const retrieveEventKindsByIds = {
	pathname(): string {
		return "/v2/api/vocabularies/event_kind/retrieve";
	},
	searchParams(params: RetrieveEventKindsByIds.SearchParams): RetrieveEventKindsByIds.SearchParams {
		return params;
	},
	url(params: RetrieveEventKindsByIds.Params): URL {
		const url = createApiUrl({
			pathname: retrieveEventKindsByIds.pathname(),
			searchParams: retrieveEventKindsByIds.searchParams(params),
		});
		return url;
	},
	options(data: RetrieveEventKindsByIds.RequestBody): RequestOptions {
		return { json: data, method: "post", responseType: "json" };
	},
	request(
		data: RetrieveEventKindsByIds.RequestBody,
		params: RetrieveEventKindsByIds.Params,
	): Promise<RetrieveEventKindsByIds.Response> {
		const url = retrieveEventKindsByIds.url(params);
		const options = retrieveEventKindsByIds.options(data);
		return request(url, options);
	},
};

//

export namespace BirthStatisticsSearch {
	export type SearchParams = {
		/**
		 * Searches across labels of all entity proxies.
		 */
		q?: string;
		/**
		 * Filter persons by occupation label.
		 */
		occupation?: string;
		/**
		 * Filter persons by occupation id (uri).
		 */
		occupations_id?: Array<VocabularyEntry["id"]>;
		/**
		 * Filter persons by gender label.
		 */
		gender?: Array<string>;
		/**
		 * Filter persons by gender id (uri).
		 */
		gender_id?: Array<Gender["id"]>;
		/**
		 * Filter persons born before a certain date.
		 */
		bornBefore?: IsoDateString;
		/**
		 * Filter persons born after a certain date.
		 */
		bornAfter?: IsoDateString;
		/**
		 * Filter persons died before a certain date.
		 */
		diedBefore?: IsoDateString;
		/**
		 * Filter persons died after a certain date.
		 */
		diedAfter?: IsoDateString;
		/**
		 * Limit query to source datasets.
		 */
		datasets?: Array<Dataset["id"]>;
		/**
		 * Into how many bins the result set should be chunked.
		 *
		 * @default 10
		 */
		bins?: number;
	};
	export type Params = SearchParams;
	export type Response = {
		bins: Array<Bin<IsoDateString>>;
	};
}

export const searchBirthStatistics = {
	pathname(): string {
		return "/v2/api/statistics/birth/search";
	},
	searchParams(params: BirthStatisticsSearch.SearchParams): BirthStatisticsSearch.SearchParams {
		return params;
	},
	url(params: BirthStatisticsSearch.Params): URL {
		const url = createApiUrl({
			pathname: searchBirthStatistics.pathname(),
			searchParams: searchBirthStatistics.searchParams(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: BirthStatisticsSearch.Params): Promise<BirthStatisticsSearch.Response> {
		const url = searchBirthStatistics.url(params);
		const options = searchBirthStatistics.options();
		return request(url, options);
	},
};

//

export namespace DeathStatisticsSearch {
	export type SearchParams = {
		/**
		 * Searches across labels of all entity proxies.
		 */
		q?: string;
		/**
		 * Filter persons by occupation label.
		 */
		occupation?: string;
		/**
		 * Filter persons by occupation id (uri).
		 */
		occupations_id?: Array<VocabularyEntry["id"]>;
		/**
		 * Filter persons by gender label.
		 */
		gender?: Array<string>;
		/**
		 * Filter persons by gender id (uri).
		 */
		gender_id?: Array<Gender["id"]>;
		/**
		 * Filter persons born before a certain date.
		 */
		bornBefore?: IsoDateString;
		/**
		 * Filter persons born after a certain date.
		 */
		bornAfter?: IsoDateString;
		/**
		 * Filter persons died before a certain date.
		 */
		diedBefore?: IsoDateString;
		/**
		 * Filter persons died after a certain date.
		 */
		diedAfter?: IsoDateString;
		/**
		 * Limit query to source datasets.
		 */
		datasets?: Array<Dataset["id"]>;
		/**
		 * Into how many bins the result set should be chunked.
		 *
		 * @default 10
		 */
		bins?: number;
	};
	export type Params = SearchParams;
	export type Response = {
		bins: Array<Bin<IsoDateString>>;
	};
}

export const searchDeathStatistics = {
	pathname(): string {
		return "/v2/api/statistics/death/search";
	},
	searchParams(params: DeathStatisticsSearch.SearchParams): DeathStatisticsSearch.SearchParams {
		return params;
	},
	url(params: DeathStatisticsSearch.Params): URL {
		const url = createApiUrl({
			pathname: searchDeathStatistics.pathname(),
			searchParams: searchDeathStatistics.searchParams(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: DeathStatisticsSearch.Params): Promise<DeathStatisticsSearch.Response> {
		const url = searchDeathStatistics.url(params);
		const options = searchDeathStatistics.options();
		return request(url, options);
	},
};

//

export namespace OccupationStatisticsSearch {
	export type SearchParams = {
		/**
		 * Searches across labels of all entity proxies.
		 */
		q?: string;
		/**
		 * Filter persons by occupation label.
		 */
		occupation?: string;
		/**
		 * Filter persons by occupation id (uri).
		 */
		occupations_id?: Array<VocabularyEntry["id"]>;
		/**
		 * Filter persons by gender label.
		 */
		gender?: Array<string>;
		/**
		 * Filter persons by gender id (uri).
		 */
		gender_id?: Array<Gender["id"]>;
		/**
		 * Filter persons born before a certain date.
		 */
		bornBefore?: IsoDateString;
		/**
		 * Filter persons born after a certain date.
		 */
		bornAfter?: IsoDateString;
		/**
		 * Filter persons died before a certain date.
		 */
		diedBefore?: IsoDateString;
		/**
		 * Filter persons died after a certain date.
		 */
		diedAfter?: IsoDateString;
		/**
		 * Limit query to source datasets.
		 */
		datasets?: Array<Dataset["id"]>;
	};
	export type Params = SearchParams;
	export type Response = {
		tree: RootNode<VocabularyEntry>;
	};
}

export const searchOccupationStatistics = {
	pathname(): string {
		return "/v2/api/statistics/occupations/search";
	},
	searchParams(
		params: OccupationStatisticsSearch.SearchParams,
	): OccupationStatisticsSearch.SearchParams {
		return params;
	},
	url(params: OccupationStatisticsSearch.Params): URL {
		const url = createApiUrl({
			pathname: searchOccupationStatistics.pathname(),
			searchParams: searchOccupationStatistics.searchParams(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: OccupationStatisticsSearch.Params): Promise<OccupationStatisticsSearch.Response> {
		const url = searchOccupationStatistics.url(params);
		const options = searchOccupationStatistics.options();
		return request(url, options);
	},
};
