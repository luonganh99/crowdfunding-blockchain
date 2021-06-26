import web3 from './index';
import CampaignFactory from '../../compiledContracts/CampaignFactory.json';

export default function campaignFactoryWeb3() {
    return new web3.eth.Contract(CampaignFactory.abi, '0x82eE730429f5e4Fc3AD7149558011f780D9E16Dc');
}
