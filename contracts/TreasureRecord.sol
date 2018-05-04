pragma solidity ^0.4.23;

import "./TreasureGame.sol";

contract TreasureRecord is TreasureGame {
    struct GameRoundRecord {
        uint date;
        address winnerAddress;
        uint amount;
    }

    mapping (uint16 => GameRoundRecord) public gameRoundRecord;
    mapping(address => uint) public investors;
    mapping(address => uint) public hunters;
}
