import { Box, Container, Heading, HStack, Stack } from '@chakra-ui/layout';
import CampaignerCard from '../../components/CampaignerCard';
import CampaignInfo from '../../components/CampaignInfo';
import CampaignTab from '../../components/CampaignTab';
import Layout from '../../components/Layout';
import SupportersCard from '../../components/SupportersCard';

export default function Campaign() {
    return (
        <Layout>
            <Container maxW="container.xl" py={8}>
                <Stack spacing={8}>
                    <Heading textAlign="center">Lorem ipsum dolor sit amet</Heading>

                    <HStack spacing={6} alignItems="flex-start">
                        <Box flex={7}>
                            <CampaignTab />
                        </Box>
                        <Stack spacing={8} flex={3}>
                            <CampaignInfo />
                            <CampaignerCard />
                            <SupportersCard />
                        </Stack>
                    </HStack>
                </Stack>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    return {
        props: {
            campaign: {}
        }
    };
}
