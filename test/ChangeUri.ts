import { expect } from "chai";
import hre from "hardhat";

describe("ChangeUri", function () {
  async function deployChangeUriFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    const baseURI = "https://example.com/metadata";
    const changeUri = await hre.viem.deployContract("ChangeUri", [baseURI, owner.account.address]);
    return { changeUri, baseURI, owner, otherAccount };
  }

  it("Should correctly return the URI for a token ID", async function () {
    const { changeUri, baseURI } = await deployChangeUriFixture();
    const tokenId = 1;
    const uri = await changeUri.read.uri([BigInt(tokenId)]);
    expect(uri).to.equal(`${baseURI}/${tokenId}.json`);
  });

  it("Should mint tokens in a batch and increment the token IDs", async function () {
    const { changeUri, owner } = await deployChangeUriFixture();
    const recipient = owner.account.address;
    const mintAmount = 5;

    await changeUri.write.batchMint([recipient, BigInt(mintAmount)]);

    for (let i = 0; i < mintAmount; i++) {
      const balance = await changeUri.read.balanceOf([recipient, i]);
      expect(balance).to.equal(BigInt(1)); // Each token minted has 1 unit
    }

    const currentTokenId = await changeUri.read.currentTokenId();
    expect(currentTokenId).to.equal(BigInt(mintAmount)); // Verify token IDs are incremented
  });

  it("Should allow only the owner to mint tokens", async function () {
    const { changeUri, otherAccount } = await deployChangeUriFixture();
    const recipient = otherAccount.account.address;

    await expect(
      changeUri.write.batchMint([recipient, 1], { account: otherAccount.account })
    ).to.be.rejectedWith(Error);
  });

  it("Should update the base URI", async function () {
    const { changeUri, baseURI } = await deployChangeUriFixture();
    const newBaseURI = "https://newexample.com/metadata";

    await changeUri.write.setBaseURI([newBaseURI]);

    const updatedBaseURI = await changeUri.read.baseURI();
    expect(updatedBaseURI).to.equal(newBaseURI);

    const tokenId = 0;
    const uri = await changeUri.read.uri([BigInt(tokenId)]);
    expect(uri).to.equal(`${newBaseURI}/${tokenId}.json`);
  });

  it("Should reject non-owner attempts to update the base URI", async function () {
    const { changeUri, otherAccount } = await deployChangeUriFixture();
    const newBaseURI = "https://unauthorized.com";

    await expect(
      changeUri.write.setBaseURI([newBaseURI], { account: otherAccount.account })
    ).to.be.rejectedWith(Error);
  });
});
