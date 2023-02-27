import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardFooter, Divider, Image } from '@chakra-ui/react';

interface INFTPros {
  tokenId: string | undefined;
  baseUri: string;
}

const NftCard = ({ tokenId, baseUri }: INFTPros) => {
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    axios
      .get(baseUri)
      .then((res) => {
        setImageUrl(res.data.image);
      })
      .catch((e) => console.log(e));
  });
  return (
    <Card style={{ width: '200px' }}>
      <CardBody>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            style={{ width: '200px', background: 'none', margin: '0px' }}
          />
        ) : null}
      </CardBody>
      <Divider />
      <CardFooter>{tokenId}</CardFooter>
    </Card>
  );
};

export default NftCard;
