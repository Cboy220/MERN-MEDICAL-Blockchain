var Web3        = require('web3'),
    contract    = require("truffle-contract"),
    path        = require('path')
    Medical    = require(path.join(__dirname, '../build/contracts/Medical.json'));

    
var provider    = new Web3.providers.HttpProvider("http://localhost:7545"),    
    filePath    = path.join(__dirname, '..build/contracts/Medical.json');
 

var MetaCoinContract = contract(Medical);
MetaCoinContract.setProvider(provider);

exports.setup= async function(){
    // let instance = await MetaCoinContract.deployed();
    // let accounts = await Web3.eth.defaultAccount;
    // let balance = await instance.getBalance(accounts);
    console.log("Web3 version");
    // console.log(Web3.version);
    // console.log(Web3.utils);
    // console.log(Web3.modules);
    // console.log(Web3.version);
    // console.log(Web3.givenProvider);
    // console.log(providers);
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

    console.log(web3.eth.getAccounts(npm));
    // .then(async function(instance) {
    //     let accounts = await Web3.eth.getAccounts();
    //     let balance = await instance.getBalance(accounts[0]);
    //     console.log("balance is "+ balance);
    //     // return instance.getBalance.call('0xC17677F314969AB9E4f487C061d805E212754f22', {from: '0xF6Ac3137625b223847C0FAcB8ea49E615191F35A'})
        
    // }).then(function(result) {
    //     console.log(result);
        
    // }, function(error) {
    //     console.log(error);
    // })
}