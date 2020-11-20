import React, {useState} from 'react'
import './AdminPage.css'
import {Auth} from 'aws-amplify'
const initialNewCompState = {
    companyId:'',
    adminEmail:'',
}

const initialMessageState = {
    addAdminMessage:'',
    addUserMessage:''
}

function AdminPage(props){
    const [newCompState, updateNewCompState] = useState(initialNewCompState)
    const [messageState, updateMessageState] = useState(initialMessageState)
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

    function onChange(e){
        e.persist()
        updateNewCompState(()=> ({...newCompState, [e.target.name]: e.target.value}))
    }

   


    return(
        <div className = "page-main">
            <div className = "page-header">Admin Panel</div>
            <div className = "page-main-section">
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
            </div>
        </div>
        

    )
}

export default AdminPage