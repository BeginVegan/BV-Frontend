import { Flex, HStack, VStack } from '@chakra-ui/react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

const HistoryPage = () => {
  return (
    <>
      <Tabs>
        <Flex>
          <VStack width={'100%'}>
            <TabList>
              <HStack spacing={'2rem'}>
                <Tab>예약중</Tab>
                <Tab>방문기록</Tab>
                <Tab>결제내역</Tab>
                <Tab>리뷰</Tab>
              </HStack>
            </TabList>
            <TabPanel>예약중탭</TabPanel>
            <TabPanel>방문기록탭</TabPanel>
            <TabPanel>결제내역탭</TabPanel>
            <TabPanel>리뷰탭</TabPanel>
          </VStack>
        </Flex>
      </Tabs>
    </>
  );
};
export default HistoryPage;
