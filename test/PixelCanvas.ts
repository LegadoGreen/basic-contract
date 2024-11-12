import { expect } from "chai";
import hre from "hardhat";

describe("PixelCanvas", function () {
  async function deployPixelCanvasFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    const pixelCanvas = await hre.viem.deployContract("PixelCanvas", []);
    return { pixelCanvas, owner, otherAccount };
  }

  it("Should mint a pixel and set the correct owner and color", async function () {
    const { pixelCanvas, owner } = await deployPixelCanvasFixture();
    const x = 10, y = 20;
    const color = { red: 255, green: 0, blue: 0 };

    await pixelCanvas.write.mintPixel([x, y, color.red, color.green, color.blue]);

    const tokenId = y * 100 + x;
    const pixelData = await pixelCanvas.read.getPixelData([x, y]) as { red: number, green: number, blue: number };
    const pixelOwner = await pixelCanvas.read.ownerOf([tokenId]) as string;

    expect(pixelOwner.toLowerCase()).to.equal(owner.account.address);
    expect(pixelData.red).to.equal(color.red);
    expect(pixelData.green).to.equal(color.green);
    expect(pixelData.blue).to.equal(color.blue);
  });

  it("Should revert if trying to mint an owned pixel", async function () {
    const { pixelCanvas } = await deployPixelCanvasFixture();
    const x = 10, y = 20;

    await pixelCanvas.write.mintPixel([x, y, 255, 0, 0]);

    await expect(pixelCanvas.write.mintPixel([x, y, 0, 255, 0])).to.be.rejectedWith("Pixel already owned");
  });

  it("Should revert if minting a pixel out of bounds", async function () {
    const { pixelCanvas } = await deployPixelCanvasFixture();
    await expect(pixelCanvas.write.mintPixel([200, 200, 255, 0, 0])).to.be.rejectedWith("Pixel out of bounds");
  });
});
