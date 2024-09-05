// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./PERC20.sol";


contract MyPERC20Token is PERC20 {
    constructor( ) PERC20("MyPERC20Token", "MPT") { }

    receive() external payable {
        _mint(_msgSender(), msg.value);
    }

    function balanceOf(address account) public view override returns (uint256) {
        
        require(msg.sender == account, "MyPERC20Token: msg.sender != account");
        return _balances[account];
    }

    function allowance(address owner, address spender) public view virtual override returns (uint256) {
    
        require(msg.sender == spender, "MyPERC20Token: msg.sender != account");
        return _allowances[owner][spender];
    }

    function mint() public {
        _mint(msg.sender, 100*10**18);
    }
}