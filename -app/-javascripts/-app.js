// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import {default as Web3} from 'web3';
import {default as contract} from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import treasure_artifacts from '../../build/contracts/Treasure.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Treasure = contract(treasure_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var hunters;
var hunter;

window.App = {
  start: function () {
    var self = this;

    // Bootstrap the Treasure abstraction for Use.
    Treasure.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      hunters = accs;
      hunter = hunters[0];
      console.log(hunters)

      var myaddress = document.getElementById("myaddress");
      myaddress.innerHTML = hunter;


      self.refresh();
    });
  },

  setStatus: function (message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  refresh: function () {
    var self = this;

    var treasure;
    Treasure.deployed().then(function (instance) {
      treasure = instance;
      return treasure.getAddress.call();
    }).then(function (address) {
      var houseAddress = document.getElementById("houseAddress");
      houseAddress.innerHTML = address.valueOf();
      return treasure.getBalance.call(hunter, {from: hunter});
    }).then(function (balance) {
      console.log(balance)
      var balance_element = document.getElementById("balance");
      balance_element.innerHTML = balance.valueOf();
      return treasure.getReward.call({from: hunter});
    }).then(function (reward) {
      console.log(reward)
      var rewardElement = document.getElementById("reward");
      rewardElement.innerHTML = reward.valueOf();
    }).catch(function (e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  },

  bet: function () {
    var self = this;

    var guess = parseInt(document.getElementById("guess").value);
    console.log(guess)
    this.setStatus("Initiating transaction... (please wait)");

    var treasure;
    Treasure.deployed().then(function (instance) {
      treasure = instance;
      return treasure.bet(guess, {from: hunter, value: 1000000000000000000});
    }).then(function (res) {
      console.log(res);
      self.setStatus("Transaction complete!");
      self.refresh();
    }).catch(function (e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  },

  getReward: function () {
    var treasure;
    Treasure.deployed().then(function (instance) {
      treasure = instance;
      return treasure.getReward({from: hunter});
    }).then(function (res) {
      console.log(res);
      self.setStatus("Transaction complete!");
    }).catch(function (e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  }
};

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  }

  App.start();
});
