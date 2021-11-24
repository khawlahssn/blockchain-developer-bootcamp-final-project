# Design Patterns Used

## Access Control Design Patterns

- `Ownable` design pattern used in the function: `awardRecycler()` to restrict rewarding the user (i.e. the transfer of ether to the user) only to the person deploying the contract. The waste collector can only propose the reward and make sure the information provided by the user is correct

- `isCollector` is a function modifier that restricts the `requestReward()` function from being called aside from the assigned e-waste collector

## Inheritance and Interfaces

- `Recycle` contract inherits the OpenZeppelin `Ownable` contract to enable ownership for the user/organization deploying the contract

## Optimizing Gas

- In the contract's functions `addRecyclable()`, and `requestReward()` instead of repeatedly accessing the mappings `recyclerInfo` and `recyclerToReward` with the recycler's address to pass each of the returned struct's values to the events `LogRecyclableAdded` and `LogRecieved`. The mappings are accessed once and the returned structs are stored in an temporary struct variable then their values are passed.

- Creating structs in one go `someArray.push(eRecyclable({props}))` instead of having a temporary struct `eRecyclable memory temp` where we assign each property value to it then do this: `someArray.push(temp)`
