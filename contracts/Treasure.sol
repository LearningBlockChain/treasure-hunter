pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract Treasure is Ownable {
    uint bettingPrice;
    uint bettingRate; // 1-10

    uint investStartedAt;
    uint investExpireAt;
    uint investPeriodInSeconds;
    uint investPricePerAddress;
    uint minimumWinningReward;

    uint round;
    enum Status {INVESTING, BETTING}

    Status currentState;
    uint gameStartedAt;


    uint winningNumber;
    uint winningNumberDigits;

    struct Reward {
        uint round;
        uint date;
        uint amount;
    }

    mapping(address => Reward) public winners;

    mapping(address => uint) public hunters;
    mapping(address => uint) public currentHunters;
    address[] public currentHunterAddresses;
    mapping(address => uint) public investors;
    mapping(address => uint) public currentInvestors;
    address[] public currentInvestorAddresses;

    event Bet(address _hunter);
    event Invest(address _investor, uint _reward);
    event StartGame(uint _reward);
    event FinishGame(address _hunter, uint _winningNumber, uint _reward);

    function Treasure() public {
        round = 1;
        winningNumberDigits = 3;
        investPeriodInSeconds = 60;
        bettingRate=5;
        minimumWinningReward=5000000000000000;
        initGame();
    }

    function initGame() private {
        gameStartedAt = 0;
        investStartedAt = now;
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

        investExpireAt = investStartedAt + investPeriodInSeconds;
        winningNumber = uint(keccak256(now, msg.sender, round)) % (10 * winningNumberDigits);
    }

    //  bettingPrice = Reward/10**winningNumberDigits*bettingRate
    function startGame() private {
        currentState = Status.BETTING;
        gameStartedAt = now;
        investStartedAt = 0;
        investExpireAt = 0;
        bettingPrice = getNewBettingPrice();
    }

    function finishGame() private {
        initGame();
    }

    function getNewBettingPrice() private view returns(uint){
        return (address(this).balance)/((10**winningNumberDigits)*bettingRate/10);
    }

    function getWinningNumberDigits() public view returns (uint){
        return winningNumberDigits;
    }

    function setWinningNumberDigits(uint _digits) external onlyOwner {
        require(gameStartedAt != 0);

        winningNumberDigits = _digits;
    }

    function getInvestPeriod() public view returns (uint){
        return investPeriodInSeconds;
    }

    function getInvestExpireAt() public view returns (uint){
        return investExpireAt;
    }

    function setInvestPeriod(uint _inSeconds) external onlyOwner {
        require(gameStartedAt != 0);

        investPeriodInSeconds = _inSeconds;
    }

    function getInvestPrice() public view returns (uint) {
        return investPricePerAddress;
    }

    function setInvestPricePerAddress(uint _price) external onlyOwner {
        require(gameStartedAt != 0);

        investPricePerAddress = _price;
    }

    function getHunterAddresses() public view returns (address[]){
        return currentHunterAddresses;
    }

    function getInvestorAddresses() public view returns (address[]){
        return currentInvestorAddresses;
    }

    function getClientBalance(address _addr) public view returns (uint) {
        return _addr.balance;
    }

    function getMinimumWinningReward() public view returns (uint) {
        return minimumWinningReward;
    }

    function setMinimumWinningReward(uint _minimum) external onlyOwner {
        minimumWinningReward = _minimum;
    }

    function getReward() public view returns (uint) {
        return address(this).balance;
    }

    function getState() public view returns (Status) {
        return currentState;
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }

    function invest() payable public {
        require(currentState == Status.INVESTING);
        require(msg.value >= investPricePerAddress);
        require(investors[msg.sender] == 0);


        investors[msg.sender] += investPricePerAddress;
        currentInvestorAddresses.push(msg.sender);

        uint _overSentValue = msg.value - investPricePerAddress;
        if (_overSentValue > 0) {
            msg.sender.transfer(_overSentValue);
        }

        emit Invest(msg.sender, address(this).balance);

        if (investExpireAt < now && address(this).balance > minimumWinningReward){

            startGame();
            emit StartGame(address(this).balance);
        }

    }

    function bet(uint _guessingNumber) payable public {
        require(currentState == Status.BETTING);
        require(msg.value >= bettingPrice);

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

            winners[msg.sender] = Reward({amount : _totalReward, date : now, round : round});

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