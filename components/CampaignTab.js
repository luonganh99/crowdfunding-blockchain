import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { AiFillInfoCircle, AiOutlineLike } from 'react-icons/ai';
import { RiTableFill } from 'react-icons/ri';

export default function CampaignTab({ description, requests }) {
    return (
        <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
                <Tab>
                    <AiFillInfoCircle /> <Text ml={2}>About</Text>
                </Tab>
                <Tab>
                    {' '}
                    <RiTableFill /> <Text ml={2}>List of Request</Text>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Text>{description}</Text>
                </TabPanel>
                <TabPanel>
                    <Table variant="striped" colorScheme="teal" size="sm">
                        <TableCaption>Found 3 requests</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Description</Th>
                                <Th>Amount</Th>
                                <Th>Recipient</Th>
                                <Th>Count</Th>
                                <Th>Approve</Th>
                                {/* <Th>Finalize</Th> */}
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>0</Td>
                                <Td>
                                    <div
                                        style={{
                                            width: '9rem',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                        Buy battery casings
                                    </div>
                                </Td>
                                <Td>2</Td>
                                <Td>
                                    <div
                                        style={{
                                            width: '16rem',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                        0x52Fbce6446D066c1324fD3cdC36BC8EA22CD8883
                                    </div>
                                </Td>
                                <Td>3/6</Td>
                                <Td>
                                    <Button size="sm" colorScheme="teal">
                                        <AiOutlineLike />
                                    </Button>
                                </Td>
                                {/* <Td>
                                    <Button size="sm" colorScheme="teal">
                                        <HiOutlinePencilAlt />
                                    </Button>
                                </Td> */}
                            </Tr>
                        </Tbody>
                    </Table>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
