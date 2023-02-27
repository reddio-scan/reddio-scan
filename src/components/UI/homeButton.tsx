import NextLink from 'next/link';
import { Image, Link } from '@chakra-ui/react';
const HomeButton = (): JSX.Element => {
  return (
    <Link as={NextLink} href="/">
      <Image src="/reddio-icon.png" alt="reddio logo" height="50px" />
    </Link>
  );
};

export default HomeButton;
