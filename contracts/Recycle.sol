// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ThankYouCard.sol";

contract Recycle is Ownable, ThankYouCard {

  address public WASTE_COLLECTOR;
  Consumer public recycler;
  using Counters for Counters.Counter;
  Counters.Counter private _recyclableId; // Default: 0


  struct Consumer {
    address consumerAddress;
    eRecyclable[] eRecyclables;
    string cityCode;
    uint totalNumOfItems;
    State itemsStatus;
  }

  struct eRecyclable {
    uint itemId;
    string description;
    uint weightInG;
  }

  struct Reward {
    uint totalNumOfItems;
    uint totalWeight;
    uint amountToAward;
  }

  enum State{ Processing, Recieved, Rewarded }

  mapping(address => Reward) private recyclerToReward;


  event LogRecyclableAdded(uint itemId);
  event LogRecieved(address recycler, State statusOfRecyclables);
  event LogRewarded(address recipient);

  /**
  * @dev The Recycle constructor sets the `waste collector` address
  */
  constructor(address collectorAddress) {
    WASTE_COLLECTOR = collectorAddress;
  }

  modifier isCollector(address _collector ) {
    require(_collector == WASTE_COLLECTOR);
    _;
  }

  modifier isRecycler(address _recycler) {
    require(_recycler == recycler.consumerAddress);
    _;
  }

  modifier minRequirementForEther(uint _totalWeight) {
    require(_totalWeight >= 10);
    _;
  }

  modifier minRequirementForCardNFT(uint _totalNumOfItems) {
    require(_totalNumOfItems >= 50);
    _;
  }
  
  modifier compareWeight(address _recycler, uint _totalWeight) {
      uint length = recycler.totalNumOfItems;
      uint weightSum;
      
      for (uint i = 0; i < length; i++) {
          weightSum = weightSum + recycler.eRecyclables[i].weightInG;
      }
      
      require(weightSum == _totalWeight);
      _;
  }

  /**
  * @dev Allows the recycler to add their e-waste
  */
  function addRecyclable(string memory _itemDescription, string memory _cityCode, uint _weight) public {
    _recyclableId.increment();
    uint newRecyclableId = _recyclableId.current();
    // uint newRecyclableId = 1;
    
    if(newRecyclableId == 1) {
        recycler.consumerAddress = msg.sender;
        recycler.cityCode = _cityCode;
    }
    
    recycler.eRecyclables.push(eRecyclable({
      itemId: newRecyclableId,
      description: _itemDescription,
      weightInG: _weight
    }));
    
    recycler.totalNumOfItems++;
    
    emit LogRecyclableAdded(recycler.eRecyclables[newRecyclableId - 1].itemId);
  }

  /**
    * @dev Allows the waste collector to start processing the e-waste and triggers a Recieved event
   */
   function submitRecyclables() public {
    recycler.itemsStatus = State.Recieved;

    emit LogRecieved(recycler.consumerAddress, recycler.itemsStatus);
   }

  /**
    * @dev Allows the waste collector to send the reward request to the admin
   */
   function requestReward(address _recycler, uint _totalWeight) private 
            isCollector(msg.sender) 
            isRecycler(_recycler) 
            compareWeight(_recycler, _totalWeight)
            minRequirementForEther(_totalWeight) 
    {
        
    recyclerToReward[recycler.consumerAddress] = Reward({
      totalNumOfItems: recycler.eRecyclables.length,
      totalWeight: _totalWeight,
      amountToAward: 1 * 10 ** 15
    });
    
   }

  /**
    * @dev Allows the admin to reward the recycler by sending 
   */
   function awardRecycler() private payable onlyOwner {
       
      address payable recyclerAddress = payable(recycler.consumerAddress);
      uint valueToReward = recyclerToReward[recyclerAddress].amountToAward;

      recyclerAddress.transfer(valueToReward);
      
      recycler.itemsStatus = State.Rewarded;
      
      awardCard(recyclerAddress, "TOKEN_URI");
      
      emit LogRewarded(recyclerAddress);

   }
   
     /**
    * @dev Allows user to query the status of all their items 
    * @return the status of all the items
    */
   function getStateOfItems() public view returns (State) {
       return recycler.itemsStatus;
   }
   
    /**
    * @dev Allows user to query for the details of a single item based on the id
    * @return {item description, weight of item in grams}
    */
   function getRecyclable(uint _itemId) public view 
            returns (
                    string memory description,
                    uint weightInG
                ) 
    {
        return (recycler.eRecyclables[_itemId].description, recycler.eRecyclables[_itemId].weightInG );
    }
    
    // function getReward(address recyclerAddress) public view returns (uint, uint, uint) {
    //     return (recyclerToReward[recyclerAddress].totalNumOfItems, 
    //             recyclerToReward[recyclerAddress].totalWeight, 
    //             recyclerToReward[recyclerAddress].amountToAward);
    // } 
   

}