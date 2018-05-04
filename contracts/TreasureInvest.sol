pragma solidity ^0.4.23;

import "./TreasureRecord.sol";

contract TreasureInvest is TreasureRecord {
    uint64 investPricePerAddress = 0.3 ether;
    address[] public currentInvestorAddresses;

    mapping(address => uint) internal currentInvestors;

    event Invest(address _investor, uint _reward);
    event StartGame(uint _reward);

    modifier inInvesting() {
        require(currentState == Status.INVESTING, "This is not an investment period.");
        _;
    }

    modifier investOncePerRound() {
        require(currentInvestors[msg.sender] == 0, "This address has already invested in this round.");
        _;
    }

    function getInvestPrice() public view returns (uint128) {
        return investPricePerAddress;
    }

    function setInvestPricePerAddress(uint64 _price) external onlyOwner {
        require(currentState == Status.BETTING);
        investPricePerAddress = _price;
    }

    function invest() payable external inInvesting investOncePerRound {
        investors[msg.sender] += investPricePerAddress;

        uint _overSentValue = msg.value - investPricePerAddress;
        if (_overSentValue > 0) {
            msg.sender.transfer(_overSentValue);
        }

        emit Invest(msg.sender, address(this).balance);

        if (address(this).balance > minimumWinningReward){
            startGame();
            emit StartGame(address(this).balance);
        }
    }

    function startGame() internal ;
}
