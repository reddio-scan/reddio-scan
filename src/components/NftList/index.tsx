import { useEffect, useState } from 'react';
import NftCard from '../NftCard';
import { SimpleGrid, GridItem, Center } from '@chakra-ui/react';
import axios from 'axios';
import { baseurl } from '../../lib/config';
interface Stark {
  starkKey: string;
}

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

interface NFTData {
  tokenId: string;
  baseUri: string;
}

const NftList = ({ starkKey }: Stark) => {
  const [tokenIds, setTokenIds] = useState<NFTData[]>([]);
  const iterate = (list: Balance[]) => {
    const data = [];
    for (const value of list) {
      if (value.type === 'ERC721' || value.type === 'ERC721M') {
        const payload = {
          tokenId: value.token_id,
          baseUri: value.base_uri + value.token_id,
        };
        data.push(payload);
      }
    }
    setTokenIds(data);
  };

  const getL2Balances = async () => {
    try {
      const resp = await axios.get(
        `${baseurl}/v1/balances?stark_key=${starkKey}`,
      );
      iterate(resp.data.data.list);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getL2Balances().catch((e) => console.log(e));
  }, [starkKey]);

  return (
    <>
      {tokenIds.length > 0 ? (
        <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} gap={5}>
          {tokenIds.map((value, key) => {
            return (
              <>
                <GridItem>
                  <NftCard
                    key={key}
                    baseUri={value.baseUri}
                    tokenId={value.tokenId}
                  />
                </GridItem>
              </>
            );
          })}
        </SimpleGrid>
      ) : (
        <>
          <br />
          <Center> No NFTs found </Center>
        </>
      )}
    </>
  );
};

export default NftList;
