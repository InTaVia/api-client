import { assert } from "@stefanprobst/assert";
import { type UrlInit, createUrl } from "@stefanprobst/request";

import { baseUrl } from "./config.js";

type CreateApiUrlParams = Omit<UrlInit, "baseUrl">;

export function createApiUrl(params: CreateApiUrlParams): URL {
	assert(baseUrl != null, "Please configure the api base url.");
	return createUrl({ ...params, baseUrl });
}
