import { Transaction } from './getReddioTxns';
/**
 *
 * @param txArray - array of Transaction objects to be checked
 * @returns boolean - true if transfer tx, false otherwise
 */
export const isTransferTx = (txArray: Transaction[]): boolean => {
  if (
    txArray.length === 2 &&
    txArray[0].record_type_name.toLowerCase() === 'transfer' &&
    txArray[1].record_type_name.toLowerCase() === 'transfer' &&
    txArray[0].time === txArray[1].time &&
    (txArray[0].stark_key === txArray[1].to ||
      txArray[0].stark_key === txArray[1].from) &&
    (txArray[1].stark_key === txArray[0].to ||
      txArray[1].stark_key === txArray[0].from) &&
    txArray[0].stark_key !== txArray[1].stark_key
  ) {
    return true;
  }
  return false;
};

/**
 *
 * @param txArray - array of Transaction objects to be checked
 * @returns boolean - true if deposit tx, false otherwise
 */
export const isDepositTx = (txArray: Transaction[]): boolean => {
  return txArray.every((tx) => {
    return tx.record_type_name.toLowerCase() === 'deposit';
  });
};

/**
 *
 * @param txArray - array of Transaction to be checked
 * @returns tx with the largest chain_status
 */
export const getLargestChainStatus = (txArray: Transaction[]): Transaction => {
  let largestChainStatus = 0;
  let largestChainStatusObject = {};
  txArray.forEach((tx) => {
    if (tx.chain_status > largestChainStatus) {
      largestChainStatus = tx.chain_status;
      largestChainStatusObject = tx;
    }
  });
  return largestChainStatusObject as Transaction;
};
