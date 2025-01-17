const { ethers } = require("hardhat");

async function main() {
  // Replace with your contract address and receiver address
  const contractAddress = "0x20AC9092433CFcc33bc242fF9f1580a3ed651fA7";
  const receiverAddress = "0x7D439659b195515C5E5D9B95c037F7dA327670A7";
  const amount = ethers.utils.parseUnits("10", 18); // 10 tokens (adjust based on your token decimals)

  // Get the deployed contract instance
  const contract = await ethers.getContractAt("ERC20_smart_contract", contractAddress);
  
  // Check receiver's balance before the transaction
  const balanceBefore = await contract.balanceOf(receiverAddress);
  console.log("Receiver's balance before:", ethers.utils.formatUnits(balanceBefore, 18));

  // Perform the transaction (e.g., transfer tokens)
  console.log("Sending tokens...");
  const tx = await contract.transfer(receiverAddress, amount);
  console.log("Transaction sent, waiting for confirmation...");

  // Wait for the transaction to be mined
  const receipt = await tx.wait();
  
  if (receipt.status === 1) {
    console.log("Transaction successful!");
  } else {
    console.log("Transaction failed!");
    return;
  }

  // Check receiver's balance after the transaction
  const balanceAfter = await contract.balanceOf(receiverAddress);
  console.log("Receiver's balance after:", ethers.utils.formatUnits(balanceAfter, 18));

  // Verify if the receiver received the transaction
  if (balanceAfter.sub(balanceBefore).toString() === amount.toString()) {
    console.log("Receiver received the tokens!");
  } else {
    console.log("Receiver did not receive the tokens.");
  }

  // Optionally, listen for Transfer event (you can comment this part if not needed)
  contract.on("Transfer", (from, to, value, event) => {
    if (to === receiverAddress) {
      console.log(`Transfer detected: ${from} sent ${ethers.utils.formatUnits(value, 18)} tokens to ${to}`);
      console.log("Receiver received the tokens!");
    }
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
