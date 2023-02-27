import { useEffect, useState } from 'react';
import {
  OverviewDiv,
  MainContainer2,
  OverviewLabel,
  OverviewElementDiv,
  OverviewElementLabel,
  OverviewElement,
} from '../CustomStyled';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

interface Address {
  address: string;
}

const AccountOverview = ({ address }: Address): JSX.Element => {
  const [balanceAvailable, setBalanceAvailable] = useState<string>('');
  const [balanceSymbol, setBalanceSymbol] = useState<string>('');
  const [ERC20Available, setERC20Available] = useState<number>(0);
  const [ERC721Available, setERC721Available] = useState<number>(0);
  const [ERC721MAvailable, setERC721MAvailable] = useState<number>(0);
  const toast = useToast();

  const iterate = (list: any[]) => {
    const count = {
      countERC721: 0,
      countERC20: 0,
      countERC721M: 0,
    };
    for (const value of list) {
      if (value.type === 'ERC721') {
        count.countERC721 += 1;
      }
      if (value.type === 'ERC20') {
        count.countERC20 += 1;
      }
      if (value.type === 'ERC721M') {
        count.countERC721M += 1;
      }
    }
    return count;
  };
  useEffect(() => {
    // getting l2 balance
    // try
    // reddio.apis.getBalancesV2
    axios
      .get(`https://api-dev.reddio.com/v1/balances?stark_key=${address}`)
      .then((res) => {
        console.log(res.data.data.list);
        const { countERC20, countERC721, countERC721M } = iterate(
          res.data.data.list,
        );
        setERC20Available(countERC20);
        setERC721Available(countERC721);
        setERC721MAvailable(countERC721M);
        setBalanceAvailable(res.data.data.list[0].display_value);
        setBalanceSymbol(res.data.data.list[0].type);
      })
      .catch((err) => {
        toast({
          title: 'Fetch Overview Error',
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
          <OverviewLabel>Account Overview</OverviewLabel>
        </OverviewDiv>
        <OverviewElementDiv>
          <OverviewElementLabel>Balance:</OverviewElementLabel>
          <OverviewElement>{`${balanceAvailable} ${balanceSymbol}`}</OverviewElement>
        </OverviewElementDiv>
        <OverviewElementDiv>
          <OverviewElementLabel>ERC20:</OverviewElementLabel>
          <OverviewElement>{`${ERC20Available} ERC20`}</OverviewElement>
        </OverviewElementDiv>
        <OverviewElementDiv>
          <OverviewElementLabel>ERC721:</OverviewElementLabel>
          <OverviewElement>{`${ERC721Available} ERC721`}</OverviewElement>
        </OverviewElementDiv>
        <OverviewElementDiv>
          <OverviewElementLabel>ERC721M:</OverviewElementLabel>
          <OverviewElement>{`${ERC721MAvailable} ERC721M`}</OverviewElement>
        </OverviewElementDiv>
      </MainContainer2>
    </>
  );
};

export default AccountOverview;
