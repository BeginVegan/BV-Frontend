import React, { useCallback, useEffect, useState } from 'react';
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
  chakra,
  Link,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { useReservation } from '@/hooks/useReservation';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantService from '@/api/RestaurantService';
import { useMutation, useQuery } from 'react-query';
import { addMonths, format } from 'date-fns';
import TimePicker from '@/components/common/TimePicker';
import Loading from '@/components/common/Loading';
import { RiCalendarCheckLine } from 'react-icons/ri';
import Axios from '@/api/apiConfig';
import { useAtom } from 'jotai';
import { userAtom } from '@/utils/atoms/userAtom';
import Swal from 'sweetalert2';
import { ROUTES } from '@/routes/ROUTES';
import ReservationService from '@/api/ReservationService';
import { debounce } from 'lodash';
import { FiTrash, FiTrash2 } from 'react-icons/fi';

const CustomDatePicker = chakra(DatePicker);

const ReservationRestaurant = () => {
  const { restaurantno } = useParams();
  const { data, isLoading } = useQuery(
    'getRestaurantDetails',
    () => RestaurantService.getRestaurantDetails(restaurantno),
    {
      refetchOnWindowFocus: false,
    }
  );
  const { mutate: onAddReservation } = useReservation();
  const { mutate: onAddReservationWidhPayment } = useMutation(
    ReservationService.addReservationWidhPayment
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    trigger,
    watch,
    formState: { isSubmitting },
  } = useForm();

  const [reservationType, setReservationType] = useState('매장');
  const [totalPrice, setTotalPrice] = useState(0);
  const [memberData, setMemeberData] = useAtom(userAtom);
  const [reservationMenus, setReservationMenus] = useState(new Map());
  const [selectDate, setSelectDate] = useState(new Date());
  const [selectTime, setSelectTime] = useState(null);
  const [paymentName, setPaymentName] = useState(null);

  const navigator = useNavigate();
  const today = new Date();

  const getPoint = async () => {
    const res = await Axios.get(`/member/${memberData.email}`);
    if (res.data.memberPoint == memberData.point) return;
    setMemeberData({ ...memberData, point: res.data.memberPoint });
  };

  const watchedDiscount = watch('reservationDiscount'); // 입력 요소의 값을 감시

  useEffect(() => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center-center',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    let newPoint;
    console.log(watchedDiscount);

    if (watchedDiscount == undefined || watchedDiscount == 0) return;
    if (totalPrice == 0) {
      Toast.fire({
        icon: 'error',
        title: '음식을 최소 1개 선택해 주세요.',
      });
      setValue('reservationDiscount', 0);
      return;
    }

    if (watchedDiscount < 0) {
      newPoint = 0;
    } else if (watchedDiscount > totalPrice - 10000) {
      Toast.fire({
        icon: 'error',
        title: '최소 결제 금액은 만원입니다.',
      });
      newPoint = totalPrice - 10000;
    } else if (watchedDiscount > memberData.point) {
      // 보유 포인트보다 사용할 순 없다
      Toast.fire({
        icon: 'error',
        title: `사용가능한 최대 포인트는, ${memberData.point} 포인트 입니다.`,
      });
      newPoint = memberData.point;
    } else {
      newPoint = watchedDiscount;
    }

    console.log(newPoint);
    setValue('reservationDiscount', parseInt(newPoint, 10));
  }, [watchedDiscount]);

  useEffect(() => {
    if (memberData) getPoint();
  }, [memberData]);

  useEffect(() => {
    setValue('reservationDiscount', 0);
    if (reservationMenus.size === 0) {
      setTotalPrice(0);
      return;
    }

    let totalPrice = 0;
    reservationMenus.forEach((value, key) => {
      totalPrice += getMenuPrice(key) * +value;
    });

    setTotalPrice(totalPrice);

    const firstmenuName = data.restaurant.menuList.filter(
      menu => menu.menuNo === Array.from(reservationMenus.keys())[0]
    )[0].menuName;

    const pamentName =
      firstmenuName + (reservationMenus.size - 1 > 0 ? `외 ${reservationMenus.size - 1}` : '');

    setPaymentName(pamentName);
  }, [reservationMenus]);

  const addReservationMenu = menuNo => {
    if (reservationMenus.get(menuNo)) return;
    setReservationMenus(prev => new Map([...prev, [menuNo, 1]]));
  };

  const getMenuName = menuNo => {
    return data.restaurant.menuList.filter(menu => menu.menuNo === menuNo)[0].menuName;
  };

  const getMenuPrice = menuNo => {
    return data.restaurant.menuList.filter(menu => menu.menuNo === menuNo)[0].menuPrice;
  };

  const changeNum = debounce((menuNo, count) => {
    const newCount = count < 1 ? 1 : count > 100 ? 100 : count;
    setReservationMenus(prev => new Map(prev).set(menuNo, newCount));
  }, 0);

  const deleteReservationMenu = menuNo => {
    setReservationMenus(prev => {
      const newReservationMenus = new Map(prev);
      newReservationMenus.delete(menuNo);
      return newReservationMenus;
    });
  };

  const addReservation = data => {
    if (!selectTime) {
      Swal.fire({
        icon: 'warning',
        title: '시간을 선택해 주세요',
      });
      return;
    }

    if (reservationMenus.size === 0) {
      Swal.fire({
        icon: 'warning',
        title: '메뉴를 선택해 주세요',
      });
      return;
    }

    // 방문시간
    selectDate.setHours(selectTime, 0, 0);

    const openswal = () => {
      return `
        <div style='display: flex; flex-direction: column; align-items: center'>
          <div style='display: flex; flex-direction: column; align-items: flex-start; hight: 150px; gap: 8px'>
            <Text>식당이름: ${data.restaurantName}</Text>
            <Text>예약시간: ${format(selectDate, 'yyyy-MM-dd HH:mm:ss')}</Text>
            <Text>예약타입: ${data.reservationType}</Text>
            <Text>예약인원: ${data.reservationPeople}</Text>
            <Text>음식메뉴: ${paymentName}</Text>
            <Text>결제금액: ${(totalPrice - data.reservationDiscount).toLocaleString()}원</Text>
          </div>
        </div>
      `;
    };

    Swal.fire({
      icon: 'warning',
      title: '예약 하시겠습니까?',
      html: openswal(),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#F2BED1',
      confirmButtonText: '예약',
      cancelButtonText: '취소',
      reverseButtons: true, // 버튼 순서 거꾸로
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire('예약이 완료되었습니다.');

        // 메뉴 리스트
        const reservationMenuList = [];
        reservationMenus.forEach((value, key) =>
          reservationMenuList.push({
            menuNo: key,
            reservationMenuCount: value,
          })
        );

        onAddReservation({
          memberEmail: memberData.email,
          restaurantNo: restaurantno,
          reservationTime: format(today, 'yyyy-MM-dd HH:mm:ss'),
          reservationVisitTime: format(selectDate, 'yyyy-MM-dd HH:mm:ss'),
          reservationType: data.reservationType,
          reservationPeople: data.reservationPeople,
          reservationDiscount: data.reservationDiscount,
          reservationTotalPrice: totalPrice,
          reservationStatus: '예약',
          reservationMenuList: reservationMenuList,
        });

        navigator(`${ROUTES.RESTAURANT_RAW}${restaurantno}`);
      }
    });
  };

  const addReservationWithPayment = data => {
    if (!selectTime) {
      Swal.fire({
        icon: 'warning',
        title: '시간을 선택해 주세요',
      });
      return;
    }

    if (reservationMenus.size === 0) {
      Swal.fire({
        icon: 'warning',
        title: '메뉴를 선택해 주세요',
      });
      return;
    }

    // 방문시간
    selectDate.setHours(selectTime, 0, 0);

    const openswal = () => {
      return `
        <div style='display: flex; flex-direction: column; align-items: center'>
          <div style='display: flex; flex-direction: column; align-items: flex-start; hight: 150px; gap: 8px'>
            <Text>식당이름: ${data.restaurantName}</Text>
            <Text>예약시간: ${format(selectDate, 'yyyy-MM-dd HH:mm:ss')}</Text>
            <Text>예약타입: ${data.reservationType}</Text>
            <Text>예약인원: ${data.reservationPeople}</Text>
            <Text>음식메뉴: ${paymentName}</Text>
            <Text>결제금액: ${(totalPrice - data.reservationDiscount).toLocaleString()}원</Text>
          </div>
        </div>
      `;
    };

    Swal.fire({
      icon: 'warning',
      title: '결제 하시겠습니까?',
      html: openswal(),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#F2BED1',
      confirmButtonText: '결제',
      cancelButtonText: '취소',
      reverseButtons: true, // 버튼 순서 거꾸로
    }).then(result => {
      if (result.isConfirmed) {
        onClickPayment(res => {
          const { imp_uid, error_msg } = res;

          if (error_msg) {
            Swal.fire('결제 실패.');
          } else {
            Swal.fire('예약이 완료되었습니다.');
            // 메뉴 리스트
            const reservationMenuList = [];
            reservationMenus.forEach((value, key) =>
              reservationMenuList.push({
                menuNo: key,
                reservationMenuCount: value,
              })
            );

            onAddReservationWidhPayment({
              reservationInfo: {
                memberEmail: memberData.email,
                restaurantNo: restaurantno,
                reservationTime: format(today, 'yyyy-MM-dd HH:mm:ss'),
                reservationVisitTime: format(selectDate, 'yyyy-MM-dd HH:mm:ss'),
                reservationType: data.reservationType,
                reservationPeople: data.reservationPeople,
                reservationDiscount: data.reservationDiscount,
                reservationTotalPrice: totalPrice,
                reservationStatus: '예약',
                reservationMenuList: reservationMenuList,
              },
              impUid: imp_uid,
            });

            navigator(`${ROUTES.RESTAURANT_RAW}${restaurantno}`);
          }
        });
      }
    });
  };

  const onClickPayment = callback => {
    if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init('imp38604136'); // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'tosspayments.iamporttest_3', // tosspayments사 : https://portone.gitbook.io/docs/sdk/javascript-sdk/payrq#undefined-1 참고
      pay_method: 'card', // 결제수단
      merchant_uid: `restaurantNo_${new Date().getTime()}`, // 주문번호
      amount: totalPrice - getValues('reservationDiscount'), // 결제금액
      name: paymentName, // 주문명
      buyer_email: memberData.email, // 구매자 이메일
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  };

  if (isLoading) return <Loading />;

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
                  {data.restaurant.restaurantName}
                </Text>
                <Input
                  {...register('restaurantName')}
                  display={'none'}
                  value={data.restaurant.restaurantName}
                ></Input>
                <Text>{data.restaurant.restaurantDetail}</Text>
              </HStack>
            </VStack>
            <VStack align={'flex-start'}>
              <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                식사방식
              </Text>
              <RadioGroup onChange={setReservationType} value={reservationType}>
                <HStack>
                  <Radio value="매장" {...register('reservationType')}>
                    매장식사
                  </Radio>
                  {reservationType === '매장' && (
                    <>
                      <NumberInput
                        size="sm"
                        {...register('reservationPeople')}
                        maxW={'70px'}
                        defaultValue={1}
                        min={1}
                        max={20}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <Text>명</Text>
                    </>
                  )}
                  <Radio value="포장" {...register('reservationType')}>
                    포장
                  </Radio>
                </HStack>
              </RadioGroup>
            </VStack>
            <VStack align={'flex-start'}>
              <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                예약일시
              </Text>
              <VStack pl={2} gap={4} w={'600px'}>
                <HStack p={3} borderBottom={'1px solid gray'}>
                  <CustomDatePicker
                    w={'150px'}
                    fontSize={'lg'}
                    textAlign={'center'}
                    locale={ko}
                    selected={selectDate}
                    dateFormat="yyyy년 MM월 dd일"
                    minDate={today}
                    maxDate={addMonths(today, 1)}
                    onChange={date => setSelectDate(date)}
                  />
                  <RiCalendarCheckLine size={24} />
                </HStack>
                <TimePicker
                  selectDate={selectDate}
                  selectTime={selectTime}
                  setSelectTime={setSelectTime}
                  restaurantNo={data.restaurant.restaurantNo}
                  openTime={data.restaurant.restaurantOpen}
                  closeTime={data.restaurant.restaurantClose}
                />
              </VStack>
            </VStack>
            <VStack alignItems={'flex-start'} gap={2} w={'100%'}>
              <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                메뉴추가
              </Text>
              <VStack gap={3} py={2} h={'300px'} alignSelf={'center'} overflowY={'scroll'}>
                {data.restaurant.menuList.map(menu => (
                  <HStack
                    gap={4}
                    key={menu.menuNo}
                    cursor={'pointer'}
                    onClick={() => addReservationMenu(menu.menuNo)}
                  >
                    <Image
                      objectFit="cover"
                      minH={'90px'}
                      minW={'120px'}
                      maxH={'90px'}
                      maxW={'120px'}
                      src={menu.menuPhotoDir || 'http://placehold.it/120x90'}
                    />
                    <VStack w={'250px'} alignItems={'flex-start'}>
                      <Text fontWeight={400} fontSize="lg">
                        {menu.menuName}
                        <Text
                          ml={2}
                          display={'inline'}
                          fontWeight={400}
                          color={'gray.500'}
                          fontSize="lg"
                        >
                          {menu.menuPrice.toLocaleString()}원
                        </Text>
                      </Text>
                      <Text fontWeight={200} color={'gray.400'} fontSize="md">
                        {menu.menuDetail}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            </VStack>
            <VStack w={'600px'} align={'flex-start'}>
              <Text w={'100px'} fontWeight={600} color={'gray.400'} fontSize="md">
                주문정보
              </Text>
              <VStack alignSelf={'center'}>
                {Array.from(reservationMenus.entries()).map(([key, value]) => (
                  <HStack w={'550px'} key={key} justifyContent={'space-between'}>
                    <Flex align={'center'}>
                      <Text minW={'100px'} mr={4}>
                        {getMenuName(key)}
                      </Text>
                      <NumberInput
                        size="sm"
                        maxW={'80px'}
                        max={100}
                        onChange={e => changeNum(key, e)}
                        value={value}
                        onKeyUp={e => {
                          if (e.key === 'Enter') {
                            e.stopPropagation();
                            e.preventDefault();
                            changeNum(key, e.target.value);
                            e.target.blur();
                          }
                        }}
                      >
                        <NumberInputField maxLength={100} />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Flex>
                    <Flex align={'center'}>
                      <Text mr={4}>{(getMenuPrice(key) * value).toLocaleString()}원</Text>
                      <FiTrash2 cursor={'pointer'} onClick={() => deleteReservationMenu(key)} />
                    </Flex>
                  </HStack>
                ))}
                {reservationMenus.size === 0 && (
                  <Text fontWeight={600} color={'gray.400'} fontSize="md">
                    선택된 메뉴가 없습니다. 메뉴를 선택해 주세요.
                  </Text>
                )}
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
                  <Text pr={3} fontWeight={600} color={'gray.600'} fontSize="md">
                    {totalPrice.toLocaleString()} 원
                  </Text>
                </HStack>
                <HStack w={'550px'} justifyContent={'space-between'}>
                  <HStack>
                    <Text w={'50px'} fontWeight={600} color={'gray.600'} fontSize="md">
                      포인트
                    </Text>
                    <Text w={'200px'} fontWeight={600} color={'gray.400'} fontSize="md">
                      사용가능 포인트 : {memberData.point}
                    </Text>
                  </HStack>
                  <HStack>
                    <InputGroup w={'100px'}>
                      <Input
                        onKeyUp={e => {
                          if (e.key === 'Enter') {
                            e.stopPropagation();
                            e.preventDefault();
                            e.target.blur();
                          }
                        }}
                        type="number"
                        textAlign={'right'}
                        {...register('reservationDiscount', { valueAsNumber: true })}
                      />
                      <InputRightElement
                        fontWeight={600}
                        color={'gray.600'}
                        fontSize="md"
                        children="원"
                      />
                    </InputGroup>
                  </HStack>
                </HStack>
                <HStack w={'550px'} justifyContent={'space-between'}>
                  <Text w={'100px'} fontWeight={600} color={'gray.600'} fontSize="md">
                    결제금액
                  </Text>
                  <Text pr={3} fontWeight={600} color={'gray.600'} fontSize="md">
                    {getValues('reservationDiscount')
                      ? (totalPrice - getValues('reservationDiscount')).toLocaleString()
                      : totalPrice.toLocaleString()}{' '}
                    원
                  </Text>
                </HStack>
                <VStack gap={4}>
                  <Link onClick={handleSubmit(addReservation)} fontSize={'lg'} color={'gray.400'}>
                    현장에서 결제할래요.
                  </Link>
                  <Button
                    bgColor={'green.200'}
                    _hover={{ bgColor: 'green.400', color: 'white' }}
                    onClick={handleSubmit(addReservationWithPayment)}
                    disabled={isSubmitting}
                  >
                    결제하기
                  </Button>
                </VStack>
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </Box>
    </Stack>
  );
};

export default ReservationRestaurant;
