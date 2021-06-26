import { Box, Center, Heading, Text } from '@chakra-ui/layout';
import Slider from 'react-slick';
import Card from './Card';

export default function CardSlider({ campaigns }) {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <Box w="90%" mx="auto" my={4}>
            <Center flexDirection="column" lineHeight="220%">
                <Heading color="orange.400">Trending Campaigns</Heading>
                <Text color={'gray.500'}>View the fundraisers that are most active right now</Text>
            </Center>
            {campaigns.length !== 0 ? (
                <Slider {...settings}>
                    {campaigns.map((campaign, index) => (
                        <Card key={index} campaign={campaign} />
                    ))}
                </Slider>
            ) : (
                <Center>
                    <Text color={'gray.600'} fontSize="sm">
                        Currently there are no campaign right now or you have not installed meta mask yet. If that,
                        please install meta mask and come back later!
                    </Text>
                </Center>
            )}
        </Box>
    );
}
