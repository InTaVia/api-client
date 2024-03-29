/* eslint-disable @typescript-eslint/no-namespace */

import type { RequestOptions } from "@stefanprobst/request";
import { request } from "@stefanprobst/request";

import { createApiUrl } from "./lib.js";
import type {
	Biography,
	Dataset,
	Entity,
	EntityKind,
	EntityRelationRole,
	Event,
	EventKind,
	Gender,
	MediaResource,
	VocabularyEntry,
} from "./models.js";
import type {
	Bin,
	EmptyObject,
	IsoDateString,
	PaginatedRequest,
	PaginatedResponse,
	RootNode,
} from "./types.js";

export namespace GetEntityById {
	export type PathParams = {
		id: Entity["id"];
	};
	export type Params = PathParams;
	export type Response = Entity;
}

export const getEntityById = {
	pathname(params: GetEntityById.PathParams): string {
		return `/v2/api/entities/${encodeURIComponent(params.id)}`;
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
	export type SearchParams = PaginatedRequest<EmptyObject>;
	export type Params = SearchParams;
	export type RequestBody = {
		id: Array<Entity["id"]>;
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
		return `/v2/api/events/${encodeURIComponent(params.id)}`;
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
	export type SearchParams = PaginatedRequest<EmptyObject>;
	export type Params = SearchParams;
	export type RequestBody = {
		id: Array<Event["id"]>;
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

export namespace GetMediaResourceById {
	export type PathParams = {
		id: MediaResource["id"];
	};
	export type Params = PathParams;
	export type Response = MediaResource;
}

export const getMediaResourceById = {
	pathname(params: GetMediaResourceById.PathParams): string {
		return `/v2/api/media/${encodeURIComponent(params.id)}`;
	},
	url(params: GetMediaResourceById.Params): URL {
		const url = createApiUrl({
			pathname: getMediaResourceById.pathname(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: GetMediaResourceById.Params): Promise<GetMediaResourceById.Response> {
		const url = getMediaResourceById.url(params);
		const options = getMediaResourceById.options();
		return request(url, options);
	},
};

//

export namespace RetrieveMediaResourcesByIds {
	export type SearchParams = PaginatedRequest<EmptyObject>;
	export type Params = SearchParams;
	export type RequestBody = {
		id: Array<MediaResource["id"]>;
	};
	export type Response = PaginatedResponse<MediaResource>;
}

export const retrieveMediaResourcesByIds = {
	pathname(): string {
		return "/v2/api/media/retrieve";
	},
	searchParams(
		params: RetrieveMediaResourcesByIds.SearchParams,
	): RetrieveMediaResourcesByIds.SearchParams {
		return params;
	},
	url(params: RetrieveMediaResourcesByIds.Params): URL {
		const url = createApiUrl({
			pathname: retrieveMediaResourcesByIds.pathname(),
			searchParams: retrieveMediaResourcesByIds.searchParams(params),
		});
		return url;
	},
	options(data: RetrieveMediaResourcesByIds.RequestBody): RequestOptions {
		return { json: data, method: "post", responseType: "json" };
	},
	request(
		data: RetrieveMediaResourcesByIds.RequestBody,
		params: RetrieveMediaResourcesByIds.Params,
	): Promise<RetrieveMediaResourcesByIds.Response> {
		const url = retrieveMediaResourcesByIds.url(params);
		const options = retrieveMediaResourcesByIds.options(data);
		return request(url, options);
	},
};

//

export namespace GetBiographyById {
	export type PathParams = {
		id: Biography["id"];
	};
	export type Params = PathParams;
	export type Response = Biography;
}

export const getBiographyById = {
	pathname(params: GetBiographyById.PathParams): string {
		return `/v2/api/biography/${encodeURIComponent(params.id)}`;
	},
	url(params: GetBiographyById.Params): URL {
		const url = createApiUrl({
			pathname: getBiographyById.pathname(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: GetBiographyById.Params): Promise<GetBiographyById.Response> {
		const url = getBiographyById.url(params);
		const options = getBiographyById.options();
		return request(url, options);
	},
};

//

export namespace RetrieveBiographiesByIds {
	export type SearchParams = PaginatedRequest<EmptyObject>;
	export type Params = SearchParams;
	export type RequestBody = {
		id: Array<Biography["id"]>;
	};
	export type Response = PaginatedResponse<Biography>;
}

export const retrieveBiographiesByIds = {
	pathname(): string {
		return "/v2/api/biography/retrieve";
	},
	searchParams(
		params: RetrieveBiographiesByIds.SearchParams,
	): RetrieveBiographiesByIds.SearchParams {
		return params;
	},
	url(params: RetrieveBiographiesByIds.Params): URL {
		const url = createApiUrl({
			pathname: retrieveBiographiesByIds.pathname(),
			searchParams: retrieveBiographiesByIds.searchParams(params),
		});
		return url;
	},
	options(data: RetrieveBiographiesByIds.RequestBody): RequestOptions {
		return { json: data, method: "post", responseType: "json" };
	},
	request(
		data: RetrieveBiographiesByIds.RequestBody,
		params: RetrieveBiographiesByIds.Params,
	): Promise<RetrieveBiographiesByIds.Response> {
		const url = retrieveBiographiesByIds.url(params);
		const options = retrieveBiographiesByIds.options(data);
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
		born_before?: IsoDateString;
		/**
		 * Filter persons born after a certain date.
		 */
		born_after?: IsoDateString;
		/**
		 * Filter persons died before a certain date.
		 */
		died_before?: IsoDateString;
		/**
		 * Filter persons died after a certain date.
		 */
		died_after?: IsoDateString;
		/**
		 * Limit query to source datasets.
		 */
		datasets?: Array<Dataset["id"]>;
		/**
		 * Filter for entities related to the searched entity.
		 */
		related_entity?: string;
		/**
		 * Filter for entities related to the searched entity using URIs.
		 */
		related_entities_id?: Array<Entity["id"]>;
		/**
		 * Filter for event roles related to the searched entity.
		 */
		event_role?: string;
		/**
		 * Filter for event roles related to the searched entity using IDs.
		 */
		event_roles_id?: Array<EntityRelationRole["id"]>;
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
	export type SearchParams = PaginatedRequest<EmptyObject>;
	export type Params = SearchParams;
	export type RequestBody = {
		id: Array<VocabularyEntry["id"]>;
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
		return "/v2/api/vocabularies/roles/search";
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
		return `/v2/api/vocabularies/roles/${params.id}`;
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
	export type SearchParams = PaginatedRequest<EmptyObject>;
	export type Params = SearchParams;
	export type RequestBody = {
		id: Array<VocabularyEntry["id"]>;
	};
	export type Response = PaginatedResponse<VocabularyEntry>;
}

export const retrieveRelationRolesByIds = {
	pathname(): string {
		return "/v2/api/vocabularies/roles/retrieve";
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
		return "/v2/api/vocabularies/event_kinds/search";
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
		return `/v2/api/vocabularies/event_kinds/${params.id}`;
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
	export type SearchParams = PaginatedRequest<EmptyObject>;
	export type Params = SearchParams;
	export type RequestBody = {
		id: Array<VocabularyEntry["id"]>;
	};
	export type Response = PaginatedResponse<VocabularyEntry>;
}

export const retrieveEventKindsByIds = {
	pathname(): string {
		return "/v2/api/vocabularies/event_kinds/retrieve";
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
		born_before?: IsoDateString;
		/**
		 * Filter persons born after a certain date.
		 */
		born_after?: IsoDateString;
		/**
		 * Filter persons died before a certain date.
		 */
		died_before?: IsoDateString;
		/**
		 * Filter persons died after a certain date.
		 */
		died_after?: IsoDateString;
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
		return "/v2/api/statistics/birth_dates/search";
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
		born_before?: IsoDateString;
		/**
		 * Filter persons born after a certain date.
		 */
		born_after?: IsoDateString;
		/**
		 * Filter persons died before a certain date.
		 */
		died_before?: IsoDateString;
		/**
		 * Filter persons died after a certain date.
		 */
		died_after?: IsoDateString;
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
		return "/v2/api/statistics/death_dates/search";
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
		born_before?: IsoDateString;
		/**
		 * Filter persons born after a certain date.
		 */
		born_after?: IsoDateString;
		/**
		 * Filter persons died before a certain date.
		 */
		died_before?: IsoDateString;
		/**
		 * Filter persons died after a certain date.
		 */
		died_after?: IsoDateString;
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

export namespace EntityTypeStatisticsSearch {
	export type SearchParams = {
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
		born_before?: IsoDateString;
		/**
		 * Filter persons born after a certain date.
		 */
		born_after?: IsoDateString;
		/**
		 * Filter persons died before a certain date.
		 */
		died_before?: IsoDateString;
		/**
		 * Filter persons died after a certain date.
		 */
		died_after?: IsoDateString;
		/**
		 * Limit query to source datasets.
		 */
		datasets?: Array<Dataset["id"]>;
		/**
		 * Filter for entities related to the searched entity.
		 */
		related_entity?: string;
		/**
		 * Filter for entities related to the searched entity using URIs.
		 */
		related_entities_id?: Array<Entity["id"]>;
		/**
		 * Filter for event roles related to the searched entity.
		 */
		event_role?: string;
		/**
		 * Filter for event roles related to the searched entity using IDs.
		 */
		event_roles_id?: Array<EntityRelationRole["id"]>;
	};
	export type Params = SearchParams;
	export type Response = {
		person: number;
		place: number;
		group: number;
		"cultural-heritage-object": number;
	};
}

export const searchEntityTypeStatistics = {
	pathname(): string {
		return "/v2/api/statistics/entity_types/search";
	},
	searchParams(
		params: EntityTypeStatisticsSearch.SearchParams,
	): EntityTypeStatisticsSearch.SearchParams {
		return params;
	},
	url(params: EntityTypeStatisticsSearch.Params): URL {
		const url = createApiUrl({
			pathname: searchEntityTypeStatistics.pathname(),
			searchParams: searchEntityTypeStatistics.searchParams(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: EntityTypeStatisticsSearch.Params): Promise<EntityTypeStatisticsSearch.Response> {
		const url = searchEntityTypeStatistics.url(params);
		const options = searchEntityTypeStatistics.options();
		return request(url, options);
	},
};

//

export namespace RetrieveBirthStatistics {
	export type SearchParams = PaginatedRequest<EmptyObject>;
	export type Params = SearchParams;
	export type RequestBody = {
		id: Array<VocabularyEntry["id"]>;
	};
	export type Response = {
		bins: Array<Bin<IsoDateString>>;
	};
}

export const retrieveBirthStatisticsByIds = {
	pathname(): string {
		return "/v2/api/statistics/birth_dates/bulk";
	},
	searchParams(params: RetrieveBirthStatistics.SearchParams): RetrieveBirthStatistics.SearchParams {
		return params;
	},
	url(params: RetrieveBirthStatistics.Params): URL {
		const url = createApiUrl({
			pathname: retrieveBirthStatisticsByIds.pathname(),
			searchParams: retrieveBirthStatisticsByIds.searchParams(params),
		});
		return url;
	},
	options(data: RetrieveBirthStatistics.RequestBody): RequestOptions {
		return { json: data, method: "post", responseType: "json" };
	},
	request(
		data: RetrieveBirthStatistics.RequestBody,
		params: RetrieveBirthStatistics.Params,
	): Promise<RetrieveBirthStatistics.Response> {
		const url = retrieveBirthStatisticsByIds.url(params);
		const options = retrieveBirthStatisticsByIds.options(data);
		return request(url, options);
	},
};

//

export namespace RetrieveDeathStatistics {
	export type SearchParams = PaginatedRequest<EmptyObject>;
	export type Params = SearchParams;
	export type RequestBody = {
		id: Array<VocabularyEntry["id"]>;
	};
	export type Response = {
		bins: Array<Bin<IsoDateString>>;
	};
}

export const retrieveDeathStatisticsByIds = {
	pathname(): string {
		return "/v2/api/statistics/death_dates/bulk";
	},
	searchParams(params: RetrieveDeathStatistics.SearchParams): RetrieveDeathStatistics.SearchParams {
		return params;
	},
	url(params: RetrieveDeathStatistics.Params): URL {
		const url = createApiUrl({
			pathname: retrieveDeathStatisticsByIds.pathname(),
			searchParams: retrieveDeathStatisticsByIds.searchParams(params),
		});
		return url;
	},
	options(data: RetrieveDeathStatistics.RequestBody): RequestOptions {
		return { json: data, method: "post", responseType: "json" };
	},
	request(
		data: RetrieveDeathStatistics.RequestBody,
		params: RetrieveDeathStatistics.Params,
	): Promise<RetrieveDeathStatistics.Response> {
		const url = retrieveDeathStatisticsByIds.url(params);
		const options = retrieveDeathStatisticsByIds.options(data);
		return request(url, options);
	},
};

//

export namespace RetrieveOccupationStatistics {
	export type SearchParams = PaginatedRequest<EmptyObject>;
	export type Params = SearchParams;
	export type RequestBody = {
		id: Array<VocabularyEntry["id"]>;
	};
	export type Response = RootNode<VocabularyEntry>;
}

export const retrieveOccupationStatisticsByIds = {
	pathname(): string {
		return "/v2/api/statistics/occupations/bulk";
	},
	searchParams(
		params: RetrieveOccupationStatistics.SearchParams,
	): RetrieveOccupationStatistics.SearchParams {
		return params;
	},
	url(params: RetrieveOccupationStatistics.Params): URL {
		const url = createApiUrl({
			pathname: retrieveOccupationStatisticsByIds.pathname(),
			searchParams: retrieveOccupationStatisticsByIds.searchParams(params),
		});
		return url;
	},
	options(data: RetrieveOccupationStatistics.RequestBody): RequestOptions {
		return { json: data, method: "post", responseType: "json" };
	},
	request(
		data: RetrieveOccupationStatistics.RequestBody,
		params: RetrieveOccupationStatistics.Params,
	): Promise<RetrieveOccupationStatistics.Response> {
		const url = retrieveOccupationStatisticsByIds.url(params);
		const options = retrieveOccupationStatisticsByIds.options(data);
		return request(url, options);
	},
};

export namespace RetrieveEntityTypeStatistics {
	export type SearchParams = PaginatedRequest<EmptyObject>;
	export type Params = SearchParams;
	export type RequestBody = {
		id: Array<VocabularyEntry["id"]>;
	};
	export type Response = {
		person: number;
		place: number;
		group: number;
		"cultural-heritage-object": number;
	};
}

export const retrieveEntityTypeStatisticsByIds = {
	pathname(): string {
		return "/v2/api/statistics/entity_types/bulk";
	},
	searchParams(
		params: RetrieveEntityTypeStatistics.SearchParams,
	): RetrieveEntityTypeStatistics.SearchParams {
		return params;
	},
	url(params: RetrieveEntityTypeStatistics.Params): URL {
		const url = createApiUrl({
			pathname: retrieveEntityTypeStatisticsByIds.pathname(),
			searchParams: retrieveEntityTypeStatisticsByIds.searchParams(params),
		});
		return url;
	},
	options(data: RetrieveEntityTypeStatistics.RequestBody): RequestOptions {
		return { json: data, method: "post", responseType: "json" };
	},
	request(
		data: RetrieveEntityTypeStatistics.RequestBody,
		params: RetrieveEntityTypeStatistics.Params,
	): Promise<RetrieveEntityTypeStatistics.Response> {
		const url = retrieveEntityTypeStatisticsByIds.url(params);
		const options = retrieveEntityTypeStatisticsByIds.options(data);
		return request(url, options);
	},
};
