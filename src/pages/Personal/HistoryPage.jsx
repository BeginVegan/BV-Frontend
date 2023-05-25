import { Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import PurchaseHistory from './historyTabs/PurchaseHistory';
import ReservationHistory from './historyTabs/ReservationHistory';
import ReviewHistory from './historyTabs/ReviewHistory';
import VisitHistory from './historyTabs/VisitHistory';

const HistoryPage = () => {
  return (
    <>
      <VStack w={'100%'} h={'100vh'} p={'3rem'}>
        <Tabs w={'100%'}>
          <TabList>
            <Tab
              _selected={{
                fontSize: '2xl',
                borderBottom: '2px',
                // borderColor: 'green',
                // borderTopRadius: '10%',
                // color: 'green',
                // bgColor: 'green.100',
              }}
            >
              예약관리
            </Tab>
            <Tab _selected={{ fontSize: '2xl', borderBottom: '2px' }}>방문관리</Tab>
            <Tab _selected={{ fontSize: '2xl', borderBottom: '2px' }}>결제관리</Tab>
            <Tab _selected={{ fontSize: '2xl', borderBottom: '2px' }}>리뷰관리</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ReservationHistory />
            </TabPanel>
            <TabPanel>
              <VisitHistory />
            </TabPanel>
            <TabPanel>
              <PurchaseHistory />
            </TabPanel>
            <TabPanel>
              <ReviewHistory />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </>
  );
};
export default HistoryPage;
