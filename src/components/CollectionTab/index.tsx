import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getCollectionOwn } from '../../lib/getCollectionOwn';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
interface CollectionData {
  contract_address: string;
  token: number;
}
interface Stark {
  starkKey: string;
}
const getAddressLink = (address: string) => {
  return (
    <Link color="blue.700" as={NextLink} href={`/address/${address}`}>
      {address}
    </Link>
  );
};
const CollectionTab = ({ starkKey }: Stark) => {
  const [collection, setCollection] = useState<CollectionData[]>();
  const getL2Collection = async () => {
    try {
      const resp: CollectionData[] = await getCollectionOwn(starkKey);
      setCollection(resp);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getL2Collection().catch((e) => console.log(e));
  }, [starkKey]);
  const CollectionColumn = [
    {
      name: 'Collection',
      selector: (row: any) => getAddressLink(row.contract_address),
      minWidth: '500px',
      maxWidth: '500px',
    },
    {
      name: 'Symbol',
      selector: (row: any) => row.symbol,
      minWidth: '100px',
      maxWidth: '200px',
    },
    {
      name: 'Token',
      selector: (row: any) => row.token,
      minWidth: '100px',
      maxWidth: '200px',
    },
  ];
  return (
    <>
      <DataTable columns={CollectionColumn} data={collection ?? []} />
    </>
  );
};

export default CollectionTab;
