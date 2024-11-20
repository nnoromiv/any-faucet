// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MATIC Faucet
 * @notice A faucet for distributing native Polygon (MATIC) tokens to users with a cooldown period.
 */
contract MaticFaucet is Ownable {
    // Faucet settings
    uint256 public requestCooldown = 24 hours;
    uint256 public amountToDistribute = 0.015 ether; // Represented in wei (1 ether = 10^18 wei)

    // Mapping to track user cooldowns
    mapping(address => uint256) public lastRequestTimestamp;

    constructor(address initialTokenAddress) Ownable(msg.sender) {
        require(initialTokenAddress != address(0), "Invalid token address");
    }

    /**
     * @notice Allows users to request MATIC tokens, enforcing a cooldown period.
     */
    function requestTokens() external {
        require(
            block.timestamp - lastRequestTimestamp[msg.sender] >= requestCooldown,
            "Cooldown period not elapsed"
        );
        require(address(this).balance >= amountToDistribute, "Faucet balance too low");

        lastRequestTimestamp[msg.sender] = block.timestamp;

        (bool success, ) = msg.sender.call{value: amountToDistribute}("");
        require(success, "MATIC transfer failed");
    }

    /**
     * @notice Deposit MATIC into the faucet (contract must be payable).
     */
    receive() external payable {}

    /**
     * @notice Withdraw MATIC from the faucet.
     * @param amount Amount of MATIC to withdraw (in wei).
     */
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient faucet balance");

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
    }

    /**
     * @notice Set the cooldown period between requests.
     * @param newCooldown Cooldown duration in seconds.
     */
    function setRequestCooldown(uint256 newCooldown) external onlyOwner {
        requestCooldown = newCooldown;
    }

    /**
     * @notice Set the amount of MATIC to distribute per request.
     * @param newAmount Amount to distribute in wei (1 ether = 10^18 wei).
     */
    function setAmountToDistribute(uint256 newAmount) external onlyOwner {
        require(newAmount > 0, "Amount must be greater than zero");
        amountToDistribute = newAmount;
    }

    /**
     * @notice Get the remaining cooldown time for a specific address.
     * @param user Address of the user.
     * @return Remaining cooldown time in seconds.
     */
    function getCooldownForAddress(address user) public view returns (uint256) {
        if (block.timestamp >= lastRequestTimestamp[user] + requestCooldown) {
            return 0;
        }
        return lastRequestTimestamp[user] + requestCooldown - block.timestamp;
    }
}