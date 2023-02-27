import { useAccount } from 'wagmi';
import { FC, useCallback, useState, useEffect } from 'react';
import { initReddio, reddio } from '../../lib/config';
import { Button, ButtonGroup, useToast } from '@chakra-ui/react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { formatAddress } from '../ConnectButton/formatAddress';
import { useRouter } from 'next/router';

const AccountState: FC = () => {
  const { isConnecting, isDisconnected } = useAccount();
  const [starkKey, setStarkKey]: [string, (newValue: string) => void] =
    useLocalStorage('starkKey', '');
  const [copiedStarkKey, setCopiedStarkKey] = useState(false);
  const toast = useToast();
  const router = useRouter();

  // code from rainbowkit
  const copyAddressAction = useCallback(async () => {
    if (starkKey && starkKey.trim() !== '') {
      await navigator.clipboard.writeText(starkKey);
      setCopiedStarkKey(true);
      toast({
        title: 'Copied to clipboard!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [starkKey]);
  const viewAccountHandler = async () => {
    // push route to user account page
    await router.push(`/address/${starkKey}`);
    return null;
  };

  useEffect(() => {
    if (copiedStarkKey) {
      const timer = setTimeout(() => {
        setCopiedStarkKey(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [copiedStarkKey]);

  const clearStarkKey = (): void => {
    setStarkKey('');
  };
  const init = useCallback(async () => {
    initReddio();
    const { publicKey } = await reddio.keypair.generateFromEthSignature();

    // console.log(publicKey, privateKey);
    setStarkKey(publicKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isConnecting) return <div>Status: Connecting...</div>;
  if (isDisconnected) {
    return (
      <div>Status: Disconnected. Please connect your browser wallet first.</div>
    );
  }
  const accountName =
    starkKey && starkKey.trim() !== ''
      ? formatAddress(starkKey)
      : ('' as string);

  return (
    <>
      {starkKey && starkKey.trim() !== '' ? (
        <div>Stark Key: {accountName}</div>
      ) : (
        <div>Status: Layer 2 key not generated</div>
      )}
      <ButtonGroup
        gap="2"
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
        }}
      >
        {starkKey && starkKey.trim() === '' ? (
          <Button colorScheme="blue" onClick={init}>
            Generate Stark Key
          </Button>
        ) : (
          <>
            <Button colorScheme="blue" onClick={copyAddressAction}>
              Copy Stark Key
            </Button>
            <Button colorScheme="green" onClick={viewAccountHandler}>
              View Account
            </Button>
          </>
        )}
        <Button colorScheme="gray" onClick={clearStarkKey}>
          Disconnect
        </Button>
      </ButtonGroup>
    </>
  );
};

export default AccountState;
