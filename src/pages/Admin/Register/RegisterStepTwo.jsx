import VeganLevel from '@/components/store/VeganLevel';
import {
  Button,
  Divider,
  HStack,
  Image,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const RegisterStepTwo = () => {
  return (
    <>
      <HStack alignItems={'flex-start'} w={'700px'}>
        <Text w={'140px'} fontWeight={600} color={'gray.600'} fontSize="md">
          메뉴등록
        </Text>
        <VStack alignItems={'flex-start'}>
          <VStack
            maxH={'250px'}
            overflowY={'scroll'}
            gap={2}
            p={4}
            boxShadow={
              'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'
            }
            divider={<Divider borderColor={'gray.400'} />}
          >
            <HStack w={'500px'} justifyContent={'space-around'}>
              <Image
                objectFit="cover"
                h={'90px'}
                w={'120px'}
                src={'https://source.unsplash.com/random/?dish'}
              />
              <VStack w={'400px'} textAlign={'left'} alignItems={'flex-start'}>
                <HStack>
                  <Text fontWeight={400} fontSize="md">
                    계란 샌드위치
                  </Text>
                  <Text ml={2} display={'inline'} fontWeight={400} color={'gray.500'} fontSize="md">
                    5,000원
                  </Text>
                  <Button>x</Button>
                  <Button>수정</Button>
                </HStack>
                <Text fontWeight={200} color={'gray.400'} fontSize="sm">
                  크리미하고 부드러운 에그마요에 아삭한 오이를 넣어 식감은 살리고 느끼함을 잡아준
                  에그마요 샌드위치
                </Text>
              </VStack>
            </HStack>
            <HStack w={'500px'} justifyContent={'space-around'}>
              <Image
                objectFit="cover"
                h={'90px'}
                w={'120px'}
                src={'https://source.unsplash.com/random/?dish'}
              />
              <VStack w={'400px'} textAlign={'left'} alignItems={'flex-start'}>
                <HStack>
                  <Text fontWeight={400} fontSize="md">
                    계란 샌드위치
                  </Text>
                  <Text ml={2} display={'inline'} fontWeight={400} color={'gray.500'} fontSize="md">
                    5,000원
                  </Text>
                  <Button>x</Button>
                  <Button>수정</Button>
                </HStack>
                <Text fontWeight={200} color={'gray.400'} fontSize="sm">
                  크리미하고 부드러운 에그마요에 아삭한 오이를 넣어 식감은 살리고 느끼함을 잡아준
                  에그마요 샌드위치
                </Text>
              </VStack>
            </HStack>
            <HStack w={'500px'} justifyContent={'space-around'}>
              <Image
                objectFit="cover"
                h={'90px'}
                w={'120px'}
                src={'https://source.unsplash.com/random/?dish'}
              />
              <VStack w={'400px'} textAlign={'left'} alignItems={'flex-start'}>
                <HStack>
                  <Text fontWeight={400} fontSize="md">
                    계란 샌드위치
                  </Text>
                  <Text ml={2} display={'inline'} fontWeight={400} color={'gray.500'} fontSize="md">
                    5,000원
                  </Text>
                  <Button>x</Button>
                  <Button>수정</Button>
                </HStack>
                <Text fontWeight={200} color={'gray.400'} fontSize="sm">
                  크리미하고 부드러운 에그마요에 아삭한 오이를 넣어 식감은 살리고 느끼함을 잡아준
                  에그마요 샌드위치
                </Text>
              </VStack>
            </HStack>
          </VStack>
          <VStack alignItems={'flex-start'} pt={4} gap={4}>
            <VStack alignItems={'flex-start'}>
              <Text mb="2px">메뉴 정보</Text>
              <HStack>
                <Input placeholder="이름" />
                <Select>
                  <option value="식사">식사</option>
                  <option value="음료">음료</option>
                </Select>
                <Input placeholder="가격" />
              </HStack>
            </VStack>
            <VStack alignItems={'flex-start'}>
              <Text mb="2px">메뉴 상세 설명(최대 100자)</Text>
              <Textarea
                w={'500px'}
                resize={'none'}
                placeholder="메뉴 상세 정보를 입력하세요."
                size="sm"
              />
            </VStack>
            <VStack alignItems={'flex-start'}>
              <Text mb="2px">메뉴 사진</Text>
              <HStack>
                <Image
                  objectFit="cover"
                  h={'90px'}
                  w={'120px'}
                  src={'https://source.unsplash.com/random/?dish'}
                />
                <Input type="file"></Input>
              </HStack>
            </VStack>
          </VStack>
          <Button alignSelf={'flex-end'}>메뉴추가</Button>
          <Divider pt={4} borderColor={'gray.400'} />
        </VStack>
      </HStack>
      <HStack w={'700px'}>
        <Text w={'140px'} fontWeight={600} color={'gray.600'} fontSize="md">
          식당 상세설명
        </Text>
        <VStack alignItems={'flex-start'}>
          <Text mb="2px">식당 상세 설명(최대 100자)</Text>
          <Textarea
            w={'500px'}
            resize={'none'}
            placeholder="식당 상세 정보를 입력하세요."
            size="sm"
          />
        </VStack>
      </HStack>
      <HStack w={'700px'}>
        <Text w={'140px'} fontWeight={600} color={'gray.600'} fontSize="md">
          1인당 평균 가격
        </Text>
        <NumberInput w={'140px'} clampValueOnBlur={false}>
          <NumberInputField />
        </NumberInput>
        <Text fontWeight={600} color={'gray.600'} fontSize="md">
          원
        </Text>
      </HStack>
      <HStack w={'700px'}>
        <Text w={'140px'} fontWeight={600} color={'gray.600'} fontSize="md">
          예약 가능 인원
        </Text>
        <HStack gap={2}>
          <VStack>
            <Text mb="2px">테이블 수</Text>
            <NumberInput w={'140px'} clampValueOnBlur={false}>
              <NumberInputField />
            </NumberInput>
          </VStack>
          <VStack>
            <Text mb="2px">테이블 허용 인원</Text>
            <NumberInput w={'140px'} clampValueOnBlur={false}>
              <NumberInputField />
            </NumberInput>
          </VStack>
        </HStack>
      </HStack>
      <HStack w={'700px'}>
        <Text w={'140px'} fontWeight={600} color={'gray.600'} fontSize="md">
          비건레벨
        </Text>
        <VeganLevel />
      </HStack>
    </>
  );
};

export default RegisterStepTwo;
