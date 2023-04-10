// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/*
    Electricity Cost
    Units = (Power in watts/1000) 
    1 unit = 4.01 rs = 
    1 unit = 272136077158440 wei 0.0002721 ether
*/
error Solar_NoFallback();
error Solar_InsufficientFunds(uint256 given);
error Solar_NotOwner();
error Solar_NoWithdraw();
error Solar_AmbiguousState();

contract Solar {

    // enum
    enum State { Active, Inactive }

    /* Solar Variables */
    uint256 private pricePerUnitInWei;
    // userA => x units
    mapping(address => uint256) private _balances;
    // machineId => state
    mapping(uint32 => State) machine; 
    address private immutable owner;

    /*Events*/
    event SolarWithdraw(uint256 amount);
    event SolarBalanceSet(address indexed buyer, uint256 amount);

    constructor(uint256 _pricePerUnitInWei) {
        pricePerUnitInWei = _pricePerUnitInWei;
        owner = msg.sender;
    }

    receive() external payable {
        buy();
    }

    fallback() external payable {
        revert Solar_NoFallback();
    }

    

    function buy() public payable {
        if(msg.value == 0) {
            revert Solar_InsufficientFunds(msg.value);
        }
        uint256 unitsRemaining = _balances[msg.sender];
        uint256 unitOrdered = (msg.value * 1e18)  / pricePerUnitInWei;
        _balances[msg.sender] = unitsRemaining + unitOrdered;
    }

    function withdraw() external OnlyOwner{
        uint256 balance = address(this).balance;
        (bool CallSuccess,) = payable(msg.sender).call{value: balance}("");
        if(!CallSuccess) {
            revert Solar_NoWithdraw();
        }
        emit SolarWithdraw(balance);
    }

    // getting energy remaining for the user
    function getBalance() public view returns(uint256) {
        return _balances[msg.sender];
    }

    // setting energy remaining for the user
    function setBalance(uint256 usedbalance) public {
        _balances[msg.sender] -= usedbalance;
        emit SolarBalanceSet(msg.sender, _balances[msg.sender]);
    }

    // getting price per unit
    function getPrice() public view returns(uint256) {
        return pricePerUnitInWei;
    }

    // setting price per unit
    function setPrice(uint256 _pricePerUnitInWei) public OnlyOwner {
        pricePerUnitInWei = _pricePerUnitInWei;
    }

    // setting machine 
    function setMachine(uint32 _machineId) public OnlyOwner {
        machine[_machineId] = State.Inactive;
    }

    // getting Machine State
    function getMachineState(uint32 _machineId) public view returns(bool) {
        State scenerio = machine[_machineId];
        if(scenerio == State.Active) {
            return true;
        }
        else {
            return false;
        }
    }

    // setting Machine State
    function setMachineState(uint32 _machineState, bool state) public {
        if(state == true && machine[_machineState] == State.Inactive) {
            machine[_machineState] = State.Active;
        }
        else if(state == false && machine[_machineState] == State.Active) {
            machine[_machineState] = State.Inactive;
        } else {
            revert Solar_AmbiguousState();
        }
    }

    // modifier
    modifier OnlyOwner {
        if(msg.sender != owner) {
            revert Solar_NotOwner();
        }
        _;
    }
}