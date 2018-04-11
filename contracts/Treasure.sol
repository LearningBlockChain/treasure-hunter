pragma solidity ^0.4.17;

contract Treasure {
    uint bettingPrice;
    address public creator = 0xBD1DF2C9C9A6744c11e8a1aC20e75A907AaBFdd2;
    uint winningNumber;
    struct Hunter {
        uint balance;
        uint accumulatedAmount; // how much an user has spent for a game. 
    }

    /* An address of user maps to the balance of the user */
    mapping(address => Hunter) public hunters;

    event Won(address hunter, uint amount);
    event Bet(address hunter, uint amount);

    // Contructor
    function Treasure() public {
        setLevelOfDifficulty(1);
        winningNumber = block.number % 999 + 1;
    }

    /* 
    * level 1 : betting price is 1,000,000 wei per game.
    * level 2 : betting price is 1,000,000,000 wei per game (when one digits found).
    * level 3 : betting price is 1,000,000,000,000 wei per game (when two digits found).
    */
    function setLevelOfDifficulty(uint level) public returns (uint){
        if (level == 1)
            bettingPrice = 1000000 wei;
        else if (level == 2)
            bettingPrice = 1000000000 wei;
        else if (level == 3)
            bettingPrice = 1000000000000 wei;
        return bettingPrice;
    }

    function getBalance(address addr) public view returns(uint) {
        return addr.balance;
    }

    function getAddress() public view returns(address) {
        return address(this);
    }

    function bet(uint guess) payable public {
        require(hunters[msg.sender].balance > bettingPrice);

        hunters[msg.sender].accumulatedAmount += bettingPrice;
        
        winningNumber = 111;

        if (guess == winningNumber) {
            // Send all money of the current contract to the winner
            msg.sender.transfer(10000 wei);
            // emit Won(msg.sender, address(this).balance);
        } else {
            // If wrong, send betting price to the current contract
            creator.transfer(bettingPrice);
        }
        return;
    } 

    // Fallback: http://solidity.readthedocs.io/en/v0.4.21/contracts.html
    // this function is executed whenever the contract receives plain Ether (without data). 
    // Additionally, in order to receive Ether, the fallback function must be marked payable. 
    // If no such function exists, the contract cannot receive Ether through regular transactions.
    function() payable public {}
}