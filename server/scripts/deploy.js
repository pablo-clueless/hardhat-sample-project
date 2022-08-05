const hre = require("hardhat")

const main = async() => {
  const [owner] = await hre.ethers.getSigners()
  const BankContractFactory = await hre.ethers.getContractFactory("Bank")
  const BankContract = await BankContractFactory.deploy()
  await BankContract.deployed()

  console.log("BankContract deployed to:", BankContract.address)
  console.log("BankContract owner address:", owner.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
