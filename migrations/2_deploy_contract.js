const Recycle = artifacts.require("Recycle");

module.exports = function (deployer) {
  deployer.deploy(Recycle, '0xF73f682c6C39d6653eF80990B7a6084608C70bdA');
};

// module.exports = function (deployer, network, accounts) {
//   deployer.deploy(Recycle, accounts[1]);
// };
