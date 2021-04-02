import React, {useState} from 'react'
import './AdminPage.css'
import {Auth} from 'aws-amplify'
import Chip from '@material-ui/core/Chip';
const initialNewCompState = {
    companyId:'',
    adminEmail:'',
}

const initialMessageState = {
    addAdminMessage:'',
    addUserMessage:''
}

function AdminPage(props){
    // newCompState holds the data that is passed into input fields
    const [newCompState, updateNewCompState] = useState(initialNewCompState)
    // messageState holds error and completion messages
    const [messageState, updateMessageState] = useState(initialMessageState)

    //calls add company admin api function
    async function addCompanyAdmin(){
        const {adminEmail, companyId} = newCompState
        const user = await  Auth.currentAuthenticatedUser()
        const sub = user.attributes.sub
        let response = await fetch(props.API+'add-company-admin', {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify(
                {
                    sub: sub,
                    adminEmail:adminEmail,
                    companyId:companyId
                }
                )
            }).then(function(response){
                return response.json()
            }).then(function(jsonData){
                return JSON.stringify(jsonData)
            }).then(function(jsonStr){
            return JSON.parse(jsonStr)
        })

        updateMessageState(() =>({...messageState, addAdminMessage:response.message}))
   
    }
    //calls add company user API function
    async function addCompanyUser(){
        const {userEmail, compId} = newCompState
        const user = await  Auth.currentAuthenticatedUser()
        const sub = user.attributes.sub
        let response = await fetch(props.API+'add-company-user', {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify(
                {
                    sub: sub,
                    userEmail:userEmail,
                    companyId:compId
                }
                )
            }).then(function(response){
                return response.json()
            }).then(function(jsonData){
                return JSON.stringify(jsonData)
            }).then(function(jsonStr){
            return JSON.parse(jsonStr)
        })

        updateMessageState(() =>({...messageState, addUserMessage:response.message}))
    }
    
    //used to update newCompState when input values are changed
    function onChange(e){
        e.persist()
        updateNewCompState(()=> ({...newCompState, [e.target.name]: e.target.value}))
    }

   


    return(
        <div className = "page-main">
            <div className = "page-header">Admin Panel</div>
            <div className = "page-main-section">
                <div className = "admin-columns">
                    <div className = "admin-container">
                        {props.userPermissions.superAdmin && 
                            <div className= "admin-section">
                                <div className = "section-heading">Add a new company admin</div>
                                <div className = "ip"><input className = "admin-input" name = "companyId" placeholder = "Company ID" onChange = {onChange}></input></div>
                                <div className = "ip"><input className = "admin-input" name = "adminEmail" placeholder = "Admin E-mail address" onChange = {onChange}></input></div>
                                <div className = "submit-button" onClick = {addCompanyAdmin}>Create Admin</div>
                                <div className = "message">{messageState.addAdminMessage}</div>
                            </div>
                        }   

                            <div className= "admin-section">
                                <div className = "section-heading">Add a new user</div>
                                {props.userPermissions.superAdmin && 
                                    <div className = "ip"><input className = "admin-input" name = "compId" placeholder = "Company ID" onChange = {onChange}></input></div>
                                }
                                <div className = "ip"><input className = "admin-input" name = "userEmail" placeholder = "User E-mail address" onChange = {onChange}></input></div>
                                <div className = "submit-button" onClick = {addCompanyUser}>Add User</div>
                                <div className = "message">{messageState.addUserMessage}</div>
                            </div>
                    </div>

                    <div className = "admin-container">
                        <div className= "admin-section">
                            <div className = "section-heading">Grant Data Access</div>
                            <div className = "ip"><input className = "admin-input" name = "userEmail" placeholder = "User E-mail address" onChange = {onChange}></input></div>

                            {/*<Chip label={dataName} onDelete={handleDelete} color="primary" variant="outlined" />*/}
                            <div className = "submit-button" onClick = {addCompanyUser}>Grant Access</div>
                            <div className = "message">{messageState.addUserMessage}</div>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
        

    )
}

export default AdminPage