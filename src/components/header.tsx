import { useToast, Flex, Box } from '@chakra-ui/react';
import Login from './Login';
import CustomModal from './CustomModal';
import AccountState from './Account';
import SearchBar from './searchBar';
import HomeButton from './UI/homeButton';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useCustomToast from './UI/Toast';
const Header = (): JSX.Element => {
  const router = useRouter();

  const [searchVal, setSearchVal] = useState<string>('');
  const toast = useToast();

  // Function to take the value of an input and set it state
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchVal(event.target.value);
  };
  const handleClearInput = (): void => {
    setSearchVal('');
  };
  const { showCustomToast } = useCustomToast({
    toastFunc: toast,
    toastProps: {
      id: 'input-empty',
      title: 'Input is empty',
      description: 'Please fill a stark key or a transaction id',
      status: 'error',
    },
  });
  const handleSearch = async (): Promise<void> => {
    if (searchVal.trim() === '') {
      showCustomToast();
      return;
    }

    if (searchVal.length === 6) {
      await router.push(`/tx/${searchVal}`);
    } else {
      await router.push(`/address/${searchVal}`);
    }
  };
  // Function to set value sample address in input
  const handleOnSampleSequenceID = (): void => {
    setSearchVal('302102');
  };
  const handleOnSampleStarkKey = (): void => {
    setSearchVal(
      '0x6736f7449da3bf44bf0f7bdd6463818e1ef272641d43021e8bca17b32ec2df0',
    );
  };
  const handleOnSampleContract = (): void => {
    setSearchVal('0x941661bd1134dc7cc3d107bf006b8631f6e65ad5');
  };
  return (
    <>
      <Flex width="100%" p="5" justify="space-between" align="center">
        <Box flexShrink="0">
          <HomeButton />
        </Box>
        <Box ml="20px">
          <SearchBar
            handleInput={handleInput}
            handleSearch={handleSearch}
            handleOnSampleSequenceID={handleOnSampleSequenceID}
            handleOnSampleStarkKey={handleOnSampleStarkKey}
            handleOnSampleContract={handleOnSampleContract}
            handleClearInput={handleClearInput}
            address={searchVal}
          />
        </Box>

        <Flex
          justify="flex-end"
          align="center"
          flex="1 0 auto"
          marginLeft={5}
          display={{ base: 'none', '2xl': 'flex' }}
        >
          <Login />
          <CustomModal
            modalTitle="StarkEx"
            modalHeader="StarkEx Account Details"
          >
            <AccountState />
          </CustomModal>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
