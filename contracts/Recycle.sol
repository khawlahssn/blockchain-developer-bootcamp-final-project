// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Contract for recycling electronics
 * @author Khawla H.
 * @notice Allows a user to put up their electronics for recycling and get rewarded
 * @dev Recyclables will be tracked and ether will be sent as a reward
 */
contract Recycle is Ownable {
    address public wasteCollector;
    uint256 private rewardAmountInWei = 1000000000000000;

    struct Consumer {
        address consumerAddress;
        eRecyclable recyclable;
        string cityCode;
        State itemStatus;
    }

    struct eRecyclable {
        string description;
        uint256 weightInKG;
    }

    struct Reward {
        uint256 weightInKG;
        uint256 amountToAward;
    }

    enum State {
        Processing,
        Recieved,
        Rewarded
    }

    mapping(address => Consumer) private recyclerInfo;
    mapping(address => Reward) private recyclerToReward;

    /**
     * @notice Emitted when a recycler adds an items
     * @param descrp name or description of item
     * @param weightInKG weight of item in Kg
     * @param statusOfRecyclable current status of the items
     */
    event LogRecyclableAdded(
        string descrp,
        uint256 weightInKG,
        State statusOfRecyclable
    );

    /**
     * @notice Emitted when a waste collector requests to reward the recycler
     * @param recycler address of the recycler
     * @param balanceOfRecipient current balance of the recycler
     * @param weightInKG total weight of items recycled in Kg
     * @param rewardAmount amount of wei to rewarded to the recycler
     * @param statusOfRecyclable current status of the items
     */
    event LogRecieved(
        address recycler,
        uint256 balanceOfRecipient,
        uint256 weightInKG,
        uint256 rewardAmount,
        State statusOfRecyclable
    );

    /**
     * @notice Emitted when the owner rewards the recycler
     * @param recipient address of the recycler
     * @param balanceOfRecipient current balance of the recycler
     * @param statusOfRecyclable current status of the items
     */
    event LogRewarded(
        address recipient,
        uint256 balanceOfRecipient,
        State statusOfRecyclable
    );

    // @notice The Recycle constructor sets the `waste collector` address
    constructor(address _collector) {
        wasteCollector = _collector;
    }

    modifier isCollector(address _collector) {
        require(
            _collector == wasteCollector,
            "Only collector can make this request"
        );
        _;
    }

    modifier compareWeight(address _recycler, uint256 _itemWeight) {
        require(
            recyclerInfo[_recycler].recyclable.weightInKG == _itemWeight,
            "The weights are NOT matching"
        );
        _;
    }

    modifier minRequirementForEther(uint256 _itemWeight) {
        require(_itemWeight >= 1, "The weight must be at least 1 KG");
        _;
    }

    // modifier requirementForCardNFT(address _recycler, uint256 _totalNumOfItems) {
    //   TO-DO: require a total of 100 items to mint an ERC721 NFT appreciation card
    // }

    /**
     * @notice Allows the recycler to add their e-waste
     * @param _itemDescription a short description of the electronic
     * @param _cityCode a 3-letter code of the city that recycler lives in
     * @param _weight weight of the electronic equipment in KGs
     * @dev Recycler should call this function for every item
     */
    function addRecyclable(
        string memory _itemDescription,
        string memory _cityCode,
        uint256 _weight
    ) public {
        recyclerInfo[msg.sender].consumerAddress = msg.sender;

        recyclerInfo[msg.sender].cityCode = _cityCode;

        recyclerInfo[msg.sender].recyclable = eRecyclable({
            description: _itemDescription,
            weightInKG: _weight
        });

        eRecyclable memory tempRecyclable = recyclerInfo[msg.sender].recyclable;

        emit LogRecyclableAdded(
            tempRecyclable.description,
            tempRecyclable.weightInKG,
            recyclerInfo[msg.sender].itemStatus
        );
    }

    /**
     * @notice Allows the waste collector to send the reward request to the admin
     * @param _recycler address of the recycler
     * @param _weight total weight calculated by the waste collector
     * @dev Only the waste collector can make a reward request to the contract owner
     */
    function requestReward(address _recycler, uint256 _weight)
        public
        isCollector(msg.sender)
        compareWeight(_recycler, _weight)
        minRequirementForEther(_weight)
    {
        recyclerToReward[_recycler] = Reward({
            weightInKG: _weight,
            amountToAward: rewardAmountInWei
        });

        recyclerInfo[_recycler].itemStatus = State.Recieved;

        Reward memory currentReward = recyclerToReward[_recycler];
        Consumer memory currentRecyclerInfo = recyclerInfo[_recycler];

        emit LogRecieved(
            currentRecyclerInfo.consumerAddress,
            currentRecyclerInfo.consumerAddress.balance,
            currentReward.weightInKG,
            currentReward.amountToAward,
            currentRecyclerInfo.itemStatus
        );
    }

    /**
     * @notice Allows the admin to reward the recycler by sending
     * @param _recycler address of the recycler
     * @dev Only owner of the contract can send the reward after request from collector
     */
    function awardRecycler(address _recycler) public payable onlyOwner {
        // Get the contract's address
        address contractAddress = address(this);

        address payable recyclerAddress = payable(
            recyclerInfo[_recycler].consumerAddress
        );

        uint256 valueToReward = recyclerToReward[recyclerAddress].amountToAward;

        require(
            contractAddress.balance > valueToReward,
            "Contract does not have enough funds"
        );
        require(
            recyclerInfo[_recycler].itemStatus == State.Recieved,
            "Collector did not recieve items"
        );

        recyclerAddress.transfer(valueToReward);
        recyclerInfo[_recycler].itemStatus = State.Rewarded;

        // TO-DO: Mint an ERC721 NFT card for the recycler

        emit LogRewarded(
            recyclerAddress,
            recyclerAddress.balance,
            recyclerInfo[_recycler].itemStatus
        );
    }
}
