import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { AiFillInfoCircle, AiOutlineLike } from 'react-icons/ai';
import { RiTableFill } from 'react-icons/ri';
import { HiOutlinePencilAlt } from 'react-icons/hi';

export default function CampaignTab({
    description,
    requests,
    contributersCount,
    isManager,
    onFinalizeRequest,
    onApproveRequest
}) {
    // const handleApproveRequest = (index) => {
    //     onApproveRequest
    // }

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
                        <TableCaption>Found {requests.length} requests</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Description</Th>
                                <Th>Amount</Th>
                                <Th>Recipient</Th>
                                <Th>Count</Th>
                                <Th>State</Th>
                                <Th>Approve</Th>
                                {/* <Th>Finalize</Th> */}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {requests.map((request, index) => (
                                <Tr key={index}>
                                    <Td>0</Td>
                                    <Td>
                                        <div
                                            style={{
                                                width: '9rem',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                            {request.description}
                                        </div>
                                    </Td>
                                    <Td>{request.amount}</Td>
                                    <Td>
                                        <div
                                            style={{
                                                width: '16rem',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                            {request.recipient}
                                        </div>
                                    </Td>
                                    <Td>
                                        {request.approvalsCount}/{contributersCount}
                                    </Td>
                                    {isManager ? (
                                        <Td>
                                            <Button
                                                size="sm"
                                                colorScheme="teal"
                                                onClick={() => onFinalizeRequest(index)}>
                                                <HiOutlinePencilAlt />
                                            </Button>
                                        </Td>
                                    ) : (
                                        <Td>
                                            <Button
                                                size="sm"
                                                colorScheme="teal"
                                                onClick={() => onApproveRequest(index)}>
                                                <AiOutlineLike />
                                            </Button>
                                        </Td>
                                    )}
                                    <Td>False</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
