import { ROUTES } from '@/routes/ROUTES';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SearchBar = () => {
  const navigate = useNavigate();
  const handleKeyDown = e => {
    if (e.key === 'Enter') handleSubmit();
  };
  const handleSubmit = () => {
    if (inputRef === null || inputRef.current.value === '') {
      Swal.fire({
        icon: 'question',
        title: '검색어를 입력해주세요',
        text: '지역, 식당 또는 음식',
      });
      return;
    }
    const query = inputRef.current.value;

    navigate(ROUTES.SEARCH_RAW + query);
  };
  const inputRef = useRef(null);
  return (
    <>
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
    </>
  );
};
export default SearchBar;
