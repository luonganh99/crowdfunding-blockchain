// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './Campaign.sol';

contract CampaignFactory {
    address[] public campaigns;

    function createCampaign(
        string memory campaignName,
        string memory campaignDescription,
        uint minimum,
        uint target,
        uint deadline
    ) public {
        Campaign campaign = new Campaign(campaignName, campaignDescription, minimum, target, deadline, msg.sender);
        campaigns.push(address(campaign));
    }

    function getCampaigns() public view returns (address[] memory) {
        return campaigns;
    }
}
