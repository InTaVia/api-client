// @see https://github.com/eslint-community/eslint-plugin-n/issues/66
// eslint-disable-next-line n/no-missing-import
import type { Geometry } from "geojson";

import type { InternationalizedLabel, IsoDateString, UrlString } from "./types.js";

export interface Dataset {
	id:
		| "http://data.biographynet.nl/"
		| "http://ldf.fi/nbf/data"
		| "http://www.intavia.eu/sbi"
		| "https://apis.acdh.oeaw.ac.at/data";
}

export interface Gender {
	id: string;
	label: InternationalizedLabel;
}

export interface CulturalHeritageObjectType {
	id: string;
	label: InternationalizedLabel;
}

export interface GroupType {
	id: string;
	label: InternationalizedLabel;
}

export interface HistoricalEventType {
	id: string;
	label: InternationalizedLabel;
}

// export interface MediaKind {
// 	id: string;
// 	label: InternationalizedLabel;
// }

export interface MediaResource {
	id: string;
	label: InternationalizedLabel;
	description?: string;
	attribution?: string;
	url: UrlString;
	// TODO: Should be an actual vocabulary.
	// kind: MediaKind;
	kind: "document" | "embed" | "image" | "link" | "video";
}

export interface VocabularyEntry {
	id: string;
	label: InternationalizedLabel;
	related?: Array<{
		relation_type: "broader" | "narrower" | "same-as";
		related_vocabulary: VocabularyEntry["id"];
	}>;
}

export interface PlaceType {
	id: string;
	label: InternationalizedLabel;
}

export interface Source {
	citation: string;
}

export interface Biography {
	id: string;
	title?: string;
	abstract?: string;
	text: string;
	citation?: string;
}

export interface EntityRelationRole {
	id: string;
	label: InternationalizedLabel;
}

export interface EventKind {
	id: string;
	label: InternationalizedLabel;
}

export interface EventEntityRelation {
	// description?: string;
	entity: Entity["id"];
	role: EntityRelationRole["id"];
	// source?: Source;
}

export interface EntityEventRelation {
	// description?: string;
	event: Event["id"];
	role: EntityRelationRole["id"];
	// source?: Source;
}

export interface Event {
	id: string;
	label: InternationalizedLabel;
	description?: string;
	kind: EventKind["id"];
	// source?: Source;
	startDate?: IsoDateString;
	endDate?: IsoDateString;
	media?: Array<MediaResource["id"]>;
	relations: Array<EventEntityRelation>;
}

interface EntityBase {
	id: string;
	label: InternationalizedLabel;
	description?: string;
	alternativeLabels?: Array<InternationalizedLabel>;
	// source?: Source;
	linkedIds?: Array<{ url: UrlString; label: string }>;
	media?: Array<MediaResource["id"]>;
	biographies?: Array<Biography["id"]>;
	relations: Array<EntityEventRelation>;
}

export interface CulturalHeritageObject extends EntityBase {
	kind: "cultural-heritage-object";
	type?: CulturalHeritageObjectType;
}

export interface Group extends EntityBase {
	kind: "group";
	type?: GroupType;
}

export interface HistoricalEvent extends EntityBase {
	kind: "historical-event";
	type?: HistoricalEventType;
}

export interface Person extends EntityBase {
	kind: "person";
	gender?: Gender;
	occupations?: Array<Pick<VocabularyEntry, "id" | "label">>;
}

export interface Place extends EntityBase {
	kind: "place";
	type?: PlaceType;
	geometry?: Geometry;
}

export type Entity = CulturalHeritageObject | Group | HistoricalEvent | Person | Place;
export type EntityKind = Entity["kind"];
export type EntityMap = {
	[Kind in EntityKind]: Extract<Entity, { kind: Kind }>;
};

export const entityKinds: Array<EntityKind> = [
	"cultural-heritage-object",
	"group",
	"historical-event",
	"person",
	"place",
];
export function isEntityKind(value: string): value is EntityKind {
	return entityKinds.includes(value as EntityKind);
}
