import web3 from '../web3';

export default function toRequest({ amount, approvalsCount, description, isCompleted, recipient }, isApproved) {
    return {
        amount: web3.utils.fromWei(amount),
        approvalsCount,
        description,
        isCompleted,
        recipient,
        isApproved
    };
}
