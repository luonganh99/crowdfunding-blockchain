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
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';
import { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { AccountsContext } from '../context/AccountsContext';
import campaignFactoryWeb3 from '../web3/campaignFactoryWeb3';

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
        reset
    } = useForm();

    const handleCreateCampaign = async ({ name, description, min, target, deadline }) => {
        try {
            await campaignFactoryWeb3().methods.createCampaign(name, description, min, target, deadline).send({
                from: accounts[0]
            });

            toast({
                title: 'Create campaign successfully',
                status: 'success',
                isClosable: true
            });

            reset();
            onClose();

            router.push('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    {/* <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    /> */}
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>Logo</Box>
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
                                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>{accounts[0]}</MenuItem>
                                {/* <MenuItem>Link 2</MenuItem>
                                <MenuDivider />
                                <MenuItem>Link 3</MenuItem> */}
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
                {/* 
                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null} */}
            </Box>

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
                                    {...register('name', {
                                        required: 'This is required'
                                    })}
                                />
                                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl mt={4} isInvalid={errors.description}>
                                <FormLabel>Description</FormLabel>
                                <Input
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
                                        placeholder="Ex: $1"
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
                                        placeholder="Ex: $100"
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
                                <Input
                                    {...register('deadline', {
                                        required: 'This is required'
                                    })}
                                />
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
