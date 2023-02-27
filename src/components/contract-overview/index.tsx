import { useEffect, useState } from 'react';
import {
  OverviewDiv,
  MainContainer2,
  OverviewLabel,
  SplitContainer,
  SplitContainerLeft,
  SplitContainerRight,
  OverviewElementDiv,
  OverviewElementLabel,
  OverviewElement,
} from '../CustomStyled';
import getReddioCollections from '../../lib/getReddioCollections';
import { useToast } from '@chakra-ui/react';
interface Address {
  address: string;
}
const ContractOverview = ({ address }: Address) => {
  // const [volume, setVolume] = useState<string>('');
  // const [tokenMinted, setTokenMinted] = useState<string>('');
  // const [totalTrades, setTotalTrades] = useState<string>('');
  // const [uniqueOwners, setUniqueOwners] = useState<string>('');
  // const [averagePrice, setAveragePrice] = useState<string>('');
  const [symbol, setSymbol] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [totalSupply, setTotalSupply] = useState<string>('');
  const [assetType, setAssetType] = useState<string>('');
  const [baseUri, setBaseUri] = useState<string>('');
  const [toggle, setToggle] = useState<boolean>(false);
  const toast = useToast();
  function truncate(str: string, length: number) {
    if (str.length > length) {
      return str.slice(0, length) + '...';
    } else return str;
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await getReddioCollections();
        if (data !== undefined) {
          for (const value of data) {
            if (value.contract_address.toString() === address) {
              setSymbol(value.symbol);
              setType(value.type);
              setTotalSupply(value.total_supply);
              setAssetType(value.asset_type);
              setBaseUri(value.base_uri);
              // setVolume('$122,846,827');
              // setTokenMinted('31,808,793');
              // setTotalTrades('11,584,000');
              // setUniqueOwners('186,601');
              // setAveragePrice('0.006');
              return;
            }
          }
        }
      } catch (error: any) {
        console.log(error);
        toast({
          title: 'Fetch Overview Error',
          description: error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    })().catch((err) => {
      toast({
        title: 'Failed Try Error',
        description: err,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
  }, [address]);

  return (
    <>
      <MainContainer2>
        <OverviewDiv>
          <OverviewLabel>Contract Address Overview</OverviewLabel>
        </OverviewDiv>
        <SplitContainer>
          <SplitContainerLeft>
            {/* <OverviewElementDiv>
              <OverviewElementLabel>Trade Volume:</OverviewElementLabel>
              <OverviewElement>{volume}</OverviewElement>
            </OverviewElementDiv>
            <OverviewElementDiv>
              <OverviewElementLabel>Token Minted:</OverviewElementLabel>
              <OverviewElement>{tokenMinted}</OverviewElement>
            </OverviewElementDiv>
            <OverviewElementDiv>
              <OverviewElementLabel>Total Trades:</OverviewElementLabel>
              <OverviewElement>{totalTrades}</OverviewElement>
            </OverviewElementDiv> */}
            <OverviewElementDiv>
              <OverviewElementLabel>Total Supply:</OverviewElementLabel>
              <OverviewElement>{totalSupply}</OverviewElement>
            </OverviewElementDiv>
            <OverviewElementDiv>
              <OverviewElementLabel>Asset Type:</OverviewElementLabel>
              {toggle ? (
                <OverviewElement onClick={() => setToggle(false)}>
                  {assetType}
                </OverviewElement>
              ) : (
                <OverviewElement onClick={() => setToggle(true)}>
                  {truncate(assetType, 15)}
                </OverviewElement>
              )}
            </OverviewElementDiv>
            <OverviewElementDiv>
              <OverviewElementLabel>Base Uri:</OverviewElementLabel>
              <OverviewElement>{baseUri}</OverviewElement>
            </OverviewElementDiv>
          </SplitContainerLeft>
          <SplitContainerRight>
            {/* <OverviewElementDiv>
              <OverviewElementLabel>Unique Owner:</OverviewElementLabel>
              <OverviewElement>{uniqueOwners}</OverviewElement>
            </OverviewElementDiv>
            <OverviewElementDiv>
              <OverviewElementLabel>Average Price:</OverviewElementLabel>
              <OverviewElement>{averagePrice}</OverviewElement>
            </OverviewElementDiv> */}
            <OverviewElementDiv>
              <OverviewElementLabel>Symbol:</OverviewElementLabel>
              <OverviewElement>{symbol}</OverviewElement>
            </OverviewElementDiv>
            <OverviewElementDiv>
              <OverviewElementLabel>Type:</OverviewElementLabel>
              <OverviewElement>{type}</OverviewElement>
            </OverviewElementDiv>
          </SplitContainerRight>
        </SplitContainer>
      </MainContainer2>
    </>
  );
};

export default ContractOverview;
