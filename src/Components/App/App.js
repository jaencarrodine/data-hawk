import React, {useState, useEffect} from 'react';
import './App.css';

import SideNavigation from '../SideNavigation/SideNavigation'
import OverviewPage from '../OverviewPage/OverviewPage'
import PumpPage from '../PumpPage/PumpPage'
import AuthForm from '../AuthForm/AuthForm'
import {Auth, Hub } from 'aws-amplify'


const initialPageState = [
  {
    name:"Overview",
    icon:"web",
    isActive:true,
    pageType:"Overview"
  },
  {
    name:"Pump 1",
    icon:"pump",
    isActive:false,
    pageType:"Pump"
  },
  {
    name:"Pump 2",
    icon:"pump",
    isActive:false,
    pageType:"Pump"
  },
  {
    name:"Pump 3",
    icon:"pump",
    isActive:false,
    pageType:"Pump"
  },
  {
    name:"Pump 4",
    icon:"pump",
    isActive:false,
    pageType:"Pump"
  }
]

const initialFormState = {
  formType:"signIn",
  userName:"",
  password:"",
  email:"",
  authCode:"",
}


function App(){
  //auth functions
  const [formState, updateFormState] = useState(initialFormState)
  const [user, updateUser] = useState(null)
  //onchange function updates form state to match user inputs
  useEffect(()=>{
    checkUser()
  },[])

  async function checkUser(){
    const user = await  Auth.currentAuthenticatedUser()
    updateUser(user)
    if(user !== null && user !== undefined){
      updateFormState(()=>({...formState,formType:"signedIn"}))
    }
  }
  function onChange(e){
    e.persist()
    updateFormState(()=> ({...formState, [e.target.name]: e.target.value}))
  }
  async function signUp(){
    const {username, email, password} = formState
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
      console.log('error signing up '+e)
    }
   
    
  }

  async function confirmSignUp(){
    const {username, authcode} = formState
    try{
      await Auth.confirmSignUp(username, authcode)
      updateFormState(()=> ({...formState, formType:"signIn"}))
    }catch(e){
      console.log("error confirming signup", e)
    }
    
  }

  async function resendConfirmationCode() {
    const {username} = formState
    try{
      await Auth.resendSignUp(username);
      console.log('code resent successfully');
    }catch (err) {
      console.log('error resending code: ', err);
    }

  }

  async function signIn(){
    const {username, password} = formState
    try {
      const user = await Auth.signIn(username, password);
      updateUser(user)
      updateFormState(()=>({...formState,formType:"signedIn"}))
    } catch (error) {
      console.log('error signing in', error);
    }

  }

  function switchToSignUp(){
    updateFormState(()=> ({...formState, formType:"signUp"}))
  }





  const [pageState, updatePageState] = useState(initialPageState)
  //setActive page is called in the side navigation page to change set which page is active and deactivate all other pages
  function setActivePage(pageName){
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


  //render page function opens pages according to the page with isactive === true
  function renderPage(){
    let activePage
    let pageList = pageState
    console.log(pageList)
    pageList.forEach(page=>{
      if(page.isActive){
        activePage = page
      }
    })
    let pagesObj ={
      "Overview":<OverviewPage pageInfo = {activePage} />,
      "Pump":<PumpPage pageInfo = {activePage} />
    }
    return pagesObj[activePage.pageType]
  }

  const {formType} = formState 
  return (
    <div className="App">
      {
        formType === "signedIn"?(
          <div>
            <SideNavigation pages = {pageState} setActivePage = {setActivePage} />
            {renderPage()}
          </div>
        ):
        <AuthForm
          onChange = {onChange}
          switchToSignUp ={switchToSignUp}
          signIn ={signIn}
          signUp ={signUp}
          confirmSignUp ={confirmSignUp}
          resendConfirmationCode ={resendConfirmationCode}
          formState ={formState}
        />
      }
    </div>
  )
  
  
}

export default App;
