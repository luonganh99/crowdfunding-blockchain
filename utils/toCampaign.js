export default function (campaign) {
    return {
        name: campaign[0],
        description: campaign[1],
        min: parseInt(campaign[2]),
        target: parseInt(campaign[3]),
        deadline: campaign[4],
        balance: parseInt(campaign[5]),
        requests: parseInt(campaign[6]),
        approvers: parseInt(campaign[7]),
        manager: campaign[8]
    };
}
