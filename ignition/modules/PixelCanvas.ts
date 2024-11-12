import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PixelCanvasModule = buildModule("PixelCanvasModule", (m) => {
  const pixelCanvas = m.contract("PixelCanvas", []);
  console.log('is ere')
  return { pixelCanvas };
});

export default PixelCanvasModule;
