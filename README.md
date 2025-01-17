# Team: Ayaulym Kenzhekul SE-2314,Tomiris Tapen SE-2316,Danial Yerzhigit SE-2314
# Project Description

This project is a blockchain-based application built using the Hardhat development environment. It includes smart contracts, scripts, and testing infrastructure to deploy, manage, and interact with decentralized applications (dApps). The main focus appears to be on managing transactions and validating contract functionality.

## Key Features
- Smart contracts written in Solidity.
- Deployment and testing framework using Hardhat.
- Scripts to deploy and verify contracts.
- Testing suite for validating contract functionality.
- Includes pre-configured caching and artifact directories.

---

# Setup Instructions

Follow these steps to set up the project:

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

### Configuration
- Ensure you have a `.env` file configured with necessary environment variables such as:
  ```
  INFURA_API_KEY=your_infura_key
  PRIVATE_KEY=your_private_key
  NETWORK=network_name
  ```

---

# How to Run

### Running the Development Environment
1. Compile the smart contracts:
   ```bash
   npx hardhat compile
   ```
2. Start a local blockchain network:
   ```bash
   npx hardhat node
   ```

### Deploying Contracts
1. Deploy contracts to the local network:
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```
2. Deploy to a specific network (e.g., Rinkeby):
   ```bash
   npx hardhat run scripts/deploy.js --network rinkeby
   ```

### Running Tests
Run the test suite to validate contract functionality:
```bash
npx hardhat test
```

### Additional Scripts
- To check transactions:
  ```bash
  node checkTransaction.js
  ```
- Use the provided shell script for deployment and verification:
  ```bash
  ./deploy_and_check.sh
  ```

---

# License
This project is licensed under the terms specified in the `LICENSE` file.

