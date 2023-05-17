import { Text, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const SearchResultPage = () => {
  const { query } = useParams();
  return (
    <VStack>
      <Text>{query}에 대한 검색결과</Text>
    </VStack>
  );
};

export default SearchResultPage;
