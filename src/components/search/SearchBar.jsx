import { ROUTES } from '@/routes/ROUTES';
import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, InputRightAddon } from '@chakra-ui/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SearchBar = ({ isMain }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

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
    window.location.reload();
  };

  return (
    <InputGroup
      ml={!isMain && 8}
      w={{ base: '300px', md: '350px', lg: '400px' }}
      display={isMain ? 'flex' : { base: 'none', md: 'flex' }}
    >
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon boxSize={5} color="gray.300" />}
      />
      <Input
        placeholder="지역, 식당 또는 음식"
        size="full"
        borderRadius={isMain ? '3xl' : 'md'}
        bg="white"
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
      <InputRightAddon
        borderRightRadius={isMain && '3xl'}
        children="검색"
        _hover={{ bgColor: 'green.200' }}
        cursor={'pointer'}
        onClick={handleSubmit}
      />
    </InputGroup>
  );
};
export default SearchBar;
