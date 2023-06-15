import React from 'react';
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
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
} from '@chakra-ui/react';
import { ArrowRightIcon, ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { usePagination, useTable } from 'react-table';

const DataTable = ({ columns, data }) => {
  const {
    // tableProps
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    // pagination
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
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <VStack>
      <TableContainer h={'70vh'}>
        <Table variant="simple" {...getTableProps()}>
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th textAlign={'center'} {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <Td textAlign={'center'} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </Td>
                    );
                  })}
                  <Th textAlign={'center'}>
                    <Button mr={4}>수정</Button>
                    <Button color={'white'} bgColor={'red.300'} _hover={{ bgColor: 'red.400' }}>
                      삭제
                    </Button>
                  </Th>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={1}>
        <Flex gap={4}>
          <Flex>
            <Tooltip label="First Page">
              <IconButton
                onClick={() => gotoPage(0)}
                isDisabled={!canPreviousPage}
                icon={<ArrowLeftIcon h={3} w={3} />}
                mr={4}
              />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton
                onClick={previousPage}
                isDisabled={!canPreviousPage}
                icon={<ChevronLeftIcon h={6} w={6} />}
              />
            </Tooltip>
          </Flex>

          <Flex alignItems="center">
            <Text flexShrink="0" mr={8}>
              Page{' '}
              <Text fontWeight="bold" as="span">
                {pageIndex + 1}
              </Text>{' '}
              of{' '}
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
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex>
            <Tooltip label="Next Page">
              <IconButton
                onClick={nextPage}
                isDisabled={!canNextPage}
                icon={<ChevronRightIcon h={6} w={6} />}
              />
            </Tooltip>
            <Tooltip label="Last Page">
              <IconButton
                onClick={() => gotoPage(pageCount - 1)}
                isDisabled={!canNextPage}
                icon={<ArrowRightIcon h={3} w={3} />}
                ml={4}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </HStack>
    </VStack>
  );
};

export default DataTable;
