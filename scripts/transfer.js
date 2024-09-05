require("dotenv").config( );
const { encryptDataField } = require('@swisstronik/utils')


//sendShieldedTransaction from swisstronik documentation
const sendShieldedTransaction = async (signer, destination, data, value) => {
    const [encryptedData] = await encryptDataField(
        process.env.URL,
        data,
    );

    return await signer.sendTransaction({
        from: signer.address,
        to: destination,
        data: encryptedData,
        value,
    })
}


async function main() {
    const [signer] = await ethers.getSigners( );
    console.log("Contract deployer address:", signer.address);

    // Address of the deployed contract
    const tokenAddress = "0x38Cdf2cfD02d914B68a10Fc7BA47E02C100bfA3D";
  
    // Create a contract instance
    const contractFactory = await ethers.getContractFactory("MyPERC20Token");
    const Token = contractFactory.attach(tokenAddress);

    //Address given in the swisstronik ERC20 task
    const recipientAddress = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1";
  
    //On EVM: const tx = await Token.transfer(recipientAddress, 1); //send 1 unit of MPT.
    const tx = await sendShieldedTransaction(signer, tokenAddress, Token.interface.encodeFunctionData("transfer", [recipientAddress, ethers.parseEther("1")]), 0);
  
    // It should return a TransactionReceipt object
    console.log("Transaction hash ", tx.hash);
  }
  
  // Using async/await pattern to handle errors properly
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });