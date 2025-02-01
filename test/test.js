const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20_smart_contract", function () {
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("ERC20_smart_contract");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const token = await Token.deploy(1000); // Pass initial supply to the constructor
    await token.deployed();

    return { token, owner, addr1, addr2 };
  }

  it("Deployment should assign total supply to the owner", async function () {
    const { token, owner } = await deployTokenFixture();
    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    const { token, owner, addr1, addr2 } = await deployTokenFixture();
    await token.transfer(addr1.address, 50);
    expect(await token.balanceOf(addr1.address)).to.equal(50);

    await token.connect(addr1).transfer(addr2.address, 50);
    expect(await token.balanceOf(addr2.address)).to.equal(50);
  });

  it("Should emit Transfer events", async function () {
    const { token, owner, addr1 } = await deployTokenFixture();
    await expect(token.transfer(addr1.address, 50))
      .to.emit(token, "Transfer")
      .withArgs(owner.address, addr1.address, 50);
  });

  it("Should retrieve last sender and receiver addresses", async function () {
    const { token, owner, addr1 } = await deployTokenFixture();
    await token.transfer(addr1.address, 50);
    expect(await token.getLastSenderAddress()).to.equal(owner.address);
    expect(await token.getLastReceiverAddress()).to.equal(addr1.address);
  });

  it("Should retrieve last transaction timestamp", async function () {
    const { token, owner, addr1 } = await deployTokenFixture();
    await token.transfer(addr1.address, 50);
    const block = await ethers.provider.getBlock("latest");
    expect(await token.lastTimestamp()).to.equal(block.timestamp);
  });
});