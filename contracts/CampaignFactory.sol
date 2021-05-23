// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Campaign.sol";

contract CampaignFactory {
    address[] public campaigns;

    function createCampaign(uint256 minimum) public {
        Campaign campaign = new Campaign(minimum, msg.sender);
        campaigns.push(address(campaign));
    }

    function getCampaigns() public view returns (address[] memory) {
        return campaigns;
    }
}
