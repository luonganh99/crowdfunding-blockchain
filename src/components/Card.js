import { Avatar, Box, Center, Flex, Heading, Progress, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BiTime } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import dayjs from 'dayjs';
import Image from 'next/image';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default function Card({ campaign }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/campaigns/${campaign.address}`);
    };

    return (
        <Center py={6} _hover={{ cursor: 'grab' }}>
            <Box
                maxW={'370px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}
                transition="all 0.2s"
                _hover={{
                    cursor: 'pointer',
                    transform: 'scale(1.03)',
                    rounded: 'md',
                    boxShadow: '3xl'
                }}
                onClick={handleClick}>
                <Box h={'210px'} mt={-6} mx={-6} mb={6} pos={'relative'}>
                    <Image
                        src={
                            'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                        }
                        layout={'fill'}
                    />
                </Box>
                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                    <Avatar
                        src={
                            'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/scientist_einstein_avatar_professor-512.png'
                        }
                        alt={'Author'}
                    />
                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                        <Text
                            fontWeight={600}
                            color={'gray.500'}
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            width="76%">
                            by {campaign.manager}
                        </Text>
                    </Stack>
                </Stack>
                <Stack mt={6}>
                    <Heading
                        color="orange.600"
                        fontSize="2xl"
                        fontFamily="body"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis">
                        {campaign.name}
                    </Heading>
                    <Text
                        overflow="hidden"
                        textOverflow="ellipsis"
                        display="-webkit-box"
                        css={{
                            WebkitLineClamp: '3',
                            WebkitBoxOrient: 'vertical'
                        }}
                        fontSize="sm">
                        {campaign.description}
                    </Text>
                </Stack>
                <Stack mt={6}>
                    <Text fontSize="md">
                        <Text as="span" fontWeight="bold">
                            {campaign.balance}
                        </Text>{' '}
                        raised out of{' '}
                        <Text as="span" fontWeight="bold">
                            {campaign.target}
                        </Text>
                    </Text>
                    <Progress borderRadius={5} hasStripe value={parseInt((campaign.balance / campaign.target) * 100)} />
                </Stack>

                <Flex justifyContent="space-between" mt={10} color={'gray.500'}>
                    <Flex flex="row" justifyContent="center" alignItems="center">
                        <BiTime />
                        <Text ml={3} fontSize="0.9rem">
                            <span> {dayjs().to(campaign.deadline, true)} left</span>
                        </Text>
                    </Flex>

                    <Flex flex="row" justifyContent="center" alignItems="center">
                        <FaHeart />
                        <Text ml={3} fontSize="0.9rem">
                            <span>{campaign.approvers} </span> Supporters
                        </Text>
                    </Flex>
                </Flex>
            </Box>
        </Center>
    );
}
