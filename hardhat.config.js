require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.20",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache local blockchain
      accounts: [
        "0x1bb579d6a50f4ba7bdec166d31065cb1c881e544225f17568c441dd7d078b8a4",
        "0x2385ab0c1d2dfdf55abb08ee055f8c05cf9eebafa36a89ec9ec3caf3d2a7a5e0",
        "0xb800e8b9a6909c20f58472d93491558815544bf8a8f1a8be1c8c49a9d15f69a6"
      ],
      // Disable ENS
      ens: { enabled: false },
    },
  },
};
