import React, {useState,useEffect} from 'react'
import './MyAccountPage.css'
//chip and button are material UI plugin components see material UI docs for more info
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button'


function MyAccountPage(props){

    //display permissions function is responsible for displaying the granted permissions on the my account page. Info is acquired from user permissions prop
    function displayPermissions(){
        let permissionsList = []
        if(props.userPermissions.superAdmin){
            permissionsList.push(<Chip label = 'Super Admin'/>)
        }
        if(props.userPermissions.companyAdmin){
            permissionsList.push(<Chip label = 'Company Admin'/>)
        }
        //convert data access to array - returns an array of chips with permission info
        return permissionsList
    }
    
    
    //display data access is responsible for displaying the company data a user has access to as well as any specific group data the user may have access to
    function displayDataAccess(){

        let dataAccessList = []
        dataAccessList.push(<Chip label = {props.userPermissions.dataAccess} color="primary"/>)

        let dataGroups = props.userPermissions.dataGroups || []
        dataGroups.forEach((group)=>{
            dataAccessList.push(<Chip label = {group}/>)
        })
        //returns an array of chips with data group access and company data access
        return dataAccessList
    }
        
    
    return(
        <div className = "page-main">
            <div className = "page-header">My Account</div>
            <div className = "page-main-section">
                <div className = 'account-info-section'>
                    
                    <div className = "account-info">Email: {props.userPermissions.email}</div>
                    <div className = "account-info">Permissions: {displayPermissions()}</div>
                    <div className = "account-info">Data Access:{displayDataAccess()}</div>
                    <br/>
                    <br/>
                    <Button variant="contained" size="small" color="primary" onClick = {()=>props.resetPassword(props.userPermissions.email)}>
                        Reset Password
                     </Button>
                </div>
                
                
                
            </div>
        </div>
        

    )
}

export default MyAccountPage