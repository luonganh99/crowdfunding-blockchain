import { Box, Container, Heading, HStack, Stack } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import CampaignerCard from '../../components/CampaignerCard';
import CampaignInfo from '../../components/CampaignInfo';
import CampaignTab from '../../components/CampaignTab';
import Layout from '../../components/Layout';
import SupportersCard from '../../components/SupportersCard';
import toCampaign from '../../utils/toCampaign';
import campaignWeb3 from '../../web3/campaignWeb3';

export default function Campaign({ address }) {
    const [campaign, setCampaign] = useState({});
    const [requests, setRequests] = useState([]);
    const [supporters, setSupporters] = useState([]);

    useEffect(() => {
        const getCampaign = async () => {
            const camp = await campaignWeb3(address).methods.getSummary().call();
            setCampaign(toCampaign(camp, address));
        };

        getCampaign();
    }, []);

    console.log(campaign);
    return (
        <Layout>
            <Container maxW="container.xl" py={8}>
                <Stack spacing={8}>
                    <Heading textAlign="center">{campaign.name}</Heading>

                    <HStack spacing={6} alignItems="flex-start">
                        <Box flex={7}>
                            <CampaignTab description={campaign.description} requests={requests} />
                        </Box>
                        <Stack spacing={8} flex={3}>
                            <CampaignInfo campaign={campaign} />
                            <CampaignerCard campaigner={campaign.manager} />
                            <SupportersCard supporters={supporters} />
                        </Stack>
                    </HStack>
                </Stack>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    // const address = params.id;
    // const campaign = await campaignWeb3(address).methods.getSummary().call();
    // console.log(campaign);
    // return {
    //     props: {
    //         campaign: toCampaign(campaign, address)
    //     }
    // };

    return {
        props: {
            address: params.id
        }
    };
}
