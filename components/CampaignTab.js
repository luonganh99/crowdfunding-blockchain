import { Button } from '@chakra-ui/button';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
import { AddIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Stack, Text } from '@chakra-ui/layout';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/modal';
import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from '@chakra-ui/number-input';
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillInfoCircle, AiOutlineLike } from 'react-icons/ai';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { RiTableFill } from 'react-icons/ri';

export default function CampaignTab({
    description,
    requests,
    contributersCount,
    isManager,
    onFinalizeRequest,
    onApproveRequest,
    onCreateRequest
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset
    } = useForm();

    return (
        <>
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
                        <Stack spacing="20px">
                            {isManager && (
                                <Button
                                    ml="auto"
                                    leftIcon={<AddIcon />}
                                    colorScheme="teal"
                                    variant="solid"
                                    onClick={onOpen}>
                                    New Request
                                </Button>
                            )}
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
                                        {isManager ? <Th>Finalize</Th> : <Th>Approve</Th>}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {requests.map((request, index) => (
                                        <Tr key={index}>
                                            <Td>{index}</Td>
                                            <Td>
                                                <div
                                                    style={{
                                                        width: '8rem',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}>
                                                    {request.description}
                                                </div>
                                            </Td>
                                            <Td>${request.amount}</Td>
                                            <Td>
                                                <div
                                                    style={{
                                                        width: '15rem',
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
                                            <Td>{request.isCompleted ? 'Finalized' : 'Pending'}</Td>
                                            {isManager ? (
                                                <Td>
                                                    {!request.isCompleted && (
                                                        <Button
                                                            size="sm"
                                                            colorScheme="teal"
                                                            onClick={() => onFinalizeRequest(index)}>
                                                            <HiOutlinePencilAlt />
                                                        </Button>
                                                    )}
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
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Stack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <form
                        onSubmit={handleSubmit(async (values) => {
                            await onCreateRequest(values);
                            reset();
                            onClose();
                        })}>
                        <ModalHeader>Create new request</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl isInvalid={errors.description}>
                                <FormLabel>Description</FormLabel>
                                <Input
                                    ref={initialRef}
                                    placeholder="Ex: Buy something ..."
                                    {...register('description', {
                                        required: 'This is required'
                                    })}
                                />
                                <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl mt={4} isInvalid={errors.amount}>
                                <FormLabel>Amount</FormLabel>
                                <NumberInput min={0}>
                                    <NumberInputField
                                        placeholder="Ex: $1"
                                        {...register('amount', {
                                            required: 'This is required'
                                        })}
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <FormErrorMessage>{errors.amount && errors.amount.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl mt={4} isInvalid={errors.recipient}>
                                <FormLabel>Recipient</FormLabel>
                                <Input
                                    placeholder="Ex: Oxabc..."
                                    {...register('recipient', {
                                        required: 'This is required'
                                    })}
                                />
                                <FormErrorMessage>{errors.recipient && errors.recipient.message}</FormErrorMessage>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} isLoading={isSubmitting} type="submit">
                                Create
                            </Button>
                            <Button
                                onClick={() => {
                                    reset();
                                    onClose();
                                }}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}
