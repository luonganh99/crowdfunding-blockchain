import { Avatar, Box, Center, Flex, Heading, Progress, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { BiTime } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function Card({
    campaign = {
        name: 'Test',
        description:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt odit atque sunt ducimus quibusdam quidem sequi quae iusto sit suscipit?',
        manager: 'Achim Rolle'
    }
}) {
    const router = useRouter();

    return (
        <Center py={6} onClick={() => router.push('/campaigns/1')}>
            <Box
                maxW={'370px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>
                <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
                    {/* <Image
                        src={
                            'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                        }
                        layout={'fill'}
                    /> */}
                </Box>
                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                    <Avatar src={'https://avatars0.githubusercontent.com/u/1164541?v=4'} alt={'Author'} />
                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                        <Text fontWeight={600}>by {campaign.manager}</Text>
                        {/* <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text> */}
                    </Stack>
                </Stack>
                <Stack mt={6}>
                    {/* <Text
                        color={'green.500'}
                        textTransform={'uppercase'}
                        fontWeight={800}
                        fontSize={'sm'}
                        letterSpacing={1.1}>
                        Blog
                    </Text> */}
                    <Heading color={useColorModeValue('gray.700', 'white')} fontSize={'2xl'} fontFamily={'body'}>
                        {campaign.name}
                    </Heading>
                    <Text color={'gray.500'}>{campaign.description}</Text>
                </Stack>
                <Stack mt={6}>
                    <Text fontSize="lg">
                        <span>{campaign.balance}</span> raised out of {campaign.targetContribution}
                    </Text>
                    <Progress hasStripe value={64} />
                </Stack>

                <Flex justifyContent="space-between" mt={10}>
                    <Flex flex="row" justifyContent="center" alignItems="center">
                        <BiTime />
                        <Text ml={3}>
                            <span>{campaign.deadline}</span>
                            Days Left
                        </Text>
                    </Flex>

                    <Flex flex="row" justifyContent="center" alignItems="center">
                        <FaHeart />
                        <Text ml={3}>
                            <span>3500 </span> Supporters
                        </Text>
                    </Flex>
                </Flex>
            </Box>
        </Center>
    );
}
