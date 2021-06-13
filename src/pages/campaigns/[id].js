import { Box, Container, Heading, HStack, Stack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { useContext, useEffect, useState } from 'react';
import CampaignerCard from '../../components/CampaignerCard';
import CampaignInfo from '../../components/CampaignInfo';
import CampaignTab from '../../components/CampaignTab';
import Layout from '../../components/Layout';
import SupportersCard from '../../components/SupportersCard';
import { AccountsContext } from '../../context/AccountsContext';
import toCampaign from '../../utils/toCampaign';
import toRequest from '../../utils/toRequest';
import toSupporter from '../../utils/toSupporter';
import web3 from '../../web3';
import campaignWeb3 from '../../web3/campaignWeb3';

export default function Campaign({ address }) {
    const [campaign, setCampaign] = useState({});
    const [requests, setRequests] = useState([]);
    const [supporters, setSupporters] = useState([]);
    const [isManager, setIsManager] = useState(false);
    const [isRendering, setIsRendering] = useState(false);
    const accounts = useContext(AccountsContext);
    const toast = useToast();

    console.log(campaign);
    console.log(requests);
    console.log('managerrrrrrrrrr ', isManager);
    console.log('accountssss ', accounts);
    useEffect(() => {
        const getCampaign = async () => {
            const camp = await campaignWeb3(address).methods.getSummary().call();
            const updatedCampaign = toCampaign(camp, address);
            if (updatedCampaign.approvers > 0) {
                const supporterAddresses = await campaignWeb3(address).methods.getApproverAddresses().call();
                console.log(supporterAddresses);
                const updatedSupporters = await Promise.all(
                    supporterAddresses.map(async (add) => {
                        console.log(add);
                        const sup = await campaignWeb3(address).methods.approvers(add).call();
                        return toSupporter(sup, add);
                    })
                );
                setSupporters(updatedSupporters);
            }

            const updatedRequests = await Promise.all(
                Array(updatedCampaign.requests)
                    .fill()
                    .map(async (el, i) => {
                        const req = await campaignWeb3(address).methods.requests(i).call();
                        console.log(i);
                        const isApproved = await campaignWeb3(address).methods.getIsApprovedRequest(i).call();
                        return toRequest(req, isApproved);
                    })
            );
            const updatedIsManager = accounts[0] === updatedCampaign.manager;

            setRequests(updatedRequests);
            setIsManager(updatedIsManager);
            setCampaign(updatedCampaign);
            setIsRendering(false);
        };

        getCampaign();
    }, [accounts, isRendering, address]);

    const handleContribute = async ({ amount }) => {
        try {
            await campaignWeb3(address)
                .methods.contribution()
                .send({
                    from: accounts[0],
                    value: web3.utils.toWei(amount, 'ether')
                });
            toast({
                title: 'Contribute successfully',
                status: 'success',
                isClosable: true
            });
            setIsRendering(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCreateRequest = async ({ description, amount, recipient }) => {
        try {
            await campaignWeb3(address)
                .methods.createRequest(web3.utils.toWei(amount, 'ether'), description, recipient)
                .send({
                    from: accounts[0]
                });
            toast({
                title: 'Create new request successfully',
                status: 'success',
                isClosable: true
            });
            setIsRendering(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleFinalizeRequest = async (index) => {
        try {
            await campaignWeb3(address).methods.finalizeRequest(index).send({
                from: accounts[0]
            });
            toast({
                title: 'Finalize request successfully',
                status: 'success',
                isClosable: true
            });
            setIsRendering(true);
        } catch (err) {
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                isClosable: true
            });
        }
    };

    const handleApproveRequest = async (index) => {
        try {
            await campaignWeb3(address).methods.approveRequest(index).send({
                from: accounts[0]
            });
            toast({
                title: 'Approve request successfully',
                status: 'success',
                isClosable: true
            });
            setIsRendering(true);
        } catch (err) {
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                isClosable: true
            });
        }
    };

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
                                onCreateRequest={handleCreateRequest}
                            />
                        </Box>
                        <Stack spacing={8} flex={3}>
                            <CampaignInfo campaign={campaign} onContribute={handleContribute} />
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
