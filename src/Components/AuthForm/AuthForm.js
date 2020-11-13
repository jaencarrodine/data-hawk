import React, {useState, useEffect} from 'react'



function AuthForm(props){
    function returnFormInputs(){
        if(props.formState.formType === "signIn"){
            return(
                <div className = "inputs">
                    <input name = "username" placeholder = "Enter your e-mail or username" onChange = {props.onChange}></input>
                    <input name = "password" placeholder = "Enter your password" onChange = {props.onChange}></input>
                    <div className = "switch-to-sign-up" onClick ={props.switchToSignUp}>Sign up</div>
                    <div className = "login-button" onClick = {props.signIn}>Login now</div>
                </div>     
            )
        }else if(props.formState.formType === "signUp"){
            return(
                <div className = "inputs">
                    <input name = "username" placeholder = "Username" onChange = {props.onChange}></input>
                    <input name = "email" placeholder = "E-mail" onChange = {props.onChange}></input>
                    <input name = "password" type = "password" placeholder ="Password" onChange = {props.onChange}/>
                    <div className = "login-button" onClick = {props.signUp}>Sign up</div>
                </div>     
            )
        }else if(props.formState.formType === "confirmSignUp"){
            return(
                <div className = "inputs">
                    <input name = "authcode" placeholder = "Authentication code" onChange = {props.onChange}></input>
                    <div className= "resend-code" onClick = {props.resendConfirmationCode}>Resend Code</div>
                    <div className = "login-button" onClick = {props.confirmSignUp}>Confirm</div>
                </div>     
            )
        }

    }
    return(
       
        <div className = "auth-main">
             
            <div className = "auth-header">
                <div className = "header-top-text">
                {props.formState.formType === "signIn"?"Welcome Back":"Welcome"}
                </div>
                <div className = "header-bottom-text">
                    {props.formState.formType === "Log into your account"?"Welcome":"Please create an account"}
                </div>
                {returnFormInputs()}
                
            </div>
            
        </div>
    )
}

export default AuthForm