import { z } from "zod";

import { defaultPageSize } from "./config.js";

const isoDateString = z.string().datetime();

const urlString = z.string().url();

const internationalizedLabel = z.object({
	default: z.string(),
	de: z.string().optional(),
	du: z.string().optional(),
	en: z.string().optional(),
	fi: z.string().optional(),
	si: z.string().optional(),
});

const gender = z.object({
	id: z.string(),
	label: internationalizedLabel,
});

const position = z.union([
	z.tuple([z.number(), z.number()]),
	z.tuple([z.number(), z.number(), z.number()]),
]);

const geometry = z.union([
	z.object({ type: z.literal("Point"), coordinates: position }),
	z.object({ type: z.literal("Polygon"), coordinates: z.array(z.array(position)) }),
]);

const groupType = z.object({
	id: z.string(),
	label: internationalizedLabel,
});

const historicalEventType = z.object({
	id: z.string(),
	label: internationalizedLabel,
});

const placeType = z.object({
	id: z.string(),
	label: internationalizedLabel,
});

// const source = z.object({
// 	citation: z.string(),
// });

const mediaResource = z.object({
	id: z.string(),
	label: internationalizedLabel,
	description: z.string().optional(),
	attribution: z.string().optional(),
	url: z.string().url(),
	kind: z.enum(["document", "embed", "image", "link", "video"]),
});

const vocabularyEntry = z.object({
	id: z.string(),
	label: internationalizedLabel,
	related: z
		.array(
			z.object({
				relation_type: z.enum(["broader", "narrower", "same-as"]),
				related_vocabulary: z.string() /** vocabularyEntry.shape.id  */,
			}),
		)
		.optional(),
});

const biography = z.object({
	id: z.string(),
	title: z.string().optional(),
	abstract: z.string().optional(),
	text: z.string(),
	citation: z.string().optional(),
});

export const entityRelationRole = z.object({
	id: z.string(),
	label: internationalizedLabel,
});

export const eventEntityRelation = z.object({
	// description: z.string().optional(),
	entity: z.string() /** entity.shape.id */,
	role: entityRelationRole.shape.id,
	// source: source.optional(),
});

export const entityEventRelation = z.object({
	// description: z.string().optional(),
	event: z.string() /** event.shape.id */,
	role: entityRelationRole.shape.id,
	// source: source.optional(),
});

const entityBase = z.object({
	id: z.string(),
	label: internationalizedLabel,
	description: z.string().optional(),
	alternativeLabels: z.array(internationalizedLabel).optional(),
	// source: source.optional(),
	linkedIds: z
		.array(
			z.object({
				url: z.string().url(),
				label: z.string(),
			}),
		)
		.optional(),
	media: z.array(mediaResource.shape.id).optional(),
	relations: z.array(entityEventRelation),
	biographies: z.array(biography.shape.id).optional(),
});

export const culturalHeritageObject = entityBase.extend({
	kind: z.literal("cultural-heritage-object"),
});

export const group = entityBase.extend({
	kind: z.literal("group"),
	type: groupType.optional(),
});

export const historicalEvent = entityBase.extend({
	kind: z.literal("historical-event"),
	type: historicalEventType.optional(),
});

export const person = entityBase.extend({
	kind: z.literal("person"),
	gender: gender.optional(),
	occupations: z.array(vocabularyEntry.shape.id).optional(),
});

export const place = entityBase.extend({
	kind: z.literal("place"),
	type: placeType.optional(),
	geometry: geometry.optional(),
});

export const entity = z.discriminatedUnion("kind", [
	culturalHeritageObject,
	group,
	historicalEvent,
	person,
	place,
]);

export const entityKind = z.union([
	culturalHeritageObject.shape.kind,
	group.shape.kind,
	historicalEvent.shape.kind,
	person.shape.kind,
	place.shape.kind,
]);

export const eventKind = z.object({
	id: z.string(),
	label: internationalizedLabel,
});

export const event = z.object({
	id: z.string(),
	label: internationalizedLabel,
	description: z.string().optional(),
	kind: eventKind.shape.id,
	// source: source.optional(),
	startDate: isoDateString.optional(),
	endDate: isoDateString.optional(),
	media: z.array(mediaResource.shape.id).optional(),
	relations: z.array(eventEntityRelation),
});

//

const binBase = z.object({
	label: z.string(),
	count: z.number(),
});

