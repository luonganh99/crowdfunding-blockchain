import web3 from '../web3';

export default function toCampaign(campaign, address) {
    return {
        name: campaign[0],
        description: campaign[1],
        min: parseInt(campaign[2]),
        target: parseInt(campaign[3]),
        deadline: parseInt(campaign[4]),
        balance: parseInt(web3.utils.fromWei(campaign[5])),
        requests: parseInt(campaign[6]),
        approvers: parseInt(campaign[7]),
        manager: campaign[8],
        address
    };
}
