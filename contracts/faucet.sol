// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Faucet is Ownable {

    IERC20 public tokenContract;
    uint256 public requestCooldown = 15 minutes;
    uint256 public faucetBalance;
    uint256 public amountToDistribute = 5 * 10**18; // Default to 5 tokens (assuming 18 decimals)

    mapping(address => uint256) public lastRequestTimestamp;

    constructor(address initialTokenAddress) Ownable(msg.sender) {
        require(initialTokenAddress != address(0), "Invalid token address");
        tokenContract = IERC20(initialTokenAddress);
    }

    function setTokenContract(address newTokenAddress) external onlyOwner {
        require(newTokenAddress != address(0), "Invalid token address");
        tokenContract = IERC20(newTokenAddress);
    }

    function setAmountToDistribute(uint256 newAmount) external onlyOwner {
        require(newAmount > 0, "Amount must be greater than zero");
        amountToDistribute = newAmount;
    }

    function requestTokens() external {
        require(block.timestamp - lastRequestTimestamp[msg.sender] >= requestCooldown, "Cooldown period not elapsed");

        lastRequestTimestamp[msg.sender] = block.timestamp;

        require(tokenContract.balanceOf(address(this)) >= amountToDistribute, "Faucet balance too low");

        tokenContract.transfer(msg.sender, amountToDistribute);
    }

    function setCooldownForAddress(address user, uint256 cooldown) external onlyOwner {
        lastRequestTimestamp[user] = block.timestamp - cooldown;
    }

    function getCooldownForAddress(address user) public view returns (uint256) {
        return lastRequestTimestamp[user] + requestCooldown - block.timestamp;
    }

    function viewCurrentAllowance(address owner) public view returns (uint256) {
        return tokenContract.allowance(owner, address(this));
    }


    function approveTokens(uint256 amount) public {
        // Approve this contract to spend 'amount' of tokens on behalf of the caller
        bool success = tokenContract.approve(address(this), amount);
        require(success, "Approval for faucet failed");
    }


    function refillFaucet(uint256 amount) public {
        uint256 allowance = tokenContract.allowance(owner(), address(this));
        require(allowance >= amount, "Allowance too low");

        uint256 balance = tokenContract.balanceOf(msg.sender);
        require(balance >= amount, "Insufficient balance");

        bool success = tokenContract.transferFrom(msg.sender, address(this), amount);
        require(success, "Refill failed");

        faucetBalance += amount;
    }

    function approveAndRefill(uint256 amount) external onlyOwner {
        approveTokens(amount);
        refillFaucet(amount);
    }

    function withdrawTokens(uint256 amount) external onlyOwner {
        require(tokenContract.balanceOf(address(this)) >= amount, "Insufficient faucet balance");
        tokenContract.transfer(msg.sender, amount);
    }
}