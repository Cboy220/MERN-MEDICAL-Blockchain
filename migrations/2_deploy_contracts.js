const Medical = artifacts.require("Medical");

module.exports = function(deployer) {
  deployer.deploy(Medical);
};
