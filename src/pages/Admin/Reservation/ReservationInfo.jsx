import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  VStack,
  HStack,
  Input,
  Select,
  Tooltip,
  IconButton,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Fade,
  CardBody,
  Card,
} from '@chakra-ui/react';
import { ArrowRightIcon, ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { usePagination, useTable } from 'react-table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReservationDetail from '@/pages/Admin/Reservation/ReservationDetail';
import ReservationAndCancleChart from '@/pages/Admin/Reservation/ReservationAndCancleChart';
import ReservationRankingChart from '@/pages/Admin/Reservation/ReservationRankingChart';

const columns = [
  {
    Header: '예약 번호',
    accessor: 'reservationNo',
  },
  {
    Header: '식당 번호',
    accessor: 'restaurantNo',
  },
  {
    Header: '예약자',
    accessor: 'memberEmail',
  },
  {
    Header: '예약 일시',
    accessor: 'reservationTime',
  },
  {
    Header: '방문 일시',
    accessor: 'reservationVisitTime',
  },
  {
    Header: '상태',
    accessor: 'reservationStatus',
  },
];

const ReservationInfo = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filteredData, setFilteredData] = useState(data);
  const [filterCriteria, setFilterCriteria] = useState({
    booker: '',
    storeNumber: '',
    status: '',
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleButtonClick = index => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedIndex(null);
  };

  const applyFilter = () => {
    const filtered = data.filter(item => {
      const { booker, storeNumber, status } = filterCriteria;

      const isBookerMatch =
        !booker || item.memberEmail.toLowerCase().includes(booker.toLowerCase());
      const isStoreNumberMatch =
        !storeNumber ||
        item.restaurantNo.toString().toLowerCase().includes(storeNumber.toLowerCase());
      const isStatusMatch =
        !status || item.reservationStatus.toLowerCase() === status.toLowerCase();

      // Check if reservation date falls within the selected range
      const isDateInRange =
        (!startDate || new Date(item.reservationTime) >= startDate) &&
        (!endDate || new Date(item.reservationTime) <= endDate);

      return isBookerMatch && isStoreNumberMatch && isStatusMatch && isDateInRange;
    });

    setFilteredData(filtered);
  };

  const clearFilter = () => {
    setFilterCriteria({
      booker: '',
      storeNumber: '',
      status: '',
    });
    setStartDate(null);
    setEndDate(null);
    setFilteredData(data);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredData, // Use filteredData instead of data
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <VStack>
      <Flex
        mb={5}
        pr={6}
        pl={6}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        border={'none'}
      >
        {/* Filter Section */}
        <HStack mt={5} mb={5} w={1232}>
          <Input
            placeholder="예약자 정보"
            value={filterCriteria.booker}
            onChange={e =>
              setFilterCriteria(prevState => ({ ...prevState, booker: e.target.value }))
            }
          />
          <Input
            placeholder="식당 번호"
            value={filterCriteria.storeNumber}
            onChange={e =>
              setFilterCriteria(prevState => ({ ...prevState, storeNumber: e.target.value }))
            }
          />
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="시작일"
            isClearable
            customInput={
              <Input
                placeholder="Start Date"
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.200"
                _hover={{ borderColor: 'gray.300' }}
                _focus={{ borderColor: 'white', boxShadow: 'outline' }}
                px={2}
                py={1}
              />
            }
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            placeholderText="종료일"
            isClearable
            customInput={
              <Input
                placeholder="End Date"
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.200"
                _hover={{ borderColor: 'gray.300' }}
                _focus={{ borderColor: 'white', boxShadow: 'outline' }}
                px={2}
                py={1}
              />
            }
          />
          <Select
            placeholder="예약 상태"
            value={filterCriteria.status}
            onChange={e =>
              setFilterCriteria(prevState => ({ ...prevState, status: e.target.value }))
            }
          >
            <option value="취소">취소</option>
            <option value="예약">예약</option>
          </Select>
          <Button
            onClick={applyFilter}
            bg="#48BB78"
            color="white"
            _hover={{ bg: '#3F995E' }}
            mr={2}
            w={'200px'}
          >
            적용
          </Button>
          <Button w={'200px'} onClick={clearFilter} colorScheme="gray">
            취소
          </Button>
        </HStack>
      </Flex>

      <HStack pb={10}>
        <HStack pr={5}>
          <ReservationAndCancleChart data={filteredData} />
        </HStack>
        <VStack pl={5}>
          <ReservationRankingChart dataList={filteredData} />
        </VStack>
      </HStack>

      {/* Table */}
      <Card shadow={'none'}>
        <CardBody>
          <Fade in={true} offsetY={-20}>
            <TableContainer w={1240}>
              <Table variant="simple" {...getTableProps()}>
                <Thead>
                  {headerGroups.map(headerGroup => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <Th textAlign="center" {...column.getHeaderProps()}>
                          {column.render('Header')}
                        </Th>
                      ))}
                    </Tr>
                  ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                  {page.map((row, rowIndex) => {
                    prepareRow(row);
                    const index = pageIndex * pageSize + rowIndex;

                    return (
                      <Tr {...row.getRowProps()}>
                        {row.cells.map((cell, cellIndex) => (
                          <Td key={cellIndex} textAlign="center" {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </Td>
                        ))}
                        <Td textAlign="center">
                          <Button mr={4} onClick={() => handleButtonClick(index)}>
                            상세 보기
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <HStack mt={5} pt={6}>
              <Flex w={'100%'} alignItems={'center'} justifyContent={'center'} gap={4}>
                <Flex>
                  <Tooltip label="첫 페이지">
                    <IconButton
                      onClick={() => gotoPage(0)}
                      isDisabled={!canPreviousPage}
                      icon={<ArrowLeftIcon h={3} w={3} />}
                      mr={4}
                      sx={{
                        backgroundColor: 'black',
                        color: 'white',
                      }}
                    />
                  </Tooltip>
                  <Tooltip label="이전 페이지">
                    <IconButton
                      onClick={previousPage}
                      isDisabled={!canPreviousPage}
                      icon={<ChevronLeftIcon h={6} w={6} />}
                      sx={{
                        backgroundColor: 'darkgray',
                        color: 'white',
                      }}
                    />
                  </Tooltip>
                </Flex>
                <Flex alignItems="center">
                  <Text flexShrink="0" mr={8}>
                    페이지{' '}
                    <Text fontWeight="bold" as="span">
                      {pageIndex + 1}
                    </Text>{' '}
                    /{' '}
                    <Text fontWeight="bold" as="span">
                      {pageOptions.length}
                    </Text>
                  </Text>
                  <Select
                    w={32}
                    value={pageSize}
                    onChange={e => {
                      setPageSize(Number(e.target.value));
                    }}
                  >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}개
                      </option>
                    ))}
                  </Select>
                </Flex>

                <Flex>
                  <Tooltip label="다음 페이지">
                    <IconButton
                      onClick={nextPage}
                      isDisabled={!canNextPage}
                      icon={<ChevronRightIcon h={6} w={6} />}
                      sx={{
                        backgroundColor: 'darkgray',
                        color: 'white',
                      }}
                    />
                  </Tooltip>
                  <Tooltip label="마지막 페이지">
                    <IconButton
                      onClick={() => gotoPage(pageCount - 1)}
                      isDisabled={!canNextPage}
                      icon={<ArrowRightIcon h={3} w={3} />}
                      sx={{
                        backgroundColor: 'black',
                        color: 'white',
                      }}
                      ml={4}
                    />
                  </Tooltip>
                </Flex>
              </Flex>
            </HStack>
          </Fade>
        </CardBody>
      </Card>

      {/* Modal */}
      <Fade in={isOpen} offsetY={-20}>
        <Modal isOpen={isOpen} onClose={closeModal} size="4xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader pt={10} pl={10} style={{ fontSize: '25px', fontWeight: 'bold' }}>
              예약 상세
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ModalBody>
                <ReservationDetail
                  reservationData={filteredData[selectedIndex] || data[selectedIndex]}
                />
              </ModalBody>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Fade>
    </VStack>
  );
};

export default ReservationInfo;
