export enum OsmElementType {
  NODE = 'node', // Represents a single point
  WAY = 'way', // Represents lines and areas e.g. building outline
  RELATION = 'relation' // Represents grouping of nodes/ways e.g. multi building structure
}

export interface OverpassData<T extends Array<OsmElement<OsmTags>>> {
  version: number;
  generator: string;
  osm3s: {
    // The timestamps are when that section of the osm database was last updated
    timestamp_osm_base: string;
    timestamp_areas_base?: string;
    copyright: string;
  }
  elements: T;
}

interface OsmElement<T extends OsmTags> {
  id: number;
  type: OsmElementType;
  tags: T;
}

export interface OsmWay<T extends OsmTags> extends OsmElement<T> {
  type: OsmElementType.WAY;
  center: {
    lat: number;
    lon: number;
  }
  nodes: Array<number>;
}

export interface OsmNode<T extends OsmTags> extends OsmElement<T> {
  type: OsmElementType.NODE;
  lat: number;
  lon: number;
}

export interface OsmRelation<T extends OsmTags> extends OsmElement<T> {
  type: OsmElementType.RELATION;
  center: {
    lat: number;
    lon: number;
  }
  members: {
    type: OsmElementType;
    ref: number;
    role: string;
  }[];
}

type OsmTags = Record<string, string | undefined>;

// N.B. this interface is not exhaustive of all properties, just the ones we may need
// See https://wiki.openstreetmap.org/wiki/Tag:building=cathedral for more
export interface CathedralTags extends OsmTags {
  name: string;
  amenity: 'place_of_worship';
  religion: 'christian';
  denomination: string;
  ['building:architecture']?: string;
  start_date?: string;
  diocese?: string;
  year_of_construction?: string;
  website?: string;
}