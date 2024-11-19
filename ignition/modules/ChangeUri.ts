import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ChangeUriModule = buildModule("ChangeUriModule", (m) => {
  const changeUri = m.contract("ChangeUri", []);
  console.log('is ere')
  return { changeUri };
});

export default ChangeUriModule;
