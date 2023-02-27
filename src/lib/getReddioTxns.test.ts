import getReddioTxns from './getReddioTxns';

test('getReddioTxnsSequenceId', async () => {
  const searchString = '303699';
  const {
    statusOK,
    searchValueType,
    // data,
  } = await getReddioTxns(searchString);
  expect(statusOK).toBe(true);
  expect(searchValueType).toBe('sequence_id');
});

test('getReddioTxnsSequenceIdBidOrder', async () => {
  const searchString = '303655';
  const { statusOK, searchValueType, data } = await getReddioTxns(searchString);
  expect(statusOK).toBe(true);
  expect(searchValueType).toBe('sequence_id');
  expect(data.transactionRecords[0].record_type_name).toBe('BidOrder');
  expect(data.transactionRecords[0].order?.quote_asset_name).toBe('REDDIO721');
});

test('getReddioTxnsStarkKey', async () => {
  const searchString =
    '0x6736f7449da3bf44bf0f7bdd6463818e1ef272641d43021e8bca17b32ec2df0';
  const {
    statusOK,
    searchValueType,
    // data,
  } = await getReddioTxns(searchString);
  expect(statusOK).toBe(true);
  expect(searchValueType).toBe('stark_key');
});

test('getReddioTxnsContractAddress', async () => {
  const searchString = '0x941661bd1134dc7cc3d107bf006b8631f6e65ad5';
  const {
    statusOK,
    searchValueType,
    // data,
  } = await getReddioTxns(searchString);
  expect(statusOK).toBe(true);
  expect(searchValueType).toBe('contract_address');
});
