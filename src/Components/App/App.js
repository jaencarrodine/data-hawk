import React, {useState, useEffect} from 'react';
import './App.css';

import SideNavigation from '../SideNavigation/SideNavigation'
import OverviewPage from '../OverviewPage/OverviewPage'
import PumpPage from '../PumpPage/PumpPage'
import AuthForm from '../AuthForm/AuthForm'
import {Auth } from 'aws-amplify'
import AdminPage from '../AdminPage/AdminPage'
import MyAccountPage from '../MyAccountPage/MyAccountPage'
// initialPageState creates default pages
const initialPageState = [
  {
    name:"Overview",
    icon:"web",
    isActive:true,
    pageType:"Overview"
  },
  {
    name:"My Account",
    icon:"web",
    isActive:false,
    pageType:"Account"
  },
  {
    name:"Admin Panel",
    icon:"web",
    isActive:false,
    pageType:"Admin"
  }
  
]

const initialFormState = {
  formType:"signIn",
  password:"",
  email:"",
  authcode:"",
}


//use local host for api in development and heroku api in production
const API = /*"http://localhost:4500/"*/ "https://datahawk-api.herokuapp.com/"

function App(){

  //fromState holds data typed into the auth form
  const [formState, updateFormState] = useState(initialFormState)
  //user holds user data
  const [user, updateUser] = useState(null)
  //user permissions holds permissions retrieved from database
  const [userPermissions, updateUserPermissions] = useState({})
  //error message holds message that is displayed when auth functions fail
  const [errorMessage, setErrorMessage] = useState('')

  //this effect checks if a user is logged  and decides to load data in every time the form state changes
  useEffect(()=>{
    console.log("use effect")
    if(formState.formType !== 'forgotPass'){
      checkUser()
      if(formState.formType === "signedIn"){
        loadData()
      }
    }
    
    setErrorMessage('')
  },[formState])

  //auth related functions
  //check user checks if a user is currently signed in and updates their permissions
  async function checkUser(){
    const user = await  Auth.currentAuthenticatedUser()
    await updateUser(user)
    checkUserPermissions(user)

    if((user !== null && user !== undefined) && formState.formType !== "signedIn"){
      updateFormState(()=>({...formState,formType:"signedIn"}))
    }
  }
  //check user permissions calls the check-permissions path on the API to update user permissions state
  async function checkUserPermissions(user){
    console.log('checking user permissions')
    let sub = user.attributes.sub
    let permissions = await fetch(API+'check-permissions', {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify(
          {
            sub: sub
          }
        )
      }).then(function(response){
        return response.json()
      }).then(function(jsonData){
        return JSON.stringify(jsonData)
      }).then(function(jsonStr){
      return JSON.parse(jsonStr)
    })
    if(permissions.userNotFound){
      await addUserToDb(user)
    }
    updateUserPermissions(permissions)
  }
//onchange function updates form state to match user inputs
  function onChange(e){
    e.persist()
    updateFormState(()=> ({...formState, [e.target.name]: e.target.value}))
  }

  //sign up function creates a new user - check aws amplify auth docs for more info
  async function signUp(){
    const {email, password} = formState
    const username = email
    try{
      const {user} = await Auth.signUp({
        username,
        password,
        attributes:{
          email
        }
      })
      updateUser(user)
      updateFormState(()=> ({...formState, formType:"confirmSignUp"}))
    }catch(e){
      if(e.code === 'UserNotConfirmedException'){
        updateFormState(()=> ({...formState, formType:"confirmSignUp"}))
      }
      console.log('error signing up '+e)
      setErrorMessage(e.message)
      console.log(e)
    }
   
    
  }
  //confirm signup verifies the new user
  async function confirmSignUp(){
    const {email, authcode} = formState
    const username = email
    try{
      await Auth.confirmSignUp(username, authcode)
      updateFormState(()=> ({...formState, formType:"signIn"}))
      
    }catch(e){
      console.log("error confirming signup", e)
      setErrorMessage(e.message)
    }
    
  }

  async function resendConfirmationCode() {
    const {email} = formState
    const username = email
    try{
      await Auth.resendSignUp(username);
      console.log('code resent successfully');
    }catch (err) {
      console.log('error resending code: ', err);
      setErrorMessage(err.message)
    }

  }
  
  async function signIn(){
    const {email, password} = formState
    const username = email
    try {
      const user = await Auth.signIn(username, password);
      updateUser(user)
      checkUserPermissions(user)
      updateFormState(()=>({...formState,formType:"signedIn"}))
    } catch (error) {
      if(error.code === 'UserNotConfirmedException'){
        updateFormState(()=> ({...formState, formType:"confirmSignUp"}))
      }
      console.log('error signing in', error);
      setErrorMessage(error.message)
    }

  }

  async function signOut(){
    try{
      await Auth.signOut()
      updateFormState(()=>({
      password:"",
      email:"",
      authcode:"",
      formType:"signIn"}))
      updateUserPermissions({})
      updateUser({})
      console.log('page data should be cleared')
      
      updatePageState([
        {
          name:"Overview",
          icon:"web",
          isActive:true,
          pageType:"Overview"
        },
        {
          name:"My Account",
          icon:"web",
          isActive:false,
          pageType:"Account"
        },
        {
          name:"Admin Panel",
          icon:"web",
          isActive:false,
          pageType:"Admin"
        }
        
      ])
    }catch(e){
      console.log('error signing out: ', e)
      setErrorMessage(e.message)
    }
    console.log('')
  }

  async function resetPassword(userName){
    console.log('resetting password')
    await Auth.forgotPassword(userName)
    updateFormState(()=>({...formState,formType:"forgotPass"}))
    
  }

  async function submitNewPassword(){
    try{
      await Auth.forgotPasswordSubmit(userPermissions.email, formState.authcode, formState.password)
    }catch(error){
      setErrorMessage(error.message)
    }
  }


  //addUserToDb adds a new default user to the mongodb database
  async function addUserToDb(user){
    let sub = user.attributes.sub
    let email = user.attributes.email
    await fetch(API+'new-user', {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify(
          {
            sub: sub,
            email:email
          }
        )
      }).then(function(response){
        return response.json()
      }).then(function(jsonData){
        return JSON.stringify(jsonData)
      }).then(function(jsonStr){
      return JSON.parse(jsonStr)
    })
  }
  //changes auth form type to signUp
  function switchToSignUp(){
    updateFormState(()=> ({...formState, formType:"signUp"}))
  }
  //changes auth form type to sign in
  function switchToSignIn(){
    updateFormState(()=> ({...formState, formType:"signIn"}))
  }


  //end auth functions






  //pageState holds all data displayed on pahes
  const [pageState, updatePageState] = useState(initialPageState)
  //data sent updates whenever new data is loaded. it is used in some other components useEffect to tell the component to reload when data is updated
  const [dataSent, updateDataSent] = useState(0)
  //data access used to determine if a user as access to any data
  const [dataAccess, updateDataAccess] = useState('')

  //setActive page is called in the side navigation page to change set which page is active and deactivate all other pages
  function setActivePage(pageName){
    console.log("setting active page: "+ pageName)
    let pageList = pageState
    let updatedPageList = pageList.map((page)=>{
      if(page.name === pageName){
        page.isActive = true
      }else{
        page.isActive = false  
      }
      return page
    })
    updatePageState(updatedPageList)
  }
  //load data loads the data a user has access to when the page loads
  async function loadData(){
    try{
      console.log("getting data")
      const user = await  Auth.currentAuthenticatedUser()
      const sub = user.attributes.sub
      
      let datas = await fetch(API+'get-data', {
        method: 'POST',
        headers: 
        {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify(
            {
              sub: sub
            }
          )
        }).then(function(response){
          return response.json()
        }).then(function(jsonData){
          return JSON.stringify(jsonData)
        }).then(function(jsonStr){
        return JSON.parse(jsonStr)
      })
      console.log(datas)
      if(!datas.noDataAccess){
        let currentPageList = pageState
        let currentPageNames = []
        for(const page of currentPageList){
          currentPageNames.push(page.name)
        }
        let newPages = []
        for(const data of datas){
          let pageObj = {
            name: data.name,
            icon:"pump",
            isActive:false,
            pageType:"Pump",
            data:data.data
          }
          newPages.push(pageObj)
        }
    
        for(const page of newPages){
          if(!currentPageNames.includes(page.name)){
            currentPageList.push(page)
          }
        }
        console.log("data loaded, page state updated")
        console.log(currentPageList)
        let d = dataSent +1
        updateDataSent(d)
        updatePageState(currentPageList)
        updateDataAccess(true)
      }else{
        updateDataAccess(false)
      }

    }catch(e){
      console.log(e)
      //clear the loaded data
    }
    

  }


  //render page function opens pages according to the page with isactive === true
  function renderPage(){
    let activePage
    let pageList = pageState
    
    
    pageList.forEach(page=>{
      if(page.isActive){
        activePage = page
      }
    })
    let pagesObj ={
      "Overview":<OverviewPage pageInfo = {activePage} pages = {pageState} API = {API} dataAccess = {dataAccess}/>,
      "Pump":<PumpPage pageInfo = {activePage} API = {API}/>,
      "Admin":<AdminPage API = {API} userPermissions = {userPermissions}/>,
      "Account":<MyAccountPage API = {API} userPermissions = {userPermissions} resetPassword = {resetPassword}/>
    }
    return pagesObj[activePage.pageType]
  }

  const {formType} = formState 
  return (

      
    formType === "signedIn"?(
      <div className = "App">
        <SideNavigation pages = {pageState} setActivePage = {setActivePage} signOut = {signOut} userPermissions = {userPermissions} dataSent = {dataSent} />
        {renderPage()}
      </div>
    ):
    <AuthForm
      onChange = {onChange}
      switchToSignUp ={switchToSignUp}
      switchToSignIn = {switchToSignIn}
      signIn ={signIn}
      signUp ={signUp}
      confirmSignUp ={confirmSignUp}
      resendConfirmationCode ={resendConfirmationCode}
      formState ={formState}
      errorMessage = {errorMessage}
      submitNewPassword = {submitNewPassword}
    />
    
    
  )
  
  
}

export default App;
