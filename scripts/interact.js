const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xC2cFf9d66Fce208e14E2a98B17E63B157e74ca03"; // Deployed contract address
  const [owner, recipient] = await ethers.getSigners();

  // Get the deployed contract instance
  const contract = await ethers.getContractAt("ERC20_smart_contract", contractAddress);

  // Check initial balances
  const ownerBalance = await contract.balanceOf(owner.address);
  const recipientBalance = await contract.balanceOf(recipient.address);
  console.log(`Owner balance: ${ethers.utils.formatUnits(ownerBalance, 18)} tokens`);
  console.log(`Recipient balance: ${ethers.utils.formatUnits(recipientBalance, 18)} tokens`);

  // Transfer tokens
  const amount = ethers.utils.parseUnits("10", 18); // 10 tokens
  const tx = await contract.transfer(recipient.address, amount, { gasLimit: 1000000 }); // Increase gas limit
  await tx.wait();
  console.log(`Transferred ${ethers.utils.formatUnits(amount, 18)} tokens to ${recipient.address}`);

  // Check balances after transfer
  const ownerBalanceAfter = await contract.balanceOf(owner.address);
  const recipientBalanceAfter = await contract.balanceOf(recipient.address);
  console.log(`Owner balance after transfer: ${ethers.utils.formatUnits(ownerBalanceAfter, 18)} tokens`);
  console.log(`Recipient balance after transfer: ${ethers.utils.formatUnits(recipientBalanceAfter, 18)} tokens`);

  // Check last transaction details
  const lastSender = await contract.getLastSenderAddress();
  const lastReceiver = await contract.getLastReceiverAddress();
  const lastTimestamp = await contract.lastTimestamp(); // Directly access the public variable
  console.log(`Last transaction sender: ${lastSender}`);
  console.log(`Last transaction receiver: ${lastReceiver}`);
  console.log(`Last transaction timestamp: ${lastTimestamp}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});