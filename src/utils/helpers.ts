import { capitalize } from 'lodash-es';

/**
 * Converts a string to Title Case splitting word by spaces, maintains punctuation.
 */
export function titleCase(text: string) {
  return text
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}