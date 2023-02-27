import {
  MainContainer,
  OverviewContainer,
} from '../../components/CustomStyled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import getReddioRecords, { AllRecords } from '../../lib/getReddioTxns';
import { useState, useEffect } from 'react';
import { useToast, Spinner } from '@chakra-ui/react';
import Header from '../../components/header';
import RecordsTable from '../../components/DataTable';
import AccountOverview from '../../components/account-overview';
import ContractOverview from '../../components/contract-overview';
import SkeletonChart from '../../components/UI/Skeleton/chart';

const Address: NextPage = () => {
  const router = useRouter();
  const query = router.query;
  const { address } = query;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [displayAddress, setDisplayAddress] = useState<string>('');
  const [allRecordsData, setAllRecordsData] = useState<AllRecords>();
  const [displaySearchValueType, setDisplaySearchValueType] =
    useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  useEffect(() => {
    const fetchData = async (): Promise<null> => {
      // set isLoading to true
      setIsLoading(true);
      if (address !== undefined) {
        const { statusOK, searchValueType, data } = await getReddioRecords(
          address?.toString(),
        );
        console.log('statusOK', statusOK);
        // debug
        // data.activityRecords.forEach((element: ActivityRecord) => {
        //   console.log(`stark_key: ${element.id}`);
        // });
        setDisplayAddress(address?.toString());
        setDisplaySearchValueType(searchValueType);
        setAllRecordsData(data);
        if (!statusOK) {
          toast({
            title: 'Error',
            description: 'Empty results or entered address is not valid',
            status: 'warning',
            duration: 5000,
            isClosable: true,
          });
        }
      }
      setIsLoading(false);
      return null;
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <>
      <MainContainer>
        <Header />
        {isLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <>
            {allRecordsData == null ? (
              <SkeletonChart />
            ) : (
              <OverviewContainer>
                {displaySearchValueType === 'stark_key' ? (
                  <AccountOverview address={displayAddress} />
                ) : (
                  <ContractOverview address={displayAddress} />
                )}
              </OverviewContainer>
            )}
            {/* <AccountOverview
          balanceAvailable={eth}
          ERC20Available={erc20}
          ERC721Available={erc721}
          ERC721MAvailable={erc721M}
          balanceSymbol={balanceSymbol}
        /> */}
            {allRecordsData != null && (
              // (allRecordsData.activityRecords.length > 0 ||
              //   allRecordsData.orderRecords.length > 0) &&
              <RecordsTable
                activityRecords={allRecordsData.activityRecords}
                orderRecords={allRecordsData.orderRecords}
                address={displayAddress}
              />
            )}
          </>
        )}
      </MainContainer>
    </>
  );
};

export default Address;
