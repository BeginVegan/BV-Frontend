import React, { useState } from 'react';
import {
  Box,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  StackDivider,
  Text,
  VStack,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Button,
  Flex,
  Input,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';

const RerservationRestaurant = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = React.useState('1');

  return (
    <Stack maxW={'100vw'} justifyContent={'center'} alignItems={'center'} pb={4}>
      <Box>
        <VStack pt={8} pb={3} align={'center'}>
          <Heading
            pb={6}
            display={'inline-block'}
            cursor={'pointer'}
            fontWeight={400}
            fontSize={'2xl'}
          >
            예약하기
          </Heading>
          <VStack
            w={'600px'}
            align={'flex-start'}
            gap={2}
            divider={<StackDivider borderColor={'gray.200'} />}
          >
            <VStack align={'flex-start'}>
              <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                가게정보
              </Text>
              <HStack>
                <Text fontWeight={600} color={'gray.600'} fontSize="md">
                  계란이 맛있는 가게
                </Text>
                <Text>서울 어딘가 어디길12 41</Text>
              </HStack>
            </VStack>
            <VStack align={'flex-start'}>
              <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                식사방식
              </Text>
              <RadioGroup onChange={setValue} value={value}>
                <HStack gap={4}>
                  <Radio value="1">매장식사</Radio>
                  <Radio value="2">포장</Radio>
                </HStack>
              </RadioGroup>
            </VStack>
            <VStack align={'flex-start'}>
              <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                예약일시
              </Text>
              <VStack>
                <DatePicker
                  locale={ko}
                  selected={startDate}
                  dateFormat="yyyy년 MM월 dd일"
                  minDate={new Date()}
                  onChange={date => setStartDate(date)}
                />
              </VStack>
            </VStack>
            <VStack align={'flex-start'}>
              <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                메뉴추가
              </Text>
              <VStack h={'300px'} overflowY={'scroll'}>
                <HStack w={'600px'} justifyContent={'space-around'}>
                  <VStack w={'400px'} textAlign={'left'} alignItems={'flex-start'}>
                    <Text fontWeight={400} fontSize="md">
                      계란 샌드위치
                      <Text
                        ml={2}
                        display={'inline'}
                        fontWeight={400}
                        color={'gray.500'}
                        fontSize="md"
                      >
                        5,000원
                      </Text>
                    </Text>
                    <Text fontWeight={200} color={'gray.400'} fontSize="sm">
                      크리미하고 부드러운 에그마요에 아삭한 오이를 넣어 식감은 살리고 느끼함을
                      잡아준 에그마요 샌드위치
                    </Text>
                  </VStack>
                  <Image
                    objectFit="cover"
                    h={'90px'}
                    w={'120px'}
                    src={'https://source.unsplash.com/random/?dish'}
                  />
                </HStack>
                <HStack w={'600px'} justifyContent={'space-around'}>
                  <VStack w={'400px'} textAlign={'left'} alignItems={'flex-start'}>
                    <Text fontWeight={400} fontSize="md">
                      오징어 샌드위치
                      <Text
                        ml={2}
                        display={'inline'}
                        fontWeight={400}
                        color={'gray.500'}
                        fontSize="md"
                      >
                        5,000원
                      </Text>
                    </Text>
                    <Text fontWeight={200} color={'gray.400'} fontSize="sm">
                      크리미하고 부드러운 에그마요에 아삭한 오이를 넣어 식감은 살리고 느끼함을
                      잡아준 에그마요 샌드위치
                    </Text>
                  </VStack>
                  <Image
                    objectFit="cover"
                    h={'90px'}
                    w={'120px'}
                    src={'https://source.unsplash.com/random/?dish'}
                  />
                </HStack>
                <HStack w={'600px'} justifyContent={'space-around'}>
                  <VStack w={'400px'} textAlign={'left'} alignItems={'flex-start'}>
                    <Text fontWeight={400} fontSize="md">
                      햄버거 샌드위치
                      <Text
                        ml={2}
                        display={'inline'}
                        fontWeight={400}
                        color={'gray.500'}
                        fontSize="md"
                      >
                        5,000원
                      </Text>
                    </Text>
                    <Text fontWeight={200} color={'gray.400'} fontSize="sm">
                      크리미하고 부드러운 에그마요에 아삭한 오이를 넣어 식감은 살리고 느끼함을
                      잡아준 에그마요 샌드위치
                    </Text>
                  </VStack>
                  <Image
                    objectFit="cover"
                    h={'90px'}
                    w={'120px'}
                    src={'https://source.unsplash.com/random/?dish'}
                  />
                </HStack>
                <HStack w={'600px'} justifyContent={'space-around'}>
                  <VStack w={'400px'} textAlign={'left'} alignItems={'flex-start'}>
                    <Text fontWeight={400} fontSize="md">
                      브로콜리 샌드위치
                      <Text
                        ml={2}
                        display={'inline'}
                        fontWeight={400}
                        color={'gray.500'}
                        fontSize="md"
                      >
                        5,000원
                      </Text>
                    </Text>
                    <Text fontWeight={200} color={'gray.400'} fontSize="sm">
                      크리미하고 부드러운 에그마요에 아삭한 오이를 넣어 식감은 살리고 느끼함을
                      잡아준 에그마요 샌드위치
                    </Text>
                  </VStack>
                  <Image
                    objectFit="cover"
                    h={'90px'}
                    w={'120px'}
                    src={'https://source.unsplash.com/random/?dish'}
                  />
                </HStack>
                <HStack w={'600px'} justifyContent={'space-around'}>
                  <VStack w={'400px'} textAlign={'left'} alignItems={'flex-start'}>
                    <Text fontWeight={400} fontSize="md">
                      계란 샌드위치
                      <Text
                        ml={2}
                        display={'inline'}
                        fontWeight={400}
                        color={'gray.500'}
                        fontSize="md"
                      >
                        5,000원
                      </Text>
                    </Text>
                    <Text fontWeight={200} color={'gray.400'} fontSize="sm">
                      크리미하고 부드러운 에그마요에 아삭한 오이를 넣어 식감은 살리고 느끼함을
                      잡아준 에그마요 샌드위치
                    </Text>
                  </VStack>
                  <Image
                    objectFit="cover"
                    h={'90px'}
                    w={'120px'}
                    src={'https://source.unsplash.com/random/?dish'}
                  />
                </HStack>
                <HStack w={'600px'} justifyContent={'space-around'}>
                  <VStack w={'400px'} textAlign={'left'} alignItems={'flex-start'}>
                    <Text fontWeight={400} fontSize="md">
                      계란 샌드위치
                      <Text
                        ml={2}
                        display={'inline'}
                        fontWeight={400}
                        color={'gray.500'}
                        fontSize="md"
                      >
                        5,000원
                      </Text>
                    </Text>
                    <Text fontWeight={200} color={'gray.400'} fontSize="sm">
                      크리미하고 부드러운 에그마요에 아삭한 오이를 넣어 식감은 살리고 느끼함을
                      잡아준 에그마요 샌드위치
                    </Text>
                  </VStack>
                  <Image
                    objectFit="cover"
                    h={'90px'}
                    w={'120px'}
                    src={'https://source.unsplash.com/random/?dish'}
                  />
                </HStack>
              </VStack>
            </VStack>
            <VStack w={'600px'} align={'flex-start'}>
              <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                주문정보
              </Text>
              <VStack alignSelf={'center'}>
                <HStack w={'550px'} justifyContent={'space-between'}>
                  <Flex align={'center'}>
                    <Text w={'150px'} mr={4}>
                      계란 샌드위치
                    </Text>
                    <NumberInput size="sm" maxW={14} defaultValue={1} min={1}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Flex>
                  <Flex align={'center'}>
                    <Text>5,000원</Text>
                    <Button bgColor={'transparent'}>X</Button>
                  </Flex>
                </HStack>
                <HStack w={'550px'} justifyContent={'space-between'}>
                  <Flex align={'center'}>
                    <Text w={'150px'} mr={4}>
                      브로콜리 샌드위치
                    </Text>
                    <NumberInput size="sm" maxW={14} defaultValue={1} min={1}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Flex>
                  <Flex align={'center'}>
                    <Text>5,000원</Text>
                    <Button bgColor={'transparent'}>X</Button>
                  </Flex>
                </HStack>
              </VStack>
            </VStack>
            <VStack gap={4} w={'600px'} align={'flex-start'}>
              <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                결제정보
              </Text>
              <VStack px={8} gap={4} alignSelf={'center'}>
                <HStack w={'550px'} justifyContent={'space-between'}>
                  <Text w={'100px'} fontWeight={600} color={'gray.600'} fontSize="md">
                    주문금액
                  </Text>
                  <Text fontWeight={600} color={'gray.600'} fontSize="md">
                    10,000 원
                  </Text>
                </HStack>
                <HStack w={'550px'} justifyContent={'space-between'}>
                  <Text w={'100px'} fontWeight={600} color={'gray.600'} fontSize="md">
                    포인트
                  </Text>
                  <HStack>
                    <Input textAlign={'right'} w={'50px'} variant="flushed" placeholder="2,000" />
                    <Text fontWeight={600} color={'gray.600'} fontSize="md">
                      원
                    </Text>
                  </HStack>
                </HStack>
                <HStack w={'550px'} justifyContent={'space-between'}>
                  <Text w={'100px'} fontWeight={600} color={'gray.600'} fontSize="md">
                    결제금액
                  </Text>
                  <Text fontWeight={600} color={'gray.600'} fontSize="md">
                    7,000 원
                  </Text>
                </HStack>
                <Button>결제하기</Button>
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </Box>
    </Stack>
  );
};

export default RerservationRestaurant;
