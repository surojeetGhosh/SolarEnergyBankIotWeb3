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
    enum State { Ambigious, Active, Inactive }

    //struct

    struct machineInfo {
        address currentUser;
        State state;
    }

    /* Solar Variables */
    uint256 private pricePerUnitInWei;
    // userA => x units
    mapping(address => uint256) private _balances;
    // machineId => machineInfo
    mapping(uint256 => machineInfo) machine; 
    address private immutable owner;

    /*Events*/
    event SolarBalanceSet(address indexed user, uint256 amount);
    event MachineState(uint256 indexed machineId, State state, address currentUser);

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
    }

    // getting energy remaining for the user
    function getBalance(address user) public view returns(uint256) {
        return _balances[user];
    }

    // setting energy remaining for the user
    function setBalance(address user, uint256 usedbalance) public {
        require(_balances[user] >= usedbalance, "Solar: Insufficient Balance");
        _balances[user] -= usedbalance;
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
    function setMachine(uint256 _machineId) public OnlyOwner {
        machine[_machineId] = machineInfo(address(0), State.Inactive);
    }

    // getting Machine State
    function getMachineState(uint256 _machineId) public view returns(bool) {
        State scenerio = machine[_machineId].state;
        if(scenerio == State.Active) {
            return true;
        }
        else if(scenerio == State.Inactive) {
            return false;
        } else {
            revert Solar_AmbiguousState();
        }
    }


    function startMachine(uint256 _machineId) public {
        if(machine[_machineId].state == State.Inactive) {
            machine[_machineId].state = State.Active;
            machine[_machineId].currentUser = msg.sender;
            emit MachineState(_machineId, machine[_machineId].state, machine[_machineId].currentUser);
        } else {
            revert Solar_AmbiguousState();
        }
    }

    function stopMachine(uint256 _machineId) public {
        if(machine[_machineId].state == State.Active) {
            machine[_machineId].state = State.Inactive;
            machine[_machineId].currentUser = address(0);
            emit MachineState(_machineId, machine[_machineId].state, machine[_machineId].currentUser);
        } else {
            revert Solar_AmbiguousState();
        }
    }

    function currentUser(uint256 _machineId) public view returns(address) {
        return machine[_machineId].currentUser;
    }

    // modifier
    modifier OnlyOwner {
        if(msg.sender != owner) {
            revert Solar_NotOwner();
        }
        _;
    }
}