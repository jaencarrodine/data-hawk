import React, {useState, useEffect} from 'react'
import './AuthForm.css'
import bgSVG from '../../Images/light-gray-array-lines.svg'
import htLogo from '../../Images/hayward-tyler-alt-logo.svg'
function AuthForm(props){
    function returnFormInputs(){
        if(props.formState.formType === "signIn"){
            return(

                <div className = "inputs">
                    <div className = "input-name" >E-mail</div>
                    <div className = "input"><input name = "email" placeholder = "Enter your e-mail" autofill = "email" onChange = {props.onChange}></input></div>
                    <div className = "input-name">Password</div>
                    <div className = "input"><input name = "password" placeholder = "Enter your password" type = "password" autofill = "current-password" onChange = {props.onChange}></input></div>
                    <div className = "switch-to-sign-up" onClick ={props.switchToSignUp}>Don't have an account? <span className = "su">Sign up</span></div>
                    <div className = "login-button" onClick = {props.signIn}>Login now</div>
                </div>     
            )
        }else if(props.formState.formType === "signUp"){
            return(
                <div className = "inputs">
                    <div className = "input-name">E-mail</div>
                    <div className = "input"><input name = "email" placeholder = "E-mail" onChange = {props.onChange}></input></div>
                    <div className = "input-name">Password</div>
                    <div className = "input"><input name = "password" type = "password" placeholder ="Password" onChange = {props.onChange}/></div>
                    <div className = 'su' onClick ={props.switchToSignIn}>Sign in</div>
                    <div className = "login-button" onClick = {props.signUp}>Sign up</div>
                </div>     
            )
        }else if(props.formState.formType === "confirmSignUp"){
            return(
                <div className = "inputs">
                    <div className = "input-name" value = {props.formState.authcode}>Authentication code</div>
                    <div className = "input"><input defaultValue = '' name = "authcode" placeholder = "Authentication code" onChange = {props.onChange}></input></div>
                    <div className= "su" onClick = {props.resendConfirmationCode}>Resend Code</div>
                    <div className = "login-button" onClick = {props.confirmSignUp}>Confirm</div>
                </div>     
            )
        }

    }
    return(
        <div className = "auth-background" >
            <div className ="bg-svg" style = {{backgroundImage: `url(${bgSVG})`}}/>

                <img className = "ht-logo" src = {htLogo}/>
                <div className = "auth-main">
                    
                    <div className = "auth-header">
                        <div className = "header-top-text">
                        {props.formState.formType === "signIn"&& "Welcome Back"}
                        {props.formState.formType === 'signUp' && "Welcome"}
                        {props.formState.formType === 'confirmSignUp' && "We sent you the code"}
                        </div>
                        <div className = "header-bottom-text">
                            {props.formState.formType === "signIn"&& "Log into your account"}
                            {props.formState.formType === 'signUp' && "Please create an account"}
                            {props.formState.formType === 'confirmSignUp' && "Please enter it below"}
                            
                        </div>
                    
                    </div>
    <div className = "error-message">{props.errorMessage !== ''? "Error: " +props.errorMessage:null}</div>
                    {returnFormInputs()}
                    
            </div>
        </div>
        
    )
}

export default AuthForm