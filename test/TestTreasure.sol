pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Treasure.sol";

contract TestTreasure {
    //Treasure treasure = Treasure(DeployedAddresses.Treasure());

    // Truffle looks for `initialBalance` when it compiles the test suite 
    // and funds this test contract with the specified amount on deployment.
    uint public initialBalance = 10 wei;

    function testInvest() public {
        Treasure treasure = new Treasure();

//        treasure.invest();
//        uint expected = 1000000;
//        Assert.equal(result, expected, "setLevelOfDifficulty passed!");

    }

    function testBettingPrice() public {
//        uint bettingPrice = (1.200000 ether)/((10**3)*5/10);
//        Assert.equal(bettingPrice, 0.0024 ether, "bettingPrice");
        uint roundDown = uint(28682221646935461 wei) / 1000000000000 * 100000000000;
        Assert.equal(roundDown, 0.0028682 ether, "roundDown");
    }

//    function testBetting() public {
//        address treasure = new Treasure();
//        Assert.equal(this.balance, 10 wei, "You have 10 ether");
//        Assert.equal(treasure.balance, 0, "You have 0 balance");
//
//        // perform an action which sends value to myContract, then assert.
//        treasure.transfer(10 wei);
//        Assert.equal(treasure.balance, 10 wei, "After you won, you have 10 wei");
//
//        Treasure treasure2 = Treasure(DeployedAddresses.Treasure());
//        treasure2.bet();
        

        //address another = (new Treasure).value(1 ether)(); 
        //Assert.equal(another.balance, 1 ether);
        //bool result = treasure.bet(111);
        //bool expected = true;
        //Assert.equal(result, expected, "Passed!");
//    }
}
