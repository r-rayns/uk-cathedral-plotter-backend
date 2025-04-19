import logger from '../utils/logger.js';
import { CathedralTags, OsmRelation, OsmWay, OverpassData } from '../models/overpass-api.js';
import { Cathedral } from '../models/cathedrals.js';
import { capitalize } from 'lodash-es';
import { titleCase } from '../utils/helpers.js';
import { ApiError } from '../utils/api-error.js';
import { ServerError } from '../models/response-codes.js';

export default class CathedralService {

  public static async fetchCathedrals(): Promise<Array<Cathedral>> {
    // Cathedrals are stored in OSM as either a way or relation.
    const overpassQuery = `
    [out:json][timeout:60];
    area["name"="United Kingdom"]->.uk;
    (
      relation["amenity"="place_of_worship"]["building"="cathedral"](area.uk);
      way["amenity"="place_of_worship"]["building"="cathedral"](area.uk);
    );
    out center;`;


    const response: Response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `data=${encodeURIComponent(overpassQuery)}`
    });
    const data = await response.json() as OverpassData<Array<( OsmRelation<CathedralTags> | OsmWay<CathedralTags> )>>;

    const osmElements = data?.elements;
    if (!osmElements || osmElements.length === 0) {
      logger.log('Error: No OSM elements found!', data);
      throw new ApiError('No cathedrals found', ServerError.INTERNAL_SERVER_ERROR);
    }

    // Construct our Cathedrals using the tags from the OSM elements
    const cathedrals: Cathedral[] = [];
    for (const osmElement of osmElements) {
      const tags: CathedralTags = osmElement.tags;

      cathedrals.push({
        name: tags?.name ?? 'Unknown',
        lat: osmElement?.center?.lat,
        lng: osmElement?.center?.lon,
        religion: 'Christian',
        architecturalStyles: this.extractArchitecturalStyles(osmElement.tags),
        denomination: this.extractDenomination(tags),
        yearOfConstruction: this.extractYearOfConstruction(tags),
        website: tags?.website ?? 'Unknown',
        diocese: tags?.diocese ?? 'Unknown'
      })
    }

    return cathedrals
  }

  /**
   * Extracts and returns a list of architectural styles present in the building:architecture tag.
   */
  private static extractArchitecturalStyles(tags: CathedralTags): Array<string> {
    let architecturalStyles: string[] = [];
    const cathedralArchitecture = tags['building:architecture'];

    if (cathedralArchitecture) {
      architecturalStyles = cathedralArchitecture
        .split(';')
        .map(style => capitalize(style))
    }

    return architecturalStyles
  }

  /**
   * Extracts the year of construction from the given CathedralTags object.
   * If the year_of_construction tag is not available, it attempts to fall back to the start_date tag.
   * Falls back to 'Unknown'
   */
  private static extractYearOfConstruction(tags: CathedralTags): string {
    // Construction year can potentially be located under two properties
    return tags.year_of_construction ?? tags.start_date ?? 'Unknown'
  }

  /**
   * Extracts and returns the denomination of a cathedral based on its denomination tag.
   */
  private static extractDenomination(tags: CathedralTags): string {
    let denomination = 'Unknown';
    const denominationTag = tags.denomination;
    if (denominationTag === 'catholic') {
      // A few cathedrals have been mis-tagged as just Catholic. Correct these here.
      denomination = 'Roman Catholic'
    } else if (denominationTag) {
      // The denomination tag is in snake_case, replace underscores with an empty space and convert to Title Case.
      denomination = titleCase(denominationTag.replaceAll('_', ' '));
    }
    return denomination
  }
}