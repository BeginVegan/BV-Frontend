import { Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const SearchResultPage = () => {
  const { query } = useParams();
  const { status, data, error, isFetching } = useQuery('fetchLuke', async () => {
    const { data } = await axios.get('http://swapi.dev/api/people/1/');
    return data;
  });
  console.log(data);
  return (
    <VStack>
      <Text>{query}에 대한 검색결과</Text>
      {/* <Text>{data}</Text> */}
    </VStack>
  );
};

export default SearchResultPage;
