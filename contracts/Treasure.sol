pragma solidity ^0.4.17;

contract Treasure {
    uint public reward;
    uint bettingPrice;

    struct Hunter {
        uint balance;
        uint accumulatedAmount; // how much an user has spent for a game. 
    }

    /* An address of user maps to the balance of the user */
    mapping(address => Hunter) public hunters;

    event Won(bool _status, uint _amount);

    // Contructor
    function Treasure() public {
        address user = this;
        hunters[msg.sender].balance = user.balance;
    }

    /* 
    * level 1 : betting price is 1,000,000 wei per game.
    * level 2 : betting price is 1,000,000,000 wei per game (when one digits found).
    * level 3 : betting price is 1,000,000,000,000 wei per game (when two digits found).
    */
    function setLevelOfDifficuly(uint level) public {
        if (level == 1)
            bettingPrice = 1000000;
        else if (level == 2)
            bettingPrice = 1000000000;
        else if (level == 3)
            bettingPrice = 1000000000000;
    }


    function bet(uint guess) public payable {
        require(hunters[msg.sender].balance > bettingPrice);
        
        hunters[msg.sender].accumulatedAmount += bettingPrice;

        // This randomness is not safe.
        uint winningNumber = block.number % 999 + 1;

        if (guess == winningNumber) {
            if(!msg.sender.send(reward)) revert();
            emit Won(true, bettingPrice);
        } else {
            if(!myaddress.send(bettingPrice)) revert();
            emit Won(false, 0);
        }
    } 

    // Get all hunters
    function getHunters() public view returns (address[]) {
        return hunters;
    }

    // Fallback
    function() public { 
        revert();
    }
}