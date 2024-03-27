// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Upload{

    struct Access{
        address user;
        bool access;
    }

    mapping(address=>Access[]) accessList;
    mapping(address=>string[]) value;
    mapping(address=>mapping(address=>bool)) ownership;
    mapping(address=>mapping(address=>bool)) previousData;

    function add(address _user, string calldata url) external{
        value[_user].push(url);
    }

    function allow(address _user) external{
        ownership[msg.sender][_user] = true;
        if(previousData[msg.sender][_user]){
            for(uint i = 0; i < accessList[msg.sender].length; i++){
                if(accessList[msg.sender][i].user == _user){
                    accessList[msg.sender][i].access = true;
                }
            }
        }else{
            accessList[msg.sender].push(Access(_user, true));
            previousData[msg.sender][_user] = true;
        }
    }

    function disallow(address _user) external{
        ownership[msg.sender][_user] = false;

        for(uint i = 0; i < accessList[msg.sender].length; i++){
            if(accessList[msg.sender][i].user == _user){
                accessList[msg.sender][i].access = false;
            }
        }
        //accessList[msg.sender].push(Access(_user, false));
    }

    function display(address user) external view returns(string[] memory){
        require(user == msg.sender || ownership[user][msg.sender], "you do not have access!");
        return value[user];
    }

    function shareAccess() external view returns(Access[] memory){
        return accessList[msg.sender];
    }
}   
