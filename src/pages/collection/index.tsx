import { NextPage } from 'next';
import TopCollection from '../../components/Top-Collection';
import Header from '../../components/header';
import styled from 'styled-components';
const CollectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InsideContainer = styled.div`
  width: 100%;
  padding: 0px 20px 0px 20px;
`;
const Collection: NextPage = () => {
  return (
    <CollectionContainer>
      <Header />
      <InsideContainer>
        <TopCollection type={false} pagination={false} />
      </InsideContainer>
    </CollectionContainer>
  );
};

export default Collection;
