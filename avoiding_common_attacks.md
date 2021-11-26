# Common Attacks Avoided

## SWC-103 (Floating pragma)
Pragma is locked with version `0.8.4` to ensure that contracts do not get introduced to bugs that affect the contract system negatively

## SWC-105 (Unprotected Ether Withdrawal)
`withdraw` is protected with OpenZeppelin `Ownable`'s `onlyOwner` modifier.

## SWC-108 (State Variable Default Visibility)
All state variables have an explicitly defined visibility.
## Modifiers are Used Only for Validation
`isCollector` ensures that `requestReward()` is only called by the assigned e-waste collector. Meanwhile, `compareWeight`, and `minRequirementForEther` are used to validate for the data provided by the collector.