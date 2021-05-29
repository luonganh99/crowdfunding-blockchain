import { Button } from '@chakra-ui/button';
import { Box, Flex, Stack, Text } from '@chakra-ui/layout';
import { Progress } from '@chakra-ui/progress';
import { BiDonateHeart } from 'react-icons/bi';
import { FaFacebook } from 'react-icons/fa';

export default function CampaignInfo() {
    return (
        <Stack>
            <Button
                h={16}
                leftIcon={<BiDonateHeart fontSize="30px" />}
                colorScheme="teal"
                variant="solid"
                fontWeight="bold"
                fontSize="lg"
                background="#0fffc8"
                color="#1a202c">
                CONTRIBUTE NOW
            </Button>
            <Button h={14} colorScheme="facebook" leftIcon={<FaFacebook />} fontWeight="bold" fontSize="md">
                Spread the world
            </Button>
            <Box>
                <Text fontSize="2.6rem">1.000.000$</Text>
                <Text fontSize="0.9rem" color="#959595eb">
                    raised of{' '}
                    <Text as="span" color="#ffffffeb" fontSize="1rem" mx="3px">
                        2.000.000$
                    </Text>
                    goal
                </Text>
            </Box>
            <Progress hasStripe value={64} />
            <Flex justifyContent="space-between">
                <Text fontSize="md">
                    <Text as="span" fontSize="1.3rem" fontWeight="bold">
                        4500
                    </Text>{' '}
                    supporters
                </Text>
                <Text fontSize="md">
                    <Text as="span" fontSize="1.3rem" fontWeight="bold">
                        78
                    </Text>{' '}
                    days left
                </Text>
            </Flex>
        </Stack>
    );
}
