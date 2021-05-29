import { Box, Container, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/table';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import CampaignerCard from '../../components/CampaignerCard';
import CampaignInfo from '../../components/CampaignInfo';
import Layout from '../../components/Layout';
import SupportersCard from '../../components/SupportersCard';

export default function Campaign() {
    return (
        <Layout>
            <Container maxW="container.xl" py={8}>
                <Stack spacing={8}>
                    <Heading textAlign="center">Lorem ipsum dolor sit amet</Heading>

                    <Flex flexDirection="row">
                        <Box flex={7}>
                            <Tabs isFitted variant="enclosed">
                                <TabList mb="1em">
                                    <Tab>About</Tab>
                                    <Tab>Requests</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <Text>
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia libero, aut
                                            suscipit ex iusto quo harum perspiciatis laudantium alias maxime.
                                        </Text>
                                    </TabPanel>
                                    <TabPanel>
                                        <Table variant="striped" colorScheme="teal">
                                            <TableCaption>Imperial to metric conversion factors</TableCaption>
                                            <Thead>
                                                <Tr>
                                                    <Th>To convert</Th>
                                                    <Th>into</Th>
                                                    <Th isNumeric>multiply by</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                <Tr>
                                                    <Td>inches</Td>
                                                    <Td>millimetres (mm)</Td>
                                                    <Td isNumeric>25.4</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>feet</Td>
                                                    <Td>centimetres (cm)</Td>
                                                    <Td isNumeric>30.48</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>yards</Td>
                                                    <Td>metres (m)</Td>
                                                    <Td isNumeric>0.91444</Td>
                                                </Tr>
                                            </Tbody>
                                            <Tfoot>
                                                <Tr>
                                                    <Th>To convert</Th>
                                                    <Th>into</Th>
                                                    <Th isNumeric>multiply by</Th>
                                                </Tr>
                                            </Tfoot>
                                        </Table>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                        <Stack spacing={8} flex={3}>
                            <CampaignInfo />
                            <CampaignerCard />
                            <SupportersCard />
                        </Stack>
                    </Flex>
                </Stack>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    return {
        props: {
            campaign: {}
        }
    };
}
