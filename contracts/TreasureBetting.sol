pragma solidity ^0.4.23;

import "./TreasureInvest.sol";

contract TreasureBetting is TreasureInvest {
    uint8 bettingRate = 5; // 1-10
    uint bettingPrice;
    uint gameStartedAt;

    mapping(address => uint) public currentHunters;
    address[] public currentHunterAddresses;

    modifier inBetting() {
        require(currentState == Status.BETTING, "This is not a betting period.");
        _;
    }

    modifier enoughBetValue(){
        require(msg.value >= bettingPrice, "Check the betting value.");
        _;
    }

    event Bet(address _hunter);
    event FinishGame(address _hunter, uint _winningNumber, uint _reward);

    function startGame() internal {
        currentState = Status.BETTING;
        gameStartedAt = now;
        bettingPrice = getNewBettingPrice();
    }

    function getNewBettingPrice() internal view returns(uint){
        return (address(this).balance)/((10**winningNumberDigits)*bettingRate/10);
    }

    function bet(uint _guessingNumber) payable public inBetting enoughBetValue {
        hunters[msg.sender] += bettingPrice;
        currentHunterAddresses.push(msg.sender);

        uint _overSentValue = msg.value - bettingPrice;
        if (_overSentValue > 0) {
            msg.sender.transfer(_overSentValue);
        }

        bool _won = _guessingNumber == winningNumber;
        if (_won) {
            uint _totalReward = address(this).balance;
            uint _betterReward = _totalReward / 2;
            uint _investorsReward = _totalReward - _betterReward;
            uint _investorsCount = currentInvestorAddresses.length ;
            uint _investorReward = _investorsReward / _investorsCount;
            msg.sender.transfer(_betterReward);

            gameRoundRecord[round] = GameRoundRecord({ date : now, winnerAddress: msg.sender, amount : _totalReward});

            emit FinishGame(msg.sender, winningNumber, _betterReward);

            for (uint i = 0; i < _investorsCount; i++) {
                currentInvestorAddresses[i].transfer(_investorReward);
            }
            initGame();
        } else {
            bettingPrice = getNewBettingPrice();
            emit Bet(msg.sender);
        }
    }
}
