import { useEffect, useState } from 'react';
import CollectionTable from '../CollectionTable';
import { MainTitle } from '../CustomStyled';
import { ExternalLinkIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { Box, HStack } from '@chakra-ui/react';
import getReddioCollections, {
  ReddioCollection,
} from '../../lib/getReddioCollections';
import Link from 'next/link';

interface Props {
  type: boolean;
  pagination?: boolean;
}

const TopCollection = (props: Props): JSX.Element => {
  // const [data, setData] = useState<
  // Array<{
  //   // id: number;
  //   name: string;
  //   day7: string;
  //   day30: string;
  //   day90: string;
  //   allTime: string;
  // }>
  // >();
  const [data, setData] = useState<ReddioCollection[]>();
  useEffect(() => {
    // settimeout to simulate api call
    // setTimeout(
    //   () =>
    //     setData([
    //       {
    //         id: 1,
    //         name: 'God of Unchained',
    //         day7: '$2,118,870',
    //         day30: '$10,024,667',
    //         day90: '$49,531,006',
    //         allTime: '$117,997,488',
    //       },
    //       {
    //         id: 2,
    //         name: 'Undead Blocks Skin Vault',
    //         day7: '$201,773',
    //         day30: '$10,024,667',
    //         day90: '$49,531,006',
    //         allTime: '$117,997,488',
    //       },
    //       {
    //         id: 3,
    //         name: 'BLOCKLORDS BANNERS',
    //         day7: '$129,154',
    //         day30: '$10,024,667',
    //         day90: '$49,531,006',
    //         allTime: '$117,997,488',
    //       },
    //       {
    //         id: 4,
    //         name: 'Illuvium Land',
    //         day7: '$113,024',
    //         day30: '$10,024,667',
    //         day90: '$49,531,006',
    //         allTime: '$117,997,488',
    //       },
    //       {
    //         id: 5,
    //         name: 'Illuvium Land',
    //         day7: '$113,024',
    //         day30: '$10,024,667',
    //         day90: '$49,531,006',
    //         allTime: '$117,997,488',
    //       },
    //       {
    //         id: 6,
    //         name: 'Illuvium Land',
    //         day7: '$113,024',
    //         day30: '$10,024,667',
    //         day90: '$49,531,006',
    //         allTime: '$117,997,488',
    //       },
    //       {
    //         id: 7,
    //         name: 'Illuvium Land',
    //         day7: '$113,024',
    //         day30: '$10,024,667',
    //         day90: '$49,531,006',
    //         allTime: '$117,997,488',
    //       },
    //       {
    //         id: 8,
    //         name: 'Illuvium Land',
    //         day7: '$113,024',
    //         day30: '$10,024,667',
    //         day90: '$49,531,006',
    //         allTime: '$117,997,488',
    //       },
    //       {
    //         id: 9,
    //         name: 'Illuvium Land',
    //         day7: '$113,024',
    //         day30: '$10,024,667',
    //         day90: '$49,531,006',
    //         allTime: '$117,997,488',
    //       },
    //       {
    //         id: 10,
    //         name: 'Illuvium Land',
    //         day7: '$113,024',
    //         day30: '$10,024,667',
    //         day90: '$49,531,006',
    //         allTime: '$117,997,488',
    //       },
    //     ]),
    //   1000,
    // );
    // fetch data from collections api
    const fetchData = async (): Promise<void> => {
      const collectionsData = await getReddioCollections();
      if (collectionsData != null) {
        setData(collectionsData);
      }

      console.log(collectionsData);
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, []);

  return (
    <>
      <Box minWidth="container.md">
        <HStack justifyContent="space-between">
          <MainTitle>Top Collection</MainTitle>
          {props.type ? (
            <Link href="/collection">
              <ExternalLinkIcon />
            </Link>
          ) : (
            <Link href="/">
              <ArrowBackIcon />
            </Link>
          )}
        </HStack>
        <CollectionTable
          collection={data}
          pagination={props.pagination}
          paginationPerPage={10}
        />
      </Box>
    </>
  );
};

export default TopCollection;
