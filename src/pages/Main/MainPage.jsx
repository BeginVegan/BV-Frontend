import { Button, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const handleKeyDown = e => {
    if (e.key === 'Enter') handleSubmit();
  };
  const handleSubmit = () => {
    if (inputRef === null || inputRef.current.value === 'null') return;
    const query = inputRef.current.value;
    console.log(query);
    navigate('/search/' + query);
  };
  const inputRef = useRef(null);
  return (
    <>
      <VStack>
        <Text>Main Page</Text>
        <InputGroup size="lg">
          <Input
            placeholder="지역, 식당 또는 음식"
            size="lg"
            ref={inputRef}
            onKeyDown={handleKeyDown}
          />
          <InputRightElement>
            <Button size="lg" onClick={handleSubmit}>
              검색
            </Button>
          </InputRightElement>
        </InputGroup>
      </VStack>
    </>
  );
};
export default MainPage;
