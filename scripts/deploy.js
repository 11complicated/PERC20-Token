async function main( ) {
    const [deployer] = await ethers.getSigners( );
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const weiAmount = (await deployer.provider.getBalance(deployer.address)).toString( );
    
    console.log("Account balance:", (await ethers.formatEther(weiAmount)));
  
    const Token = await ethers.getContractFactory("MyPERC20Token");
    const token = await Token.deploy( );
    await token.waitForDeployment( );
  
    console.log("Token address:", (await token.getAddress( )));
}
  
main( )
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
});