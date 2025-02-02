const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20SmartContract", function () {
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("ERC20SmartContract");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const token = await Token.deploy(1000, owner.address);
    await token.deployed();

    return { token, owner, addr1, addr2 };
  }

  it("Deployment should assign total supply to the owner", async function () {
    const { token, owner } = await deployTokenFixture();
    expect(await token.balanceOf(owner.address)).to.equal(await token.totalSupply());
  });

  it("Should transfer tokens between accounts", async function () {
    const { token, owner, addr1, addr2 } = await deployTokenFixture();
    
    await expect(token.transfer(addr1.address, 50))
      .to.emit(token, "Transfer")
      .withArgs(owner.address, addr1.address, 50);
    
    expect(await token.balanceOf(addr1.address)).to.equal(50);

    await expect(token.connect(addr1).transfer(addr2.address, 50))
      .to.emit(token, "Transfer")
      .withArgs(addr1.address, addr2.address, 50);
    
    expect(await token.balanceOf(addr2.address)).to.equal(50);
  });

  it("Should update last sender and receiver correctly", async function () {
    const { token, owner, addr1 } = await deployTokenFixture();

    await token.transfer(addr1.address, 50);
    expect(await token.getLastSenderAddress()).to.equal(owner.address);
    expect(await token.getLastReceiverAddress()).to.equal(addr1.address);
  });

  it("Should update last transaction timestamp", async function () {
    const { token, owner, addr1 } = await deployTokenFixture();

    await token.transfer(addr1.address, 50);
    const block = await ethers.provider.getBlock("latest");
    expect(await token.getLastTransactionTimestamp()).to.equal(block.timestamp);
  });

  it("Should emit TransactionTracked event", async function () {
    const { token, owner, addr1 } = await deployTokenFixture();

    await expect(token.transfer(addr1.address, 50))
      .to.emit(token, "TransactionTracked")
      .withArgs(owner.address, addr1.address, await token.getLastTransactionTimestamp());
  });

  it("Should not update state variables if transfer fails", async function () {
    const { token, owner, addr1 } = await deployTokenFixture();

    const prevSender = await token.getLastSenderAddress();
    const prevReceiver = await token.getLastReceiverAddress();
    const prevTimestamp = await token.getLastTransactionTimestamp();

    await expect(token.connect(addr1).transfer(owner.address, 1000)).to.be.reverted;

    expect(await token.getLastSenderAddress()).to.equal(prevSender);
    expect(await token.getLastReceiverAddress()).to.equal(prevReceiver);
    expect(await token.getLastTransactionTimestamp()).to.equal(prevTimestamp);
  });
});