import dedupeArray from './dedupeArray';
import { Transaction } from './getReddioTxns';
test('dedupeArray', () => {
  const txArray: Transaction[] = [
    {
      amount: '1',
      asset_id:
        '0x1c9c7dee2be5015eddff167dda36f319f6bfcd4bd41f9d5cb49fe164bc58cb1',
      asset_name: 'REDDIO721',
      asset_type: 'ERC721',
      chain_status: 0,
      contract_address: '0x941661bd1134dc7cc3d107bf006b8631f6e65ad5',
      display_value: '1',
      from: '0x6736f7449da3bf44bf0f7bdd6463818e1ef272641d43021e8bca17b32ec2df0',
      record_type: 3,
      resp: 'insufficient available',
      sequence_id: 302978,
      stark_key:
        '0x6736f7449da3bf44bf0f7bdd6463818e1ef272641d43021e8bca17b32ec2df0',
      status: 2,
      time: 1669358470,
      to: '0x7865bc66b610d6196a7cbeb9bf066c64984f6f06b5ed3b6f5788bd9a6cb099c',
      token_id: '497',
      utc_time: '2022-11-25T06:41',
      record_type_name: 'Transfer',
    },
    {
      amount: '1',
      asset_id:
        '0x1c9c7dee2be5015eddff167dda36f319f6bfcd4bd41f9d5cb49fe164bc58cb1',
      asset_name: 'REDDIO721',
      asset_type: 'ERC721',
      chain_status: 0,
      contract_address: '0x941661bd1134dc7cc3d107bf006b8631f6e65ad5',
      display_value: '1',
      from: '0x6736f7449da3bf44bf0f7bdd6463818e1ef272641d43021e8bca17b32ec2df0',
      record_type: 3,
      resp: 'insufficient available',
      sequence_id: 302978,
      stark_key:
        '0x7865bc66b610d6196a7cbeb9bf066c64984f6f06b5ed3b6f5788bd9a6cb099c',
      status: 2,
      time: 1669358470,
      to: '0x7865bc66b610d6196a7cbeb9bf066c64984f6f06b5ed3b6f5788bd9a6cb099c',
      token_id: '497',
      utc_time: '2022-11-25T06:41',
      record_type_name: 'Transfer',
    },
    {
      amount: '1',
      asset_id:
        '0x1c9c7dee2be5015eddff167dda36f319f6bfcd4bd41f9d5cb49fe164bc58cb1',
      asset_name: 'REDDIO721',
      asset_type: 'ERC721',
      chain_status: 0,
      contract_address: '0x941661bd1134dc7cc3d107bf006b8631f6e65ad5',
      display_value: '1',
      from: '0x6736f7449da3bf44bf0f7bdd6463818e1ef272641d43021e8bca17b32ec2df0',
      record_type: 3,
      resp: 'insufficient available',
      sequence_id: 302978,
      stark_key:
        '0x6736f7449da3bf44bf0f7bdd6463818e1ef272641d43021e8bca17b32ec2df0',
      status: 2,
      time: 1669358470,
      to: '0x7865bc66b610d6196a7cbeb9bf066c64984f6f06b5ed3b6f5788bd9a6cb099c',
      token_id: '497',
      utc_time: '2022-11-25T06:41',
      record_type_name: 'Transfer',
    },
    {
      amount: '1',
      asset_id:
        '0x1c9c7dee2be5015eddff167dda36f319f6bfcd4bd41f9d5cb49fe164bc58cb1',
      asset_name: 'REDDIO721',
      asset_type: 'ERC721',
      chain_status: 0,
      contract_address: '0x941661bd1134dc7cc3d107bf006b8631f6e65ad5',
      display_value: '1',
      from: '0x6736f7449da3bf44bf0f7bdd6463818e1ef272641d43021e8bca17b32ec2df0',
      record_type: 3,
      resp: 'insufficient available',
      sequence_id: 302978,
      stark_key:
        '0x7865bc66b610d6196a7cbeb9bf066c64984f6f06b5ed3b6f5788bd9a6cb099c',
      status: 2,
      time: 1669358470,
      to: '0x7865bc66b610d6196a7cbeb9bf066c64984f6f06b5ed3b6f5788bd9a6cb099c',
      token_id: '497',
      utc_time: '2022-11-25T06:41',
      record_type_name: 'Transfer',
    },
  ];
  const txArrayExpected: Transaction[] = [
    {
      amount: '1',
      asset_id:
        '0x1c9c7dee2be5015eddff167dda36f319f6bfcd4bd41f9d5cb49fe164bc58cb1',
      asset_name: 'REDDIO721',
      asset_type: 'ERC721',
      chain_status: 0,
      contract_address: '0x941661bd1134dc7cc3d107bf006b8631f6e65ad5',
      display_value: '1',
      from: '0x6736f7449da3bf44bf0f7bdd6463818e1ef272641d43021e8bca17b32ec2df0',
      record_type: 3,
      resp: 'insufficient available',
      sequence_id: 302978,
      stark_key:
        '0x6736f7449da3bf44bf0f7bdd6463818e1ef272641d43021e8bca17b32ec2df0',
      status: 2,
      time: 1669358470,
      to: '0x7865bc66b610d6196a7cbeb9bf066c64984f6f06b5ed3b6f5788bd9a6cb099c',
      token_id: '497',
      utc_time: '2022-11-25T06:41',
      record_type_name: 'Transfer',
    },
    {
      amount: '1',
      asset_id:
        '0x1c9c7dee2be5015eddff167dda36f319f6bfcd4bd41f9d5cb49fe164bc58cb1',
      asset_name: 'REDDIO721',
      asset_type: 'ERC721',
      chain_status: 0,
      contract_address: '0x941661bd1134dc7cc3d107bf006b8631f6e65ad5',
      display_value: '1',
      from: '0x6736f7449da3bf44bf0f7bdd6463818e1ef272641d43021e8bca17b32ec2df0',
      record_type: 3,
      resp: 'insufficient available',
      sequence_id: 302978,
      stark_key:
        '0x7865bc66b610d6196a7cbeb9bf066c64984f6f06b5ed3b6f5788bd9a6cb099c',
      status: 2,
      time: 1669358470,
      to: '0x7865bc66b610d6196a7cbeb9bf066c64984f6f06b5ed3b6f5788bd9a6cb099c',
      token_id: '497',
      utc_time: '2022-11-25T06:41',
      record_type_name: 'Transfer',
    },
  ];
  const actual = dedupeArray(txArray);
  expect(actual).toEqual(txArrayExpected);
});
