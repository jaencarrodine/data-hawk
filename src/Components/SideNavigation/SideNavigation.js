import React, {useEffect, useState} from 'react';
import './SideNavigation.css';

import HTImage from '../../Images/hayward-tyler-since-2015-logo.png';
import Web from '@material-ui/icons/Web';
import Opacity from '@material-ui/icons/Opacity';
import ChevRight from '@material-ui/icons/ChevronRight';
import LogOut from '@material-ui/icons/ExitToApp';
import Account from '@material-ui/icons/AccountBox';
import Admin from '@material-ui/icons/SupervisorAccount';
// this component renders the navigation bar, 
// component requires the following props:
// pages - list of "page" objects, contain info regarding each page that will be listed in the menu
function SideNavigation(props){

    const [pageState, updatePageState] = useState([])
    useEffect(()=>{
        console.log('setting pages')
        setPages()
    },[props.dataSent,props.pages])
    
    //handle open click is used to open pages. It calls setActivePage in the App component
    function handleOpenPageClick(pageName){
        props.setActivePage(pageName)
    }
    
    
    
    //get Icon applies the correct Icon to each page depending on the pages icon property
    //accepts "iconType" a string
    function getIcon(iconType){
        if(iconType === "web"){
            return <Web />
        }else if(iconType === "pump"){
            return <Opacity />
        }
    }

    // render pages loops through the list of page info and generates the links to each page
    function setPages(){
        let pages = props.pages.map((page,index)=>{
            if(page.pageType !== "Account" && page.pageType !== "Admin"){
                return( 
                    <div className = "side-nav-page" onClick = {() => handleOpenPageClick(page.name)} key = {index} >
                        <div className = "chev-right">{page.isActive ?<ChevRight />:null}</div>
                        <div className = "side-nav-page-name-and-icon">
                            {getIcon(page.icon)}
                            <div className = "side-nav-page-name">{page.name}</div> 
                        </div>
                    </div>
                )
            }
        })
        updatePageState(pages)
    }
    
    
    return(
        
        <div className = "side-nav-main">
            {console.log("rendered")}
            {console.log(pageState)}
            <img src ={HTImage} className = "side-nav-logo"/>
            <div className = "page-list">
                {pageState}
            </div>
            <div className = "bottom-buttons" onClick = {() =>handleOpenPageClick("My Account")}><Account color = "action"/>My account</div>
            {props.userPermissions.superAdmin || props.userPermissions.companyAdmin?<div className = "bottom-buttons" onClick = {() =>handleOpenPageClick("Admin Panel")}><Admin color = "action"/>Admin Panel</div>:null}
            <div className = "bottom-buttons" onClick = {props.signOut}><LogOut color = "action"/>Sign out</div>
        </div>
        )
    
}

export default SideNavigation