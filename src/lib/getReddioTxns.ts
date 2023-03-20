import axios from 'axios';
import epochToUTC from './epochToUTC';
import dedupeArray from './dedupeArray';
import { baseurl } from './config';
interface RecordsAPIResponse<T> {
  status: string;
  error: string;
  error_code: number;
  data: {
    list: T[];
  };
}

export interface RecordsByRecordType<T> {
  record_type: number;
  data: {
    list: T[];
  };
}

interface Order {
  base_asset_id: string;
  base_asset_name: string;
  base_contract_address: string;
  direction: number;
  display_price: string;
  fee_asset_name: string;
  fee_taken: string;
  fee_token_asset: string;
  filled: string;
  price: string;
  quote_asset_id: string;
  quote_asset_name: string;
  quote_asset_type: string;
  quote_contract_address: string;
  volume: string;
  token_id: string;
}

// Single transaction / record types
export interface Transaction {
  amount: string;
  asset_id?: string;
  asset_name?: string;
  asset_type?: string;
  chain_status: number;
  contract_address?: string;
  display_value?: string;
  from?: string;
  record_type: number;
  resp?: string;
  sequence_id: number;
  stark_key: string;
  status: number;
  time: number;
  to?: string;
  token_id?: string;
  utc_time: string;
  record_type_name: string;
  status_type_name: string;
  order?: Order;
}

interface RecordAPIResponse {
  status: string;
  error: string;
  error_code: number;
  data: Transaction[];
}
// create a map of status types
export const StatusType: Record<number, string> = {
  0: 'SubmittedToReddio',
  1: 'AcceptedByReddio',
  2: 'FailedOnReddio',
  3: 'AcceptedOnL2',
  4: 'RejectedOnL2',
  5: 'Rolled',
  6: 'AcceptedOnL1',
};

// create a map of event types
export const EventType: Record<number, string> = {
  0: 'Failed',
  1: 'Deposit',
  2: 'Mint',
  3: 'Transfer',
  4: 'Withdraw',
  7: 'AskOrder',
  8: 'BidOrder',
};

// create a common interface for ActivityRecord types
export interface ActivityRecord {
  amount: string;
  asset_id: string;
  asset_name: string;
  asset_type: string;
  chain_status: number;
  contract_address: string;
  display_value: string;
  record_type: number;
  record_type_name: string;
  status_type_name: string;
  resp: string;
  sequence_id: number;
  stark_key: string;
  status: number;
  time: number;
  token_id?: string;
  from?: string;
  to?: string;
  utc_time: string;
}

// create a common interface for OrderRecord types
export interface OrderRecord {
  amount: string;
  order: {
    base_asset_id: string;
    base_asset_name: string;
    base_contract_address: string;
    direction: number;
    display_price: string;
    fee_asset_name: string;
    fee_taken: string;
    fee_token_asset: string;
    filled: string;
    price: string;
    quote_asset_id: string;
    quote_asset_name: string;
    quote_asset_type: string;
    quote_contract_address: string;
    token_id: string;
    volume: string;
  };
  record_type: number;
  record_type_name: string;
  status_type_name: string;
  sequence_id: number;
  stark_key: string;
  status: number;
  time: number;
  utc_time: string;
}

export interface AllRecords {
  activityRecords: ActivityRecord[];
  orderRecords: OrderRecord[];
  transactionRecords: Transaction[];
}

/**
 *
 * @param records - array of records
 * @param searchValueType - type of search value (stark_key or sequence_id or address)
 * @returns - object with activityRecords, orderRecords, and transactionRecords
 */
const processRecords = (
  records: any[],
  searchValueType: string,
): AllRecords => {
  const activityRecords: ActivityRecord[] = [];
  const orderRecords: OrderRecord[] = [];
  const transactionRecords: Transaction[] = [];
  let activityRecord: ActivityRecord | undefined;
  let orderRecord: OrderRecord | undefined;
  let transactionRecord: Transaction | undefined;
  // add time and increment ID
  const recordsWithUTCTime = records.map((record: any) => {
    return {
      ...record,
      utc_time: epochToUTC(record.time),
      record_type_name: EventType[Number(record.record_type)],
      status_type_name: StatusType[Number(record.status)],
    };
  });
  // check if record is a transaction
  if (searchValueType === 'sequence_id') {
    recordsWithUTCTime.forEach((r: any) => {
      transactionRecord = Object.assign({}, r);
      // if transactionRecord is not null, push to transactionRecords
      if (transactionRecord != null) {
        transactionRecords.push(transactionRecord);
      }
    });
  }
  recordsWithUTCTime.forEach((r: any) => {
    const recordObj = r;
    switch (r.record_type) {
      case 1:
      case 2:
      case 3:
      case 4:
        activityRecord = Object.assign({}, recordObj);
        break;
      case 0:
      case 7:
      case 8:
        orderRecord = Object.assign({}, recordObj);
        break;
    }
    if (activityRecord != null) {
      activityRecords.push(activityRecord);
    }
    if (orderRecord != null) {
      orderRecords.push(orderRecord);
    }
  });

  return { activityRecords, orderRecords, transactionRecords };
};

/**
 *
 * @param searchValue - stark_key, sequence_id, or contract_address
 * @returns {object} with follwing properties:
 * - `statusOK` is true if API call is successful
 * - `searchValueType` is the type of search value (stark_key, sequence_id, or contract_address)
 * - `data` is an object with activityRecords, orderRecords, and transactionRecords
 * @description - get records from Reddio API
 */
const getReddioTxns = async <T>(
  searchValue: string,
): Promise<{
  statusOK: boolean;
  searchValueType: string;
  data: AllRecords;
}> => {
  // switch case for different length of searchValue
  // stark_key is 65 characters
  // contract_address is 42 characters
  // sequence_id is 6 characters
  let getURL: string;
  let searchValueType: string;
  if (searchValue.length === 6) {
    getURL = `${baseurl}/v1/txn?sequence_id=${searchValue}`;
    searchValueType = 'sequence_id';
  } else if (searchValue.length === 42) {
    getURL = `${baseurl}/v1/txns?contract_address=${searchValue}`;
    searchValueType = 'contract_address';
  } else {
    getURL = `${baseurl}/v1/txns?stark_key=${searchValue}`;
    searchValueType = 'stark_key';
  }

  let page: number = 1;
  const perPage: number = 100;
  let recordCount: number = 0;
  let records: any[] = [];

  while (true) {
    try {
      const fullURL = getURL + `&page=${page}&perPage=${perPage}`;
      // console.log(`fullURL: ${fullURL}`);
      const response = await axios.get(fullURL);
      // Cast response data to correct type
      let responseData: RecordAPIResponse | RecordsAPIResponse<T>;
      if (searchValueType === 'sequence_id') {
        responseData = response.data as RecordAPIResponse;
        recordCount = responseData.data.length;
        records = records.concat(responseData.data);
      } else {
        responseData = response.data as RecordsAPIResponse<T>;
        recordCount = responseData.data.list.length;
        records = records.concat(responseData.data.list);
      }
      // Break out of loop for sequence_id search
      if (searchValueType === 'sequence_id') {
        break;
      }
      if (recordCount === 0) {
        console.log(`recordCount stopped at : ${page - 1}`);
        break;
      }
      page++;
    } catch (error) {
      console.log(error);
      break;
    }
  }
  console.log(
    `page: ${page}, recordCount: ${recordCount}, records.length: ${records.length}`,
  );
  // dedupe records
  const dedupedRecords = dedupeArray(records);
  console.log(`dedupedRecords records.length: ${dedupedRecords.length}`);
  if (records.length > 0) {
    return {
      statusOK: true,
      searchValueType,
      data: processRecords(dedupedRecords, searchValueType),
    };
  } else {
    return {
      statusOK: false,
      searchValueType: 'unknown',
      data: {
        activityRecords: [],
        orderRecords: [],
        transactionRecords: [],
      },
    };
  }
};
export default getReddioTxns;
