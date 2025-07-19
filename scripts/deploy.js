const fs = require("fs");
const path = require("path");

async function main() {
  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy();
  await lock.waitForDeployment();

  console.log(`Contract deployed to: ${lock.target}`);

  // ✅ Save ABI and address
  const contractData = {
    address: lock.target,
    abi: JSON.parse(fs.readFileSync("./artifacts/contracts/Lock.sol/Lock.json")).abi,
  };

  const frontendDir = path.join(__dirname, "../frontend/src");
  fs.writeFileSync(
    path.join(frontendDir, "Lock.json"),
    JSON.stringify(contractData, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});