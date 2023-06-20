import React, { useEffect, useState } from 'react';
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
  Flex,
  Fade,
  CardBody,
  Card,
  Box,
} from '@chakra-ui/react';
import { ArrowRightIcon, ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { usePagination, useTable } from 'react-table';
import PointProvider from '@/pages/Admin/Member/PointProvider';
import PointIndividualProvider from '@/pages/Admin/Member/PointIndividualProvider';
import Withdrawal from '@/pages/Admin/Member/Withdrawal';
import ChangeRole from './ChangeRole';

const columns = [
  {
    Header: '계정',
    accessor: 'memberEmail',
  },
  {
    Header: '이름',
    accessor: 'memberName',
  },
  {
    Header: '포인트',
    accessor: 'memberPoint',
  },
  {
    Header: '권한',
    accessor: 'memberRole',
  },
];

const MemberInfo = ({ data, setIsChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    memberEmail: '',
    memberName: '',
    memberRole: '',
  });

  const handleRowClick = rowIndex => {
    const memberEmail = filteredData[rowIndex].memberEmail;
    if (memberEmail === expandedRowIndex) {
      setExpandedRowIndex(null);
    } else {
      setExpandedRowIndex(memberEmail);
    }
    setSelectedIndex(rowIndex);
  };

  const applyFilter = () => {
    const filtered = data.filter(item => {
      const { memberEmail, memberName, memberRole } = filterCriteria;

      const isMemberEmailMatch =
        !memberEmail || item.memberEmail.toLowerCase().includes(memberEmail.toLowerCase());
      const isMemberNameMatch =
        !memberName || item.memberName.toString().toLowerCase().includes(memberName.toLowerCase());
      const isMemberRoleMatch =
        !memberRole || item.memberRole.toLowerCase() === memberRole.toLowerCase();

      return isMemberEmailMatch && isMemberNameMatch && isMemberRoleMatch;
    });

    setFilteredData(filtered);
  };

  const clearFilter = () => {
    setFilterCriteria({
      memberEmail: '',
      memberName: '',
      memberRole: '',
    });
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
    <VStack gap={1}>
      {/* Point Provider Section */}
      <PointProvider setIsChange={setIsChange} />
      {/* Filter Section */}
      <Box
        mb={5}
        pr={6}
        pl={6}
        w={1288}
        h={20}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        border={'none'}
      >
        <Fade in={true} offsetY={-20}>
          <HStack mt={5} mb={5} w={1232}>
            <Input
              placeholder="멤버 계정"
              value={filterCriteria.memberEmail}
              onChange={e =>
                setFilterCriteria(prevState => ({ ...prevState, memberEmail: e.target.value }))
              }
            />
            <Input
              placeholder="멤버 이름"
              value={filterCriteria.memberName}
              onChange={e =>
                setFilterCriteria(prevState => ({ ...prevState, memberName: e.target.value }))
              }
            />
            <Select
              placeholder="권한"
              color={'gray.500'}
              value={filterCriteria.memberRole}
              onChange={e =>
                setFilterCriteria(prevState => ({ ...prevState, memberRole: e.target.value }))
              }
            >
              <option value="normal">회원</option>
              <option value="admin">관리자</option>
            </Select>

            <Button
              onClick={applyFilter}
              bg="#48BB78"
              color="white"
              _hover={{ bg: '#3F995E' }}
              mr={2}
              width={220}
            >
              적용
            </Button>
            <Button onClick={clearFilter} colorScheme="gray" width={220}>
              취소
            </Button>
          </HStack>
        </Fade>
      </Box>
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
                    const memberEmail = filteredData[rowIndex].memberEmail;
                    const isExpanded = memberEmail === expandedRowIndex;
                    const isSelected = selectedIndex === rowIndex;
                    const rowColor = isSelected ? 'gray.100' : isExpanded ? 'gray.100' : 'white';
                    const hoverColor = 'gray.100';

                    return (
                      <React.Fragment key={rowIndex}>
                        <Tr
                          onClick={() => handleRowClick(rowIndex)}
                          onMouseLeave={() => setSelectedIndex(null)}
                          {...row.getRowProps()}
                          _hover={{ backgroundColor: hoverColor }}
                          bg={rowColor}
                        >
                          {row.cells.map((cell, cellIndex) => (
                            <Td key={cellIndex} textAlign="center" {...cell.getCellProps()}>
                              {cell.render('Cell')}
                            </Td>
                          ))}
                        </Tr>
                        {isExpanded && (
                          <tr>
                            <Td bgColor={'gray.100'} colSpan={columns.length}>
                              <VStack>
                                <PointIndividualProvider
                                  setIsChange={setIsChange}
                                  memberData={filteredData.find(
                                    item => item.memberEmail === memberEmail
                                  )}
                                />
                              </VStack>
                              <HStack justifyContent={'center'}>
                                <ChangeRole
                                  setIsChange={setIsChange}
                                  memberData={filteredData.find(
                                    item => item.memberEmail === memberEmail
                                  )}
                                />
                                <Withdrawal
                                  setIsChange={setIsChange}
                                  memberData={filteredData.find(
                                    item => item.memberEmail === memberEmail
                                  )}
                                />
                              </HStack>
                            </Td>
                          </tr>
                        )}
                      </React.Fragment>
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
    </VStack>
  );
};

export default MemberInfo;
