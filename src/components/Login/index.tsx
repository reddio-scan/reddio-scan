import type { FC } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  ConnectButton,
  RainbowKitProvider,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { argentWallet, metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.goerli],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID?.toString() ?? '',
    }),
    publicProvider(),
  ],
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [metaMaskWallet({ chains }), argentWallet({ chains })],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const Login: FC = () => {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <div
            style={
              {
                // display: "flex",
                // alignItems: "start",
                // justifyContent: "right",
                // padding: "1rem",
              }
            }
          >
            <ConnectButton />
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};
export default Login;
