pragma solidity ^0.4.23;

import "./TreasureBetting.sol";

contract NewTreasure is TreasureBetting {
    function initGame() internal {
        currentState = Status.INVESTING;
        uint i=0;
        for(i=0; i <currentInvestorAddresses.length;i++){
            delete currentInvestors[currentInvestorAddresses[i]];
        }
        delete currentInvestorAddresses;

        for(i=0; i <currentHunterAddresses.length;i++){
            delete currentHunters[currentHunterAddresses[i]];
        }
        delete currentHunterAddresses;

        winningNumber = uint(keccak256(now, msg.sender, round)) % (10 * winningNumberDigits);
    }

    function isBettingMode() external view returns(bool) {
        return currentState == Status.BETTING;
    }
}
