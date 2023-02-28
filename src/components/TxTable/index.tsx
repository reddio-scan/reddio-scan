import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Transaction } from '../../lib/getReddioTxns';
import dedupeArray from '../../lib/dedupeArray';
import {
  isTransferTx,
  isDepositTx,
  getLargestChainStatus,
} from '../../lib/txUtils';
import axios from 'axios';
import NftCard from '../NftCard';
interface Props {
  transactionRecords: Transaction[];
}

interface NFTData {
  tokenId: string | undefined;
  baseUri: string;
}

interface ContractAddress {
  asset_info?: string;
  asset_type?: string;
  banner_image_url?: string;
  contract_address?: string;
  contract_uuid?: string;
  count?: number;
  decimals?: number;
  description?: string;
  external_link?: string;
  image_url?: string;
  metadata_url?: string;
  name?: string;
  quantum?: string;
  symbol?: string;
  total_supply?: string;
  type?: string;
}

const TxTable = ({ transactionRecords }: Props): JSX.Element => {
  const [recordTableData, setRecordTableData] = useState<Transaction>();
  const [starkKeys, setStarkKeys] = useState<string[]>([]);

  useEffect(() => {
    const dedupedArray = dedupeArray(transactionRecords);
    console.table(dedupedArray);
    // console.log(JSON.stringify(dedupedArray));
    // if only 1 entry, then display the data

    if (dedupedArray.length === 1) {
      setRecordTableData(dedupedArray[0]);
      setStarkKeys([dedupedArray[0].stark_key]);
      // if 2 entries, then check if it is a transfer or deposit
    } else if (dedupedArray.length >= 2) {
      if (isTransferTx(dedupedArray)) {
        setRecordTableData(dedupedArray[0]);
        setStarkKeys([dedupedArray[0].stark_key, dedupedArray[1].stark_key]);
      }
      if (isDepositTx(dedupedArray)) {
        const largestChainTx = getLargestChainStatus(dedupedArray);
        setRecordTableData(largestChainTx);
        setStarkKeys([largestChainTx.stark_key]);
      }
    } else {
      console.log('something went wrong');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionRecords]);

  const getAddressLink = (address: string) => {
    return (
      <Link color="blue.700" as={NextLink} href={`/address/${address}`}>
        {address}
      </Link>
    );
  };

  useEffect(() => {
    getL2Balances().catch((e) => console.log(e));
  }, [recordTableData?.token_id]);

  const [tokenIds, setTokenIds] = useState<NFTData>();

  const getL2Balances = async () => {
    if (
      recordTableData?.contract_address != null &&
      recordTableData?.token_id != null
    ) {
      try {
        const resp = await axios.get(
          `https://api-dev.reddio.com/v1/contract_info?contract_address=${recordTableData.contract_address}`,
        );
        const data: ContractAddress = resp.data.data;
        if (recordTableData == null) {
          return;
        } else if (data?.metadata_url != null) {
          const payload: NFTData = {
            tokenId: recordTableData.token_id,
            baseUri: `${data.metadata_url}${recordTableData.token_id}`,
          };
          setTokenIds(payload);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Card width="95%">
      <CardHeader>
        <Text fontSize="2xl">Transaction</Text>
      </CardHeader>
      <CardBody>
        <TableContainer>
          <Table variant="simple">
            {/* <TableCaption>Insert Caption here</TableCaption> */}
            {recordTableData != null && (
              <Tbody>
                <Tr>
                  <Td>Sequence ID</Td>
                  <Td>{recordTableData?.sequence_id}</Td>
                </Tr>
                <Tr>
                  <Td>Time</Td>
                  <Td>{recordTableData?.utc_time}</Td>
                </Tr>
                <Tr>
                  <Td>Record Type</Td>
                  <Td>{recordTableData?.record_type_name}</Td>
                </Tr>
                {/* <Tr>
                  <Td>Chain Status</Td>
                  <Td>{recordTableData?.chain_status}</Td>
                </Tr> */}
                <Tr>
                  <Td>Stark Key(s)</Td>
                  <Td>{starkKeys.join(', ')}</Td>
                </Tr>

                <Tr>
                  <Td>Status</Td>
                  <Td>{recordTableData?.status_type_name}</Td>
                </Tr>
                <Tr>
                  <Td>Response</Td>
                  <Td>{recordTableData?.resp ?? '-'}</Td>
                </Tr>
                {recordTableData.order?.base_asset_id === undefined ? (
                  <>
                    <Tr>
                      <Td>Token ID</Td>
                      <Td>{recordTableData?.token_id}</Td>
                    </Tr>
                    <Tr>
                      <Td>Asset ID</Td>
                      <Td>{recordTableData?.asset_id}</Td>
                    </Tr>
                    <Tr>
                      <Td>Name</Td>
                      <Td>{recordTableData?.asset_name}</Td>
                    </Tr>
                    <Tr>
                      <Td>Token Type</Td>
                      <Td>{recordTableData?.asset_type}</Td>
                    </Tr>
                    <Tr>
                      <Td>Display Value</Td>
                      <Td>{recordTableData?.display_value}</Td>
                    </Tr>

                    <Tr>
                      <Td>Contract Address</Td>
                      <Td>
                        {recordTableData?.contract_address
                          ? getAddressLink(recordTableData?.contract_address)
                          : '-'}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>From</Td>
                      <Td>
                        {recordTableData?.from
                          ? getAddressLink(recordTableData?.from)
                          : '-'}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>To</Td>
                      <Td>
                        {recordTableData?.to
                          ? getAddressLink(recordTableData?.to)
                          : '-'}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Token</Td>
                      <Td>
                        {recordTableData?.asset_type === 'ERC721' &&
                        tokenIds != null ? (
                          <>
                            <NftCard
                              baseUri={tokenIds.baseUri}
                              tokenId={tokenIds.tokenId}
                            />
                          </>
                        ) : (
                          <></>
                        )}
                      </Td>
                    </Tr>
                  </>
                ) : (
                  <>
                    <Tr>
                      <Td>Token ID</Td>
                      <Td>{recordTableData.order?.token_id}</Td>
                    </Tr>
                    <Tr>
                      <Td>Base Asset ID</Td>
                      <Td>{recordTableData.order?.base_asset_id}</Td>
                    </Tr>
                    <Tr>
                      <Td>Base Asset Name</Td>
                      <Td>{recordTableData.order?.base_asset_name}</Td>
                    </Tr>
                    <Tr>
                      <Td>Base Asset Contract Address</Td>
                      <Td>{recordTableData.order?.base_contract_address}</Td>
                    </Tr>
                    <Tr>
                      <Td>Quote Asset ID</Td>
                      <Td>{recordTableData.order?.quote_asset_id}</Td>
                    </Tr>
                    <Tr>
                      <Td>Quote Asset Name</Td>
                      <Td>{recordTableData.order?.quote_asset_name}</Td>
                    </Tr>
                    <Tr>
                      <Td>Quote Asset Type</Td>
                      <Td>{recordTableData.order?.quote_asset_type}</Td>
                    </Tr>
                    <Tr>
                      <Td>Quote Contract Address</Td>
                      <Td>{recordTableData.order?.quote_contract_address}</Td>
                    </Tr>
                    <Tr>
                      <Td>Direction</Td>
                      <Td>{recordTableData.order?.direction}</Td>
                    </Tr>
                    <Tr>
                      <Td>Display Price</Td>
                      <Td>{recordTableData.order?.display_price}</Td>
                    </Tr>
                    <Tr>
                      <Td>Fee Asset Name</Td>
                      <Td>{recordTableData.order?.fee_asset_name}</Td>
                    </Tr>
                    <Tr>
                      <Td>Fee Taken</Td>
                      <Td>{recordTableData.order?.fee_taken}</Td>
                    </Tr>{' '}
                    <Tr>
                      <Td>Fee Token Asset</Td>
                      <Td>{recordTableData.order?.fee_token_asset}</Td>
                    </Tr>
                    <Tr>
                      <Td>Filled</Td>
                      <Td>{recordTableData.order?.filled}</Td>
                    </Tr>
                    <Tr>
                      <Td>Price</Td>
                      <Td>{recordTableData.order?.price}</Td>
                    </Tr>
                    <Tr>
                      <Td>Volume</Td>
                      <Td>{recordTableData.order?.volume}</Td>
                    </Tr>
                  </>
                )}
              </Tbody>
            )}
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};

export default TxTable;
