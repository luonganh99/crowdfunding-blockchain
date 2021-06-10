import { Box, Container, Heading, HStack, Stack } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import CampaignerCard from '../../components/CampaignerCard';
import CampaignInfo from '../../components/CampaignInfo';
import CampaignTab from '../../components/CampaignTab';
import Layout from '../../components/Layout';
import SupportersCard from '../../components/SupportersCard';
import toCampaign from '../../utils/toCampaign';
import web3 from '../../web3';
import campaignWeb3 from '../../web3/campaignWeb3';

export default function Campaign({ address }) {
    const [campaign, setCampaign] = useState({});
    const [requests, setRequests] = useState([]);
    const [supporters, setSupporters] = useState([]);
    const [isManager, setIsManager] = useState(false);
    const [accounts, setAccounts] = useState([]);

    console.log(requests);
    console.log(isManager);
    useEffect(() => {
        const getCampaign = async () => {
            const camp = await campaignWeb3(address).methods.getSummary().call();
            console.log(camp);
            const updatedCampaign = toCampaign(camp, address);
            const updatedRequests = await Promise.all(
                Array(updatedCampaign.requests)
                    .fill()
                    .map((el, i) => {
                        return campaignWeb3(address).methods.requests(i).call();
                    })
            );
            const updatedAccounts = await web3.eth.getAccounts();
            console.log(updatedAccounts);
            const updatedIsManager = updatedAccounts[0] === updatedCampaign.manager;

            setAccounts(updatedAccounts);
            setRequests(updatedRequests);
            setIsManager(updatedIsManager);
            setCampaign(updatedCampaign);
        };

        getCampaign();
    }, []);

    const handleFinalizeRequest = async (index) => {
        const res = await campaignWeb3(address).methods.finalizeRequest(index).send({
            from: accounts[0]
        });
        console.log(res);
    };

    const handleApproveRequest = async (index) => {
        console.log(index);
        const res = await campaignWeb3(address).methods.approveRequest(index).send({
            from: accounts[0]
        });
        console.log(res);
    };

    console.log(campaign);
    return (
        <Layout>
            <Container maxW="container.xl" py={8}>
                <Stack spacing={8}>
                    <Heading textAlign="center">{campaign.name}</Heading>

                    <HStack spacing={6} alignItems="flex-start">
                        <Box flex={7}>
                            <CampaignTab
                                description={campaign.description}
                                contributersCount={campaign.approvers}
                                requests={requests}
                                isManager={isManager}
                                onFinalizeRequest={handleFinalizeRequest}
                                onApproveRequest={handleApproveRequest}
                            />
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
