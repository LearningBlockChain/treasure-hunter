pragma solidity ^0.4.23;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract TreasureGame is Ownable {
    enum Status {INVESTING, BETTING}    // game mode
    Status currentState;                // curent game mode
    uint8 winningNumberDigits;          // Password digits in treasure box
    uint winningNumber;                 // Password
    uint64 minimumWinningReward;
    uint16 round;

    function TreasureGame(){
        winningNumberDigits = 3;
        currentState = Status.INVESTING;
        minimumWinningReward = 1 ether;
        round = 1;
    }

    function isOwner() public view returns(bool) {
        return msg.sender == owner;
    }

    function getWinningNumberDigits() public view returns (uint8){
        return winningNumberDigits;
    }

    function setWinningNumberDigits(uint8 _digits) external onlyOwner {
        winningNumberDigits = _digits;
    }

    function getMinimumWinningReward() public view returns (uint64) {
        return minimumWinningReward;
    }

    function setMinimumWinningReward(uint64 _minimumWinningReward) external onlyOwner {
        minimumWinningReward = _minimumWinningReward;
    }

    function getReward() public view returns (uint256) {
        return address(this).balance;
    }

    function initGame() internal;
}
