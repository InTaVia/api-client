/* eslint-disable @typescript-eslint/no-namespace */

import type { RequestOptions } from "@stefanprobst/request";
import { request } from "@stefanprobst/request";

import { createApiUrl } from "./lib.js";
import type {
	Dataset,
	Entity,
	EntityKind,
	Event,
	Gender,
	Occupation,
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
		occupations_id?: Array<Occupation["id"]>;
		/**
		 * Filter persons by gender label.
		 */
		gender?: string;
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
		q?: string;
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

export namespace SearchEntityEventRoles {
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

export const searchEntityEventRoles = {
	pathname(): string {
		return "/v2/api/vocabularies/role/search";
	},
	searchParams(params: SearchEntityEventRoles.SearchParams): SearchEntityEventRoles.SearchParams {
		return params;
	},
	url(params: SearchEntityEventRoles.Params): URL {
		const url = createApiUrl({
			pathname: searchEntityEventRoles.pathname(),
			searchParams: searchEntityEventRoles.searchParams(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: SearchEntityEventRoles.Params): Promise<SearchEntityEventRoles.Response> {
		const url = searchEntityEventRoles.url(params);
		const options = searchEntityEventRoles.options();
		return request(url, options);
	},
};

//

export namespace GetEntityEventRoleById {
	export type PathParams = {
		id: VocabularyEntry["id"];
	};
	export type Params = PathParams;
	export type Response = VocabularyEntry;
}

export const getEntityEventRoleById = {
	pathname(params: GetEntityEventRoleById.Params): string {
		return `/v2/api/vocabularies/occupations/${params.id}`;
	},
	url(params: GetEntityEventRoleById.Params): URL {
		const url = createApiUrl({
			pathname: getEntityEventRoleById.pathname(params),
		});
		return url;
	},
	options(): RequestOptions {
		return { responseType: "json" };
	},
	request(params: GetEntityEventRoleById.Params): Promise<GetEntityEventRoleById.Response> {
		const url = getEntityEventRoleById.url(params);
		const options = getEntityEventRoleById.options();
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
		return `/v2/api/vocabularies/occupations/${params.id}`;
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
		occupations_id?: Array<Occupation["id"]>;
		/**
		 * Filter persons by gender label.
		 */
		gender?: string;
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
		occupations_id?: Array<Occupation["id"]>;
		/**
		 * Filter persons by gender label.
		 */
		gender?: string;
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
		occupations_id?: Array<Occupation["id"]>;
		/**
		 * Filter persons by gender label.
		 */
		gender?: string;
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
		tree: RootNode<Occupation>;
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
