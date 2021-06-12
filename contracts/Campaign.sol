// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Campaign {
    struct Request {
        uint amount;
        string description;
        address payable recipient;
        bool isCompleted;
        uint approvalsCount;
        mapping(address => bool) approvals;
    }

    string public name;
    string public description;
    address public manager;
    uint public minimumContribution;
    uint public targetContribution;
    uint public deadline;

    address[] public approverAddresses;
    uint public approversCount;
    mapping(address => uint) public approvers;
    uint public requestIndex;
    mapping(uint => Request) public requests;

    modifier onlyManager() {
        require(msg.sender == manager, 'Sender not authorized.');
        _;
    }

    constructor(
        string memory campaignName,
        string memory campaignDescription,
        uint minimum,
        uint target,
        uint deadlineDate,
        address creator
    ) public {
        name = campaignName;
        description = campaignDescription;
        minimumContribution = minimum;
        targetContribution = target;
        deadline = deadlineDate;
        manager = creator;
        approversCount = 0;
        requestIndex = 0;
    }

    function contribution () public payable {
        require(msg.value > minimumContribution, '');

        if (approvers[msg.sender] == 0) {
            approvers[msg.sender] = msg.value;
            approverAddresses.push(msg.sender);
            approversCount++;
        }
    }

    function fallback() external payable{}


    function createRequest(
        uint amount,
        string memory des,
        address payable recipient
    ) public onlyManager {
        Request storage newRequest = requests[requestIndex++];
        newRequest.amount = amount;
        newRequest.description = des;
        newRequest.recipient = recipient;
        newRequest.isCompleted = false;
        newRequest.approvalsCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender] > 0);
        require(!request.approvals[msg.sender]);
        require(!request.isCompleted);

        request.approvals[msg.sender] = true;
        request.approvalsCount++;
    }

    function finalizeRequest(uint index) public onlyManager {
        Request storage request = requests[index];

        require(request.approvalsCount > (approversCount / 2));
        require(!request.isCompleted);

        request.recipient.transfer(request.amount);
        request.isCompleted = true;
    }

    function getIsApprovedRequest(uint index) public view returns (bool) {
        Request storage request = requests[index];
        return request.approvals[msg.sender];
    }

    function getApproverAddresses() public view returns (address[] memory) {
        return approverAddresses;
    }

    function getSummary()
        public
        view
        returns (
            string memory,
            string memory,
            uint,
            uint,
            uint,
            uint,
            uint,
            uint,
            address
        )
    {
        return (
            name,
            description,
            minimumContribution,
            targetContribution,
            deadline,
            address(this).balance,
            requestIndex,
            approversCount,
            manager
        );
    }
}
