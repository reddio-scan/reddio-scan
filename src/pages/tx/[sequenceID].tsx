import { MainContainer } from '../../components/CustomStyled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import getReddioRecords, { AllRecords } from '../../lib/getReddioTxns';
import { useState, useEffect } from 'react';
import { useToast, Spinner } from '@chakra-ui/react';
import Header from '../../components/header';
import TxTable from '../../components/TxTable';
const SequenceID: NextPage = () => {
  const router = useRouter();
  const query = router.query;
  const { sequenceID } = query;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allRecordsData, setAllRecordsData] = useState<AllRecords>();
  useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  useEffect(() => {
    const fetchData = async (): Promise<null> => {
      setIsLoading(true);
      if (sequenceID !== undefined) {
        const { statusOK, data } = await getReddioRecords(
          sequenceID?.toString(),
        );
        if (statusOK) {
          setAllRecordsData(data);
        } else {
          toast({
            title: 'Error',
            description: 'Entered search value is not valid',
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
  }, [sequenceID]);

  return (
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
          {allRecordsData?.transactionRecords != null && (
            <TxTable transactionRecords={allRecordsData.transactionRecords} />
          )}
          )
        </>
      )}
    </MainContainer>
  );
};

export default SequenceID;
