import type { FC } from 'react';
import NextLink from 'next/link';

import {
  Card,
  CardBody,
  Heading,
  Text,
  CardHeader,
  Link,
} from '@chakra-ui/react';
import Header from '../components/header';
const Custom404: FC = () => {
  return (
    <>
      <Header />
      <Card
        w={{ base: '90%', md: '50%' }}
        mx="auto"
        mt="10"
        p="10"
        borderRadius="10"
        boxShadow="lg"
      >
        <CardHeader>
          <Heading>404 - Page Not Found</Heading>
        </CardHeader>
        <CardBody>
          <Text fontSize="xl">
            The page you are looking for does not exist.
            <br />
            Click{' '}
            <Link color="teal" as={NextLink} href="/">
              here{' '}
            </Link>
            to return to the homepage.
          </Text>
        </CardBody>
      </Card>
    </>
  );
};

export default Custom404;
