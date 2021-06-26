import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { AddIcon } from '@chakra-ui/icons';
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
import {
    Avatar,
    Box,
    Button,
    Flex,
    HStack,
    Input,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Textarea,
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';
import { useContext, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AccountsContext } from '../context/AccountsContext';
import campaignFactoryWeb3 from '../web3/campaignFactoryWeb3';

import ReactDatePicker from 'react-datepicker';
import dayjs from 'dayjs';

const Links = ['Home'];

const NavLink = ({ children }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700')
        }}
        href={'/'}>
        {children}
    </Link>
);

export default function Navbar() {
    const accounts = useContext(AccountsContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();
    const toast = useToast();
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
        control
    } = useForm();

    const handleCreateCampaign = async ({ name, description, min, target, deadline }) => {
        if (accounts.length === 0) {
            toast({
                title: 'Error',
                description: 'Please install meta mask extension first to do this action',
                status: 'error',
                isClosable: true
            });
        }
        try {
            await campaignFactoryWeb3()
                .methods.createCampaign(name, description, min, target, dayjs(deadline).valueOf())
                .send({
                    from: accounts[0]
                });

            toast({
                title: 'Create campaign successfully',
                status: 'success',
                isClosable: true
            });

            const campaignAddresses = await campaignFactoryWeb3().methods.getCampaigns().call();

            reset();
            onClose();

            router.push(`/campaigns/${campaignAddresses[campaignAddresses.length - 1]}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {/* Navbar */}
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack spacing={8} alignItems={'center'}>
                        <Box fontWeight="bold">CROWD FUNDING</Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Button
                            variant={'solid'}
                            colorScheme={'teal'}
                            size={'sm'}
                            mr={4}
                            leftIcon={<AddIcon />}
                            onClick={onOpen}>
                            New Campaign
                        </Button>
                        <Menu>
                            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'}>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
                                    }
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>{accounts[0]}</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Box>
            {/* MODAL */}
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit(handleCreateCampaign)}>
                        <ModalHeader>Create new campaign</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl isInvalid={errors.name}>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    ref={initialRef}
                                    placeholder="Enter your campaign name"
                                    {...register('name', {
                                        required: 'This is required'
                                    })}
                                />
                                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl mt={4} isInvalid={errors.description}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    placeholder="Enter your campaign description"
                                    {...register('description', {
                                        required: 'This is required'
                                    })}
                                />
                                <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl mt={4} isInvalid={errors.min}>
                                <FormLabel>Minimum Per Contribution</FormLabel>
                                <NumberInput min={0}>
                                    <NumberInputField
                                        placeholder="Ex: 1 Eth"
                                        {...register('min', {
                                            required: 'This is required'
                                        })}
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <FormErrorMessage>{errors.min && errors.min.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl mt={4} isInvalid={errors.target}>
                                <FormLabel>Target</FormLabel>
                                <NumberInput target={0}>
                                    <NumberInputField
                                        placeholder="Ex: 100 Eth"
                                        {...register('target', {
                                            required: 'This is required'
                                        })}
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <FormErrorMessage>{errors.target && errors.target.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl mt={4} isInvalid={errors.deadline}>
                                <FormLabel>Finished Date</FormLabel>
                                <div className="dark-theme">
                                    <Controller
                                        name="deadline"
                                        control={control}
                                        defaultValue={null}
                                        render={({ field }) => (
                                            <ReactDatePicker
                                                placeholderText="Enter your finished date"
                                                selected={field.value}
                                                onChange={field.onChange}
                                                className="react-datapicker__input-text"
                                            />
                                        )}
                                    />
                                </div>
                                <FormErrorMessage>{errors.deadline && errors.deadline.message}</FormErrorMessage>
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
