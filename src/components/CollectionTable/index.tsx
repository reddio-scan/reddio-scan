import DataTable from 'react-data-table-component';
import SkeletonChart from '../UI/Skeleton/chart';
import { Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ReddioCollection } from '../../lib/getReddioCollections';
interface Props {
  collection?: any;
  pagination?: boolean;
  paginationPerPage?: number;
}

const getCollectionLink = (row: ReddioCollection) => {
  return (
    <Link
      color="blue.700"
      as={NextLink}
      href={`/address/${row.contract_address}`}
    >
      {row.contract_address}
    </Link>
  );
};

const CollectionTable = (props: Props): JSX.Element => {
  const collectionData = [
    {
      name: 'Id',
      selector: (row: ReddioCollection) => row.id,
      sortable: false,
      minWidth: '40px',
      maxWidth: '120px',
    },
    {
      name: 'Collection',
      selector: (row: ReddioCollection) => row.contract_address,
      sortable: true,
      minWidth: '200px',
      cell: (row: ReddioCollection) => getCollectionLink(row),
      // maxWidth: '300px',
    },
    {
      name: '7 day',
      selector: (row: ReddioCollection) => row.day7,
      sortable: true,
      minWidth: '100px',
      cell: (row: ReddioCollection) => `$${row.day7.toLocaleString()}`,
      // maxWidth: '120px',
    },
    {
      name: '30 day',
      selector: (row: ReddioCollection) => row.day30,
      sortable: true,
      minWidth: '100px',
      cell: (row: ReddioCollection) => `$${row.day30.toLocaleString()}`,
      // maxWidth: '120px',
    },
    {
      name: '90 day',
      selector: (row: ReddioCollection) => row.day90,
      sortable: true,
      minWidth: '100px',
      cell: (row: ReddioCollection) => `$${row.day90.toLocaleString()}`,
      // maxWidth: '120px',
    },
    {
      name: 'All Time',
      selector: (row: ReddioCollection) => row.allTime,
      sortable: true,
      minWidth: '100px',
      cell: (row: ReddioCollection) => `$${row.allTime.toLocaleString()}`,
      // maxWidth: '120px',
    },
  ];
  const customTableStyle = {
    table: {
      style: {
        // spacing: "5px",
        // padding: "1px",
        width: '100%',
      },
    },
    pagination: {
      style: {
        // width: "95%",
      },
    },
    headCells: {
      style: {
        paddingLeft: '2px', // override the cell padding for data cells
        paddingRight: '2px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'transparent',
        // width: "95%",
      },
    },
    cells: {
      style: {
        paddingLeft: '2px', // override the cell padding for data cells
        paddingRight: '2px',
        fontSize: '12px',
      },
    },
    columns: {
      style: {
        wrap: true,
      },
    },
  };
  return (
    <>
      <Box minWidth="container.md">
        {!props.collection ? (
          <SkeletonChart />
        ) : (
          <DataTable
            highlightOnHover={true}
            dense={true}
            customStyles={customTableStyle}
            striped={true}
            columns={collectionData}
            data={props.collection}
            defaultSortFieldId={3}
            defaultSortAsc={false}
            pagination={props.pagination ?? true}
            paginationPerPage={props.paginationPerPage ?? 0}
          />
        )}
      </Box>
    </>
  );
};

export default CollectionTable;
