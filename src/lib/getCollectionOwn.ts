import axios from 'axios';

interface Balance {
  asset_id: string;
  balance_available: number;
  balance_frozen: number;
  base_uri: string;
  contract_address: string;
  decimals: number;
  display_frozen: string;
  display_value: string;
  quantum: number;
  symbol: string;
  token_id: string;
  type: string;
}
export interface ReddioCollection {
  contract_address: string;
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

interface NftContract {
  contract_address: string;
}

interface CollectionData {
  contract_address: string;
  symbol: string;
  token: number;
}

/**
 * Get all collections and nft own and return CollectionData and process into correct data
 * @params starkKey
 * @returns {Promise<CollectionData[]>} Array of collections
 */

export const getCollectionOwn = async (
  starkKey: string,
): Promise<CollectionData[]> => {
  const data: CollectionData[] = [];
  const respBalance = await axios.get(
    `https://api-dev.reddio.com/v1/balances?stark_key=${starkKey}`,
  );
  const responseCollection = await axios.get(
    'https://api-dev.reddio.com/v1/collections',
  );
  const NftAddress = iterate(respBalance.data.data.list);
  const respBalanceArray: ReddioCollection[] = responseCollection.data.data;
  for (let i = 0; i < respBalanceArray.length; i++) {
    for (let j = 0; j < NftAddress.length; j++) {
      let count = 0;
      if (
        respBalanceArray[i].contract_address === NftAddress[j].contract_address
      ) {
        if (data.length === 0) {
          data.push({
            contract_address: respBalanceArray[i].contract_address,
            symbol: respBalanceArray[i].symbol,
            token: (count += 1),
          });
        } else {
          for (let k = 0; k < data.length; k++) {
            if (
              data[k].contract_address === respBalanceArray[i].contract_address
            ) {
              data[k].token += 1;
            }
          }
        }
      }
    }
  }
  return data;
};

const iterate = (list: Balance[]) => {
  const data: NftContract[] = [];
  for (const value of list) {
    if (value.type === 'ERC721' || value.type === 'ERC721M') {
      const payload: NftContract = {
        contract_address: value.contract_address,
      };
      data.push(payload);
    }
  }
  return data;
};
