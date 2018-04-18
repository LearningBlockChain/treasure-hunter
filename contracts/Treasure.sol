pragma solidity ^0.4.17;

contract Treasure {
    uint bettingPrice;
    uint winningNumber;
    struct Hunter {
        uint balance;
        uint accumulatedAmount; // how much an user has spent for a game. 
    }

    /* An address of user maps to the balance of the user */
    mapping(address => Hunter) public hunters;

    event Won(address _hunter, uint _amount);

    // Contructor
    function Treasure() public {
        setLevelOfDifficulty(1);
        winningNumber = block.number % 999 + 1;
    }

    // When restarting a game, the function must be invoked.
    function reset(uint randNonce) public {
        // Random
        winningNumber = uint(keccak256(now, msg.sender, randNonce)) % 100;
    }

    function setLevelOfDifficulty(uint _level) private returns (uint) {
        if (_level == 1)
            bettingPrice = 1000000 wei;
        else if (_level == 2)
            bettingPrice = 1000000000 wei;
        else if (_level == 3)
            bettingPrice = 1000000000000 wei;
        return bettingPrice;
    }

    function getClientBalance(address addr) public view returns(uint) {
        return addr.balance;
    }

    function getReward() public view returns(uint) {
        return address(this).balance;
    }

    function getContractAddress() public view returns(address) {
        return address(this);
    }

    function bet(uint guess) payable public {
        require(msg.sender.balance > bettingPrice);

        hunters[msg.sender].accumulatedAmount += bettingPrice;

        if (guess == winningNumber) {
            //Send all money of the current contract to the winner
            msg.sender.transfer(address(this).balance);
            emit Won(msg.sender, address(this).balance);
        }
    }
}