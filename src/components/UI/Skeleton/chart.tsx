import { SkeletonText } from '@chakra-ui/react';

const SkeletonChart = (): JSX.Element => {
  return (
    <>
      <SkeletonText mt="4" noOfLines={10} spacing="6" />
    </>
  );
};

export default SkeletonChart;
