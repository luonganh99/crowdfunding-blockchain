import web3 from './index';
import Campaign from '../build/contracts/Campaign.json';

export default function campaignWeb3(address) {
    console.log(web3);
    return new web3.eth.Contract(Campaign.abi, address);
}
