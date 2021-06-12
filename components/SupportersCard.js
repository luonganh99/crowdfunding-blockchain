import { Avatar } from '@chakra-ui/avatar';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Center, Flex, HStack, Spacer, Stack, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

export default function SupportersCard({ supporters }) {
    const [currentIndex, setCurrentIndex] = useState(5);

    const handlePrevClick = () => {
        if (currentIndex > 5) {
            setCurrentIndex((prev) => prev - 5);
        }
    };

    const handleNextClick = () => {
        if (currentIndex < supporters.length - 1) {
            setCurrentIndex((prev) => prev + 5);
        }
    };

    const renderSupporters = () => {
        return supporters?.map((supporter, index) => (
            <Flex key={index} direction="row" alignItems="center">
                <Avatar
                    src={
                        'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                    }
                    alt={'Avatar Alt'}
                />
                <Text ml={6} fontSize="md" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" w="60%">
                    {supporter.address}
                </Text>
                <Spacer />

                <Text fontWeight="bold" fontSize="lg">
                    $ {supporter.amount}
                </Text>
            </Flex>
        ));
    };

    return (
        <Center>
            <Box
                w="368px"
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <HStack alignItems="center" paddingBottom={4} borderBottom="1px white solid" fontSize="4xl" spacing={4}>
                    <BsPeopleFill />
                    <Text fontSize="lg" fontWeight="bold">
                        {supporters.length} Supporters
                    </Text>
                </HStack>

                <Stack spacing={6}>
                    <Text fontSize="lg" mt={4}>
                        Most Generous
                    </Text>
                    <Stack spacing={4}>{renderSupporters()}</Stack>
                    <HStack justifyContent="center" alignItems="center" fontSize="xl" spacing={4}>
                        <Box
                            _hover={{
                                cursor: 'pointer'
                            }}
                            onClick={handlePrevClick}>
                            <RiArrowLeftSLine />
                        </Box>
                        <Text fontSize="xs">
                            {currentIndex - 4} - {currentIndex} of {supporters.length} donations
                        </Text>
                        <Box
                            _hover={{
                                cursor: 'pointer'
                            }}
                            onClick={handleNextClick}>
                            <RiArrowRightSLine />
                        </Box>
                    </HStack>
                </Stack>
            </Box>
        </Center>
    );
}
