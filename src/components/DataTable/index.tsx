import DataTable from 'react-data-table-component';
import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  Input,
  Button,
  InputRightElement,
  Select,
  HStack,
  Link,
} from '@chakra-ui/react';
import React, { useState, useMemo } from 'react';
import NextLink from 'next/link';
import { ActivityRecord, OrderRecord } from '../../lib/getReddioTxns';
import NftList from '../NftList';
import CollectionTab from '../CollectionTab';

// create props
interface Props {
  activityRecords: ActivityRecord[];
  orderRecords: OrderRecord[];
  address: string;
}
// create function that accepts generic

// filter function
const filterActivityRecordsByText = (
  records: ActivityRecord[],
  filterText: string,
): ActivityRecord[] => {
  const lowerCaseFilterText = filterText.toLowerCase();
  return records.filter(
    (item) =>
      (item.sequence_id
        ?.toString()
        .toLowerCase()
        .includes(lowerCaseFilterText) ??
        false) ||
      (item.contract_address
        ?.toString()
        .toLowerCase()
        .includes(lowerCaseFilterText) ??
        false) ||
      (item.stark_key?.toString().toLowerCase().includes(lowerCaseFilterText) ??
        false) ||
      (item.from?.toString().toLowerCase().includes(lowerCaseFilterText) ??
        false) ||
      (item.to?.toString().toLowerCase().includes(lowerCaseFilterText) ??
        false),
  );
};
const filterActivityRecordsByRecordType = (
  records: ActivityRecord[],
  filterRecordType: string,
): ActivityRecord[] => {
  const lowerCaseFilterText = filterRecordType.toLowerCase();
  return records.filter(
    (item) =>
      item.record_type_name
        ?.toString()
        .toLowerCase()
        .includes(lowerCaseFilterText) ?? false,
  );
};
// order filter function
const filterOrderRecordsByText = (
  records: OrderRecord[],
  filterText: string,
): OrderRecord[] => {
  const lowerCaseFilterText = filterText.toLowerCase();
  return records.filter(
    (item) =>
      (item.sequence_id
        ?.toString()
        .toLowerCase()
        .includes(lowerCaseFilterText) ??
        false) ||
      (item.order.base_contract_address
        ?.toString()
        .toLowerCase()
        .includes(lowerCaseFilterText) ??
        false) ||
      (item.order.quote_contract_address
        ?.toString()
        .toLowerCase()
        .includes(lowerCaseFilterText) ??
        false) ||
      (item.stark_key?.toString().toLowerCase().includes(lowerCaseFilterText) ??
        false),
  );
};
const filterOrderRecordsByRecordType = (
  records: OrderRecord[],
  filterRecordType: string,
): OrderRecord[] => {
  const lowerCaseFilterText = filterRecordType.toLowerCase();
  return records.filter(
    (item) =>
      item.record_type_name
        ?.toString()
        .toLowerCase()
        .includes(lowerCaseFilterText) ?? false,
  );
};
const RecordsTable = (props: Props): JSX.Element => {
  // filtering
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [filterActivityRecordsType, setfilterActivityRecordsType] =
    useState('');
  const [filterOrderRecordsType, setfilterOrderRecordsType] = useState('');

  const filteredActivityItemsByText = filterActivityRecordsByText(
    props.activityRecords,
    filterText,
  );
  const filteredActivityItems = filterActivityRecordsByRecordType(
    filteredActivityItemsByText,
    filterActivityRecordsType,
  );
  const activityRecordSubHeaderMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <HStack spacing="5">
        <Select
          width="40"
          placeholder="Record Type"
          value={filterActivityRecordsType}
          onChange={(e) => setfilterActivityRecordsType(e.target.value)}
        >
          <option value="deposit">Deposit</option>
          <option value="mint">Mint</option>
          <option value="transfer">Transfer</option>
          <option value="withdraw">Withdraw</option>
        </Select>
        <InputGroup width="md">
          <Input
            onChange={(e) => setFilterText(e.target.value)}
            value={filterText}
            placeholder="Filter by Seq ID / Contract Address / Stark Key"
          />
          {filterText ? (
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClear}>
                Clear
              </Button>
            </InputRightElement>
          ) : null}
        </InputGroup>
      </HStack>
    );
  }, [filterText, resetPaginationToggle, filteredActivityItems]);

  // order records
  const filteredOrderItemsByText = filterOrderRecordsByText(
    props.orderRecords,
    filterText,
  );
  const filteredOrderItems = filterOrderRecordsByRecordType(
    filteredOrderItemsByText,
    filterOrderRecordsType,
  );
  const orderRecordSubHeaderMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <HStack spacing="5">
        <Select
          width="40"
          placeholder="Record Type"
          value={filterOrderRecordsType}
          onChange={(e) => setfilterOrderRecordsType(e.target.value)}
        >
          <option value="failed">Failed</option>
          <option value="bidorder">BidOrder</option>
          <option value="askorder">AskOrder</option>
        </Select>
        <InputGroup width="md">
          <Input
            onChange={(e) => setFilterText(e.target.value)}
            value={filterText}
            placeholder="Filter by Seq ID / Contract Address / Stark Key"
          />
          {filterText ? (
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClear}>
                Clear
              </Button>
            </InputRightElement>
          ) : null}
        </InputGroup>
      </HStack>
    );
  }, [filterText, resetPaginationToggle, filteredActivityItems]);
  // function to return link cell for sequence id
  const getSeqIDLink = (sequenceId: string) => {
    return (
      <Link color="blue.700" as={NextLink} href={`/tx/${sequenceId}`}>
        {sequenceId}
      </Link>
    );
  };
  const getAddressLink = (address: string) => {
    return (
      <Link color="blue.700" as={NextLink} href={`/address/${address}`}>
        {address}
      </Link>
    );
  };

  const activityRecordColumn = [
    {
      name: 'Seq ID',
      selector: (row: any) => row.sequence_id,
      sortable: true,
      minWidth: '40px',
      maxWidth: '80px',
      cell: (row: any) => getSeqIDLink(row.sequence_id),
    },
    {
      name: 'UTC Time',
      selector: (row: any) => row.utc_time,
      sortable: true,
      wrap: true,
      maxWidth: '120px',
    },
    {
      name: 'Type',
      selector: (row: any) => row.record_type_name,
      sortable: true,
      minWidth: '40px',
      maxWidth: '100px',
    },
    // {
    //   name: 'Amount',
    //   selector: (row: any) => row.amount,
    //   sortable: true,
    // },
    {
      name: 'Asset ID',
      selector: (row: any) => row.asset_id,
      sortable: true,
      wrap: true,
      minWidth: '100px',
    },
    {
      name: 'Name',
      selector: (row: any) => row.asset_name,
      sortable: true,
      minWidth: '40px',
      maxWidth: '100px',
    },
    {
      name: 'Type',
      selector: (row: any) => row.asset_type,
      sortable: true,
      minWidth: '40px',
      maxWidth: '100px',
    },
    {
      name: 'Token ID',
      selector: (row: any) => row.token_id,
      sortable: true,
      minWidth: '40px',
      maxWidth: '100px',
    },
    // {
    //   name: 'Chain Status',
    //   selector: (row: any) => row.chain_status,
    //   sortable: true,
    // },
    {
      name: 'Contract Address',
      selector: (row: any) => row.contract_address,
      sortable: true,
      wrap: true,
      minWidth: '100px',
      cell: (row: any) => getAddressLink(row.contract_address),
    },
    // {
    //   name: 'Display Value',
    //   selector: (row: any) => row.display_value,
    //   sortable: true,
    // },
    {
      name: 'Stark Key',
      selector: (row: any) => row.stark_key,
      sortable: true,
      wrap: true,
      cell: (row: any) => getAddressLink(row.stark_key),
    },
    {
      name: 'Status',
      selector: (row: any) => row.status_type_name,
      sortable: true,
      minWidth: '40px',
      maxWidth: '120px',
      wrap: true,
    },
    {
      name: 'Resp',
      selector: (row: any) => row.resp,
      sortable: true,
      wrap: true,
    },
    {
      name: 'From',
      selector: (row: any) => row.from,
      sortable: true,
      wrap: true,
      cell: (row: any) => getAddressLink(row.from),
    },
    {
      name: 'To',
      selector: (row: any) => row.to,
      sortable: true,
      wrap: true,
      cell: (row: any) => getAddressLink(row.to),
    },
  ];

  const orderRecordColumn = [
    {
      name: 'Seq ID',
      selector: (row: any) => row.sequence_id,
      sortable: true,
      minWidth: '40px',
      maxWidth: '80px',
      cell: (row: any) => getSeqIDLink(row.sequence_id),
    },
    {
      name: 'UTC Time',
      selector: (row: any) => row.utc_time,
      sortable: true,
      wrap: true,
      maxWidth: '120px',
    },
    {
      name: 'Type',
      selector: (row: any) => row.record_type_name,
      sortable: true,
      minWidth: '40px',
      maxWidth: '100px',
    },
    {
      name: 'Base Asset ID',
      selector: (row: any) => row.order.base_asset_id,
      sortable: true,
      wrap: true,
      minWidth: '40px',
      maxWidth: '120px',
    },
    // {
    //   name: 'Amount',
    //   selector: (row: any) => row.amount,
    //   sortable: true,
    //   minWidth: '40px',
    //   maxWidth: '100px',
    // },
    {
      name: 'Base Asset',
      selector: (row: any) => row.order.base_asset_name,
      sortable: true,
      wrap: true,
      minWidth: '40px',
      maxWidth: '100px',
    },
    {
      name: 'Price',
      selector: (row: any) => row.order.price,
      sortable: true,
      minWidth: '40px',
      maxWidth: '100px',
    },
    {
      name: 'Fee',
      selector: (row: any) => row.order.fee_taken,
      sortable: true,
      minWidth: '40px',
      maxWidth: '100px',
    },
    {
      name: 'Filled',
      selector: (row: any) => row.order.filled,
      sortable: true,
      minWidth: '40px',
      maxWidth: '100px',
    },
    {
      name: 'Name',
      selector: (row: any) => row.order.quote_asset_name,
      sortable: true,
      minWidth: '40px',
      maxWidth: '100px',
    },
    {
      name: 'Contract',
      selector: (row: any) => row.order.quote_contract_address,
      sortable: true,
      wrap: true,
      minWidth: '40px',
      maxWidth: '100px',
      cell: (row: any) => getAddressLink(row.order.quote_contract_address),
    },
    {
      name: 'Token ID',
      selector: (row: any) => row.order.token_id,
      sortable: true,
      minWidth: '40px',
      maxWidth: '100px',
    },
    {
      name: 'Volume',
      selector: (row: any) => row.order.volume,
      sortable: true,
      minWidth: '40px',
      maxWidth: '100px',
    },
    // {
    //   name: 'Chain Status',
    //   selector: (row: any) => row.chain_status,
    //   sortable: true,
    // },
    // {
    //   name: 'Display Value',
    //   selector: (row: any) => row.display_value,
    //   sortable: true,
    // },
    {
      name: 'Stark Key',
      selector: (row: any) => row.stark_key,
      sortable: true,
      wrap: true,
      cell: (row: any) => getAddressLink(row.stark_key),
    },
    {
      name: 'Status',
      selector: (row: any) => row.status_type_name,
      sortable: true,
      minWidth: '40px',
      maxWidth: '120px',
      wrap: true,
    },
    {
      name: 'Resp',
      selector: (row: any) => row.resp,
      sortable: true,
      wrap: true,
    },
    // {
    //   name: 'From',
    //   selector: (row: any) => row.from,
    //   sortable: true,
    //   wrap: true,
    // },
    // {
    //   name: 'To',
    //   selector: (row: any) => row.to,
    //   sortable: true,
    //   wrap: true,
    // },
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
        fontType: 'bold',
        fontFamily: 'system-ui',
        color: 'white',
        backgroundColor: 'grey',
        // width: "95%",
      },
    },
    cells: {
      style: {
        paddingLeft: '2px', // override the cell padding for data cells
        paddingRight: '2px',
        fontSize: '12px',
        fontFamily: 'system-ui',
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
      <Flex width={'95%'} justifyContent={'center'} padding={'30px'}>
        <Tabs width={'100%'}>
          <TabList>
            <Tab>Activity Records</Tab>
            <Tab>Order Records</Tab>
            <Tab>L2 Items</Tab>
            <Tab>Collection</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DataTable
                highlightOnHover={true}
                dense={true}
                customStyles={customTableStyle}
                striped={true}
                title="Activity Records - Deposit, Mint, Transfer & Withdraw"
                columns={activityRecordColumn}
                // data={props.activityRecords}
                data={filteredActivityItems}
                subHeader
                subHeaderComponent={activityRecordSubHeaderMemo}
                pagination={true}
                paginationPerPage={20}
                defaultSortFieldId={1}
                defaultSortAsc={false}
              />
            </TabPanel>
            <TabPanel>
              <DataTable
                highlightOnHover={true}
                dense={true}
                customStyles={customTableStyle}
                striped={true}
                title="Order Records - Asks & Bids"
                columns={orderRecordColumn}
                // data={props.orderRecords}
                data={filteredOrderItems}
                subHeader
                subHeaderComponent={orderRecordSubHeaderMemo}
                pagination={true}
                paginationPerPage={20}
                defaultSortFieldId={1}
                defaultSortAsc={false}
              />
            </TabPanel>
            <TabPanel>
              <NftList starkKey={props.address} />
            </TabPanel>
            <TabPanel>
              <CollectionTab starkKey={props.address} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
};

export default RecordsTable;
