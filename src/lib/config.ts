import { ethers } from 'ethers';
import { Reddio } from '@reddio.com/js';

const isMain = process.env.NETWORK === 'main';

const baseurl = isMain
  ? 'https://api.reddio.com'
  : 'https://api-dev.reddio.com';

let reddio: Reddio;
const initReddio = () => {
  if (typeof window !== 'undefined' && !reddio) {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    reddio = new Reddio({
      provider,
      env: isMain ? 'main' : 'test',
    });
  }
};

export { initReddio, reddio, isMain, baseurl };