const isoDateStringBin = binBase.merge(
	z.object({
		values: z.tuple([isoDateString, isoDateString]),
	}),
);

interface Node {
	id: string;
	count: number;
	children: Array<Node>;
}

// Type annotation is necessary with recursive types.
// @see https://github.com/colinhacks/zod#recursive-types
const node: z.ZodType<Node> = z.lazy(() => {
	return z.object({
		id: z.string(),
		label: z.string(),
		count: z.number().int().min(0),
		children: z.array(node),
	});
});

const rootNode = z.object({
	id: z.literal("root"),
	label: z.literal("root"),
	count: z.literal(0),
	children: z.array(node),
});

const paginatedResponse = z.object({
	count: z.number().int().min(0),
	page: z.number().int().min(1),
	pages: z.number().int().min(0),
});

const paginatedRequest = z.object({
	page: z.number().int().min(1).optional().default(1),
	limit: z.number().int().min(1).max(100).optional().default(defaultPageSize),
});

//

export const getEntityByIdPathParams = z.object({
	id: entityBase.shape.id,
});

export const getEntityByIdResponse = entity;

//

export const getEntityEventByIdPathParams = z.object({
	id: event.shape.id,
});

export const getEntityEventByIdResponse = event;

//

export const searchEntitiesSearchParams = paginatedRequest.merge(
	z.object({
		q: z.string().optional(),
		kind: z.array(entityKind).optional(),
		occupation: z.string().optional(),
		occupations_id: z.array(vocabularyEntry.shape.id).optional(),
		gender: z.string().optional(),
		gender_id: gender.shape.id.optional(),
		bornBefore: isoDateString.optional(),
		bornAfter: isoDateString.optional(),
		diedBefore: isoDateString.optional(),
		diedAfter: isoDateString.optional(),
	}),
);

export const searchEntitiesResponse = paginatedResponse.merge(
	z.object({
		results: z.array(entity),
	}),
);

//

export const searchEventsSearchParams = paginatedRequest.merge(
	z.object({
		q: z.string().optional(),
	}),
);

export const searchEventsResponse = paginatedResponse.merge(
	z.object({
		results: z.array(event),
	}),
);

//

export const searchOccupationsSearchParams = paginatedRequest.merge(
	z.object({
		q: z.string().optional(),
	}),
);

export const searchOccupationsResponse = paginatedResponse.merge(
	z.object({
		results: z.array(vocabularyEntry),
	}),
);

//

export const birthStatisticsSearchSearchParams = z.object({
	q: z.string().optional(),
	occupation: z.string().optional(),
	occupations_id: z.array(vocabularyEntry.shape.id).optional(),
	gender: z.string().optional(),
	gender_id: gender.shape.id.optional(),
	bornBefore: isoDateString.optional(),
	bornAfter: isoDateString.optional(),
	diedBefore: isoDateString.optional(),
	diedAfter: isoDateString.optional(),
	bins: z.number().optional().default(10),
});

export const birthStatisticsSearchResponse = z.object({
	results: z.object({
		bins: z.array(isoDateStringBin),
	}),
});

//

export const deathStatisticsSearchSearchParams = z.object({
	q: z.string().optional(),
	occupation: z.string().optional(),
	occupations_id: z.array(vocabularyEntry.shape.id).optional(),
	gender: z.string().optional(),
	gender_id: gender.shape.id.optional(),
	bornBefore: isoDateString.optional(),
	bornAfter: isoDateString.optional(),
	diedBefore: isoDateString.optional(),
	diedAfter: isoDateString.optional(),
	bins: z.number().optional().default(10),
});

export const deathStatisticsSearchResponse = z.object({
	results: z.object({
		bins: z.array(isoDateStringBin),
	}),
});

//

export const occupationsStatisticsSearchSearchParams = z.object({
	q: z.string().optional(),
	occupation: z.string().optional(),
	occupations_id: z.array(vocabularyEntry.shape.id).optional(),
	gender: z.string().optional(),
	gender_id: gender.shape.id.optional(),
	bornBefore: isoDateString.optional(),
	bornAfter: isoDateString.optional(),
	diedBefore: isoDateString.optional(),
	diedAfter: isoDateString.optional(),
});

export const occupationsStatisticsSearchResponse = z.object({
	results: z.object({
		tree: rootNode,
	}),
});
