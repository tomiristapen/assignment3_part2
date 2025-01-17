const { ethers } = require("hardhat");

async function main() {
    const signers = await ethers.getSigners();
    console.log("All Signers:", signers);

    const owner = signers[0]; // This will be the sender (Owner Address)
    const recipient1 = signers[1]; // This will be Address 1
    const recipient2 = signers[2]; // This will be Address 2

    console.log("Owner Address:", owner.address);
    console.log("Address 1:", recipient1.address);
    console.log("Address 2:", recipient2.address);

    const token = await ethers.getContractAt("ERC20_smart_contract", "0x2Dd955d96df652a37B73d03bb39904200dA3050a");

    // Check balances before transfer
    const balanceBefore = await token.balanceOf(owner.address);
    console.log("Owner balance before transfer:", balanceBefore.toString());

    // Attempt to send tokens
    const amount = ethers.utils.parseUnits("100", 18);
    try {
        const tx = await token.transfer(recipient1.address, amount);
        await tx.wait();
        console.log(`Successfully sent 100 tokens to ${recipient1.address}`);
    } catch (error) {
        console.error("Error while transferring:", error);
    }

    // Check balances after transfer
    const balanceAfter = await token.balanceOf(owner.address);
    console.log("Owner balance after transfer:", balanceAfter.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
