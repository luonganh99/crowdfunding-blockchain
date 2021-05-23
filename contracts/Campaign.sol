// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Campaign {
    struct Request {
        uint256 amount;
        string description;
        address payable recipient;
        bool isCompleted;
        uint256 approvalsCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint256 public minimumContribution;
    // Request[] public requests;
    uint256 approversCount;
    mapping(address => bool) approvers;

    uint256 requestsCount;
    mapping(uint256 => Request) requests;

    modifier onlyManager() {
        require(msg.sender == manager, "Sender not authorized.");
        _;
    }

    constructor(uint256 minimum, address creator) public {
        minimumContribution = minimum;
        manager = creator;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution, "");

        if (approvers[msg.sender] != true) {
            approvers[msg.sender] = true;
            approversCount++;
        }
    }

    function createRequest(
        uint256 amount,
        string memory description,
        address payable recipient
    ) public onlyManager {
        Request storage newRequest = requests[requestsCount++];
        newRequest.amount = amount;
        newRequest.description = description;
        newRequest.recipient = recipient;
        newRequest.isCompleted = false;
        newRequest.approvalsCount = 0;
    }

    function approveRequest(uint256 index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        require(!request.isCompleted);

        request.approvals[msg.sender] = true;
        request.approvalsCount++;
    }

    function finalizeRequest(uint256 index) public onlyManager {
        Request storage request = requests[index];

        require(request.approvalsCount > (approversCount / 2));
        require(!request.isCompleted);

        request.recipient.transfer(request.amount);
        request.isCompleted = true;
    }

    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            minimumContribution,
            address(this).balance,
            requestsCount + 1,
            approversCount,
            manager
        );
    }
}
