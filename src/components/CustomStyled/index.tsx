import styled from 'styled-components';
// shared
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;

export const MainContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 100%;
  padding: 10px;
  box-shadow: 0 0.5rem 1.2rem rgb(189 197 209);
  border: 1px solid #e7eaf3;
  border-radius: 0.5rem;
  margin: 0px 10px 0px 0px;
`;

export const CollectionSection = styled.div`
  display: flex;
`;

export const MainChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 100%;
  padding: 10px;
  box-shadow: 0 0.5rem 1.2rem rgb(189 197 209);
  border: 1px solid #e7eaf3;
  border-radius: 0.5rem;
  margin: 0px 10px 0px 0px;
`;

export const MainTitle = styled.h1``;

export const ButtonStyling = styled.div`
  padding: '1rem';
`;

// account-overview/index.tsx

export const OverviewDiv = styled.div`
  display: flex;
  border: 0.5px solid black;
  border-style: none none solid none;
`;
export const OverviewLabel = styled.label`
  font-size: 20px;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const OverviewContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const OverviewElementDiv = styled.div`
  display: flex;
  border: 1px solid #e7eaf3;
  border-radius: 0.5rem;
  padding: 5px;
  margin: 10px 0px 0px 0px;
`;

export const OverviewElementLabel = styled.label`
  font-size: 15px;
  width: 200px;
`;

export const OverviewElement = styled.p`
  font-size: 15px;
`;

export const SplitContainer = styled.div`
  display: flex;
`;

export const SplitContainerLeft = styled.div`
  margin: 0px 10px 0px 0px;
`;

export const SplitContainerRight = styled.div`
  margin: 0px 0px 0px 10px;
`;
