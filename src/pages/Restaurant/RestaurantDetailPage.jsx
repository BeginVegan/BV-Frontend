import React, { useState } from 'react';
import VeganLevel from '@/components/store/VeganLevel';
import { StarIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { RiHeart3Line } from 'react-icons/ri';

const RestaurantDetailPage = () => {
  const [veganLevel, setVeganLevel] = useState(0);

  return (
    <Stack maxW={'100vw'} justifyContent={'center'} alignItems={'center'} pb={4}>
      <Box>
        <Flex
          py={6}
          backgroundSize={'cover'}
          justify={'center'}
          align={'center'}
          backgroundPosition={'center center'}
          gap={4}
        >
          <Image
            objectFit="cover"
            h={'240px'}
            w={'320px'}
            src={'https://source.unsplash.com/random/?dish'}
          />
          <Image
            objectFit="cover"
            h={'240px'}
            w={'320px'}
            src={'https://source.unsplash.com/random/?dish'}
          />
        </Flex>
        <VStack align={'flex-start'} divider={<StackDivider borderColor={'gray.200'} />}>
          <HStack py={4} w={'full'} justifyContent={'space-between'}>
            <Box display={'flex'} alignItems={'center'}>
              <Heading
                display={'inline-block'}
                cursor={'pointer'}
                pr={4}
                fontWeight={400}
                fontSize={'2xl'}
              >
                경성초밥
              </Heading>
              <StarIcon boxSize={5} color={'yellow.500'} />
              <Text
                display={'inline-block'}
                fontWeight={400}
                color={'gray.500'}
                fontSize="xl"
                ml={2}
              >
                4.4
              </Text>
            </Box>
            <Box display={'flex'} alignItems={'center'} gap={4}>
              <Button color={'white'} bgColor={'red.200'} _hover={{ bgColor: 'red.400' }}>
                주문하기
              </Button>
              <RiHeart3Line size={30} fill="red" />
            </Box>
          </HStack>
          <VStack alignItems={'left'} gap={2} py={4}>
            <HStack gap={4}>
              <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                주소
              </Text>
              <Text>주소</Text>
            </HStack>
            <HStack gap={4}>
              <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                전화번호
              </Text>
              <Text>전화번호</Text>
            </HStack>
            <HStack gap={4}>
              <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                가격대
              </Text>
              <Text>가격대</Text>
            </HStack>
            <HStack gap={4}>
              <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                비건 레벨
              </Text>
              <VeganLevel veganLevel={veganLevel} setVeganLevel={setVeganLevel} />
            </HStack>
          </VStack>
          <VStack gap={2} py={4} alignItems={'flex-start'}>
            <Text fontWeight={600} color={'gray.400'} fontSize="md">
              메뉴
            </Text>
            <HStack w={'600px'} justifyContent={'space-around'}>
              <VStack w={'400px'} textAlign={'left'} alignItems={'flex-start'}>
                <Text fontWeight={400} fontSize="md">
                  계란 샌드위치
                  <Text ml={2} display={'inline'} fontWeight={400} color={'gray.500'} fontSize="md">
                    5,000원
                  </Text>
                </Text>
                <Text fontWeight={200} color={'gray.400'} fontSize="sm">
                  크리미하고 부드러운 에그마요에 아삭한 오이를 넣어 식감은 살리고 느끼함을 잡아준
                  에그마요 샌드위치
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
                  <Text ml={2} display={'inline'} fontWeight={400} color={'gray.500'} fontSize="md">
                    5,000원
                  </Text>
                </Text>
                <Text fontWeight={200} color={'gray.400'} fontSize="sm">
                  크리미하고 부드러운 에그마요에 아삭한 오이를 넣어 식감은 살리고 느끼함을 잡아준
                  에그마요 샌드위치
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
                  <Text ml={2} display={'inline'} fontWeight={400} color={'gray.500'} fontSize="md">
                    5,000원
                  </Text>
                </Text>
                <Text fontWeight={200} color={'gray.400'} fontSize="sm">
                  크리미하고 부드러운 에그마요에 아삭한 오이를 넣어 식감은 살리고 느끼함을 잡아준
                  에그마요 샌드위치
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
          <Box>
            <Text pt={4} pb={2} fontWeight={600} color={'gray.400'} fontSize="md">
              리뷰 10
            </Text>
            <VStack
              gap={4}
              py={4}
              alignItems={'flex-start'}
              divider={<StackDivider borderColor={'gray.200'} />}
            >
              <HStack w={'600px'} gap={4} alignItems={'flex-start'} justifyContent={'space-around'}>
                <VStack>
                  <Image
                    objectFit="cover"
                    h={'90px'}
                    w={'120px'}
                    src={'https://source.unsplash.com/random/?dish'}
                  />
                  <Text fontWeight={400} fontSize="md">
                    솜솜
                  </Text>
                  <Text fontWeight={200} color={'gray.400'} fontSize="sm">
                    2023-03-19
                  </Text>
                </VStack>
                <VStack w={'400px'} alignItems={'flex-start'}>
                  <Text fontWeight={200} color={'yellow.400'} fontSize="sm">
                    ★★★★☆
                  </Text>
                  <Text fontWeight={200} color={'gray.400'} fontSize="sm">
                    작고 것은 것이다.보라, 있을 천고에 없으면 그들은 안고, 뿐이다. 커다란 인류의
                    전인 꾸며 우리는 뿐이다. 지혜는 풀밭에 설산에서 온갖 있는 때에, 창공에 품에
                    아니다. 방황하였으며, 예가 부패를 같이, 것이다. 품었기 구하기 오직 충분히
                    풍부하게 미묘한 석가는 보는 보라. 그들은 꽃이 청춘의 가는 할지니, 때까지 못하다
                    청춘을 뿐이다. 이상을 무엇을 착목한는 이성은 목숨이 그들은 인간이 맺어,
                    쓸쓸하랴? 끓는 것은 하였으며, 끓는다. 인도하겠다는 위하여,
                  </Text>
                  <HStack gap={1}>
                    <Image
                      objectFit="cover"
                      h={'90px'}
                      w={'120px'}
                      src={'https://source.unsplash.com/random/?dish'}
                    />
                    <Image
                      objectFit="cover"
                      h={'90px'}
                      w={'120px'}
                      src={'https://source.unsplash.com/random/?dish'}
                    />
                    <Image
                      objectFit="cover"
                      h={'90px'}
                      w={'120px'}
                      src={'https://source.unsplash.com/random/?dish'}
                    />
                    <Flex
                      h={'90px'}
                      w={'120px'}
                      backgroundSize={'cover'}
                      backgroundPosition={'center center'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.45)), url(https://source.unsplash.com/random/?dish)`,
                      }}
                    >
                      <Text fontWeight={600} color={'white'} fontSize="lg">
                        + 4
                      </Text>
                    </Flex>
                  </HStack>
                </VStack>
              </HStack>
              <HStack w={'600px'} gap={4} alignItems={'flex-start'} justifyContent={'space-around'}>
                <VStack>
                  <Image
                    objectFit="cover"
                    h={'90px'}
                    w={'120px'}
                    src={'https://source.unsplash.com/random/?dish'}
                  />
                  <Text fontWeight={400} fontSize="md">
                    솜솜
                  </Text>
                  <Text fontWeight={200} color={'gray.400'} fontSize="sm">
                    2023-03-19
                  </Text>
                </VStack>
                <VStack w={'400px'} alignItems={'flex-start'}>
                  <Text fontWeight={200} color={'yellow.400'} fontSize="sm">
                    ★★★★☆
                  </Text>
                  <Text fontWeight={200} color={'gray.400'} fontSize="sm">
                    작고 것은 것이다.보라, 있을 천고에 없으면 그들은 안고, 뿐이다. 커다란 인류의
                    전인 꾸며 우리는 뿐이다. 지혜는 풀밭에 설산에서 온갖 있는 때에, 창공에 품에
                    아니다. 방황하였으며, 예가 부패를 같이, 것이다. 품었기 구하기 오직 충분히
                    풍부하게 미묘한 석가는 보는 보라. 그들은 꽃이 청춘의 가는 할지니, 때까지 못하다
                    청춘을 뿐이다. 이상을 무엇을 착목한는 이성은 목숨이 그들은 인간이 맺어,
                    쓸쓸하랴? 끓는 것은 하였으며, 끓는다. 인도하겠다는 위하여,
                  </Text>
                  <HStack gap={1}>
                    <Image
                      objectFit="cover"
                      h={'90px'}
                      w={'120px'}
                      src={'https://source.unsplash.com/random/?dish'}
                    />
                    <Image
                      objectFit="cover"
                      h={'90px'}
                      w={'120px'}
                      src={'https://source.unsplash.com/random/?dish'}
                    />
                    <Image
                      objectFit="cover"
                      h={'90px'}
                      w={'120px'}
                      src={'https://source.unsplash.com/random/?dish'}
                    />
                    <Flex
                      h={'90px'}
                      w={'120px'}
                      backgroundSize={'cover'}
                      backgroundPosition={'center center'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.45)), url(https://source.unsplash.com/random/?dish)`,
                      }}
                    >
                      <Text fontWeight={600} color={'white'} fontSize="lg">
                        + 4
                      </Text>
                    </Flex>
                  </HStack>
                </VStack>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Stack>
  );
};

export default RestaurantDetailPage;
