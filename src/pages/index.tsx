import { MainContainer } from '../components/CustomStyled';
import Header from '../components/header';
import TopCollection from '../components/Top-Collection';
import React from 'react';
import dynamic from 'next/dynamic';
import { Card, Stack } from '@chakra-ui/react';
export default function Home(): JSX.Element {
  const SimpleBarChartWithoutSSR = dynamic(
    import('../components/CollectionChart'),
    { ssr: false },
  );

  return (
    <>
      <MainContainer>
        <Header />
        <Stack display="flex" flexDirection={{ base: 'column', '2xl': 'row' }}>
          <Card dropShadow="dark-lg" border="darkgray" p="2" height="md">
            <TopCollection type={true} />
          </Card>
          <Card dropShadow="dark-lg" border="darkgray" p="2" height="md">
            <SimpleBarChartWithoutSSR />
          </Card>
        </Stack>
      </MainContainer>
    </>
  );
}
