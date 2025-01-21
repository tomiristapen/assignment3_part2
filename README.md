# Team: Ayaulym Kenzhekul SE-2314,Tomiris Tapen SE-2316,Danial Yerzhigit SE-2314
# Project Description

This project is a blockchain-based application built using the Hardhat development environment. It includes smart contracts, scripts, and testing infrastructure to deploy, manage, and interact with decentralized applications (dApps). The main focus appears to be on managing transactions, validating contract functionality, and implementing ERC20 tokens for creating fungible, Ethereum-compatible tokens used in payments, staking, and tokenized systems.

## Key Features
- Smart contracts written in Solidity.
- Deployment and testing framework using Hardhat.
- Scripts to deploy and verify contracts.
- Testing suite for validating contract functionality.
- Includes pre-configured caching and artifact directories.
---
### Prerequisites
Ensure you have the following installed:
1. **Node.js** (version 14.x or later)
2. **npm** (comes with Node.js)
3. **Hardhat** (installed as part of dependencies)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd erc
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3.
   ```bash
   npx hardhat
   ``` 
---

# How to Run

### Running the Development Environment
1. Compile the smart contracts:
   ```bash
   npx hardhat compile
   ```
### Deploying Contracts
2. Deploy contracts to the local network:
   ```bash
   npx hardhat run scripts/deploy.js --network ganache
   ```

3. interact.js to see the functionalities:
  ```bash
  npx hardhat run scripts/interact.js --network ganache
  ```
  
![run deploy.js](images/imagedepint.png)

import tokens to metamask ganache account:

![run deploy.js](images/image1.png)

![run deploy.js](images/image3.png)

![run deploy.js](images/image301.png)

---
Key Functions

- The ERC20 token implementation in this project includes the following essential functions:

- totalSupply(): Returns the total token supply.

- balanceOf(address account): Returns the balance of a specific account.

- transfer(address recipient, uint256 amount): Transfers tokens to a specified address.

- approve(address spender, uint256 amount): Approves a spender to transfer tokens on behalf of the owner.

- transferFrom(address sender, address recipient, uint256 amount): Executes a transfer on behalf of another address.

- allowance(address owner, address spender): Returns the remaining number of tokens a spender is allowed to spend.

# License
This project is licensed under the terms specified in the `LICENSE` file.

