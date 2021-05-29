import { Box } from '@chakra-ui/layout';
import Slider from 'react-slick';
import Card from './Card';

export default function CardSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <Box w="90%" mx="auto" my={20}>
            <Slider {...settings}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </Slider>
        </Box>
    );
}
