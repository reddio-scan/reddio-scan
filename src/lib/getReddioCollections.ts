import axios from 'axios';
import getRandomAmount from './getRandomAmount';
import assignIncrementID from './assignIncrementID';
export interface CollectionsAPIResponse {
  status: string;
  error: string;
  error_code: number;
  data: ReddioCollection[];
}

export interface ReddioCollection {
  contract_address: number;
  symbol: string;
  type: string;
  total_supply: string;
  asset_type: string;
  base_uri: string;
  // custom fields
  id: number;
  name: string;
  day7: number;
  day30: number;
  day90: number;
  allTime: number;
}

/**
 *
 * @param collections - Array of collections
 * @returns {ReddioCollection[]} Array of collections with additional custom fields
 */
const processCollections = (
  collections: ReddioCollection[],
): ReddioCollection[] => {
  const processed = collections.map((collection) => {
    return {
      ...collection,
      name:
        collection.base_uri !== ''
          ? collection.base_uri.split('/')[2]
          : collection.contract_address,
      day7: getRandomAmount(3),
      day30: getRandomAmount(4),
      day90: getRandomAmount(5),
      allTime: getRandomAmount(6),
    };
  });

  return assignIncrementID(processed.sort((a, b) => b.day7 - a.day7));
};

/**
 * Get all collections from Reddio API
 * @returns {Promise<Collection[] | null>} Array of collections or null
 */
const getReddioCollections = async (): Promise<
  ReddioCollection[] | undefined
> => {
  try {
    const response = await axios.get<CollectionsAPIResponse>(
      'https://api-dev.reddio.com/v1/collections',
    );
    return processCollections(response.data.data);
  } catch (error) {
    console.log(error);
    // return null;
  }
};

export default getReddioCollections;
