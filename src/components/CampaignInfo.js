import { Button } from '@chakra-ui/button';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, Stack, Text } from '@chakra-ui/layout';
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
import { Progress } from '@chakra-ui/progress';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { BiDonateHeart } from 'react-icons/bi';
import { FaFacebook } from 'react-icons/fa';

var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default function CampaignInfo({ campaign, onContribute }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset
    } = useForm();

    return (
        <Stack>
            <Button
                h={16}
                leftIcon={<BiDonateHeart fontSize="30px" />}
                variant="solid"
                fontWeight="bold"
                fontSize="lg"
                background="#0fffc8"
                color="#1a202c"
                onClick={onOpen}
                _hover={{ background: '#02fa71' }}>
                CONTRIBUTE NOW
            </Button>
            <Button h={14} colorScheme="facebook" leftIcon={<FaFacebook />} fontWeight="bold" fontSize="md">
                Spread the world
            </Button>
            <Box>
                <Text fontSize="2.6rem">{campaign.balance} ETH</Text>
                <Text fontSize="0.9rem" color="#959595eb">
                    raised of{' '}
                    <Text as="span" color="#ffffffeb" fontSize="1rem" mx="3px">
                        {campaign.target} Eth
                    </Text>
                    goal
                </Text>
            </Box>
            <Progress hasStripe value={parseInt((campaign.balance / campaign.target) * 100)} borderRadius={5} />
            <Flex justifyContent="space-between">
                <Text fontSize="md">
                    <Text as="span" fontSize="1.3rem" fontWeight="bold">
                        {campaign.approvers}
                    </Text>{' '}
                    supporters
                </Text>
                <Text fontSize="md">
                    <Text as="span" fontSize="1.3rem" fontWeight="bold">
                        {dayjs().to(campaign.deadline, true)}
                    </Text>{' '}
                    left
                </Text>
            </Flex>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <form
                    onSubmit={handleSubmit(async (values) => {
                        await onContribute(values);
                        reset();
                        onClose();
                    })}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Contribute</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl isInvalid={errors.amount}>
                                <FormLabel>Amount</FormLabel>
                                <NumberInput min={campaign.min}>
                                    <NumberInputField
                                        ref={initialRef}
                                        placeholder="Ex: 1 Eth"
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
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} isLoading={isSubmitting} type="submit">
                                Contribute
                            </Button>
                            <Button
                                onClick={() => {
                                    reset();
                                    onClose();
                                }}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </Stack>
    );
}
