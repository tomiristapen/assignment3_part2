// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20SmartContract is ERC20 {
    address public lastSender;
    address public lastReceiver;
    uint256 public lastTimestamp;
    address public ownerAddress;

    event TransactionTracked(address indexed sender, address indexed receiver, uint256 timestamp);

    constructor(uint256 initialSupply, address _owner) ERC20("AITU_SE-2314-16Token", "TAD") {
        require(_owner != address(0), "Owner address cannot be zero");
        ownerAddress = _owner;
        _mint(_owner, initialSupply * (10 ** decimals()));
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        bool success = super.transfer(recipient, amount);
        if (success) {
            lastSender = msg.sender;
            lastReceiver = recipient;
            lastTimestamp = block.timestamp;
            emit TransactionTracked(msg.sender, recipient, lastTimestamp);
        }
        return success;
    }

    function getLastTransactionTimestamp() public view returns (uint256) {
        return lastTimestamp; 
    }

    function getLastSenderAddress() public view returns (address) {
        return lastSender;
    }

    function getLastReceiverAddress() public view returns (address) {
        return lastReceiver;
    }
}
