import React from 'react';
import './SideNavigation.css';

import HTImage from '../../Images/hayward-tyler-since-2015-logo.png';
import Web from '@material-ui/icons/Web';
import Opacity from '@material-ui/icons/Opacity';
import ChevRight from '@material-ui/icons/ChevronRight';
// this component renders the navigation bar, 
// component requires the following props:
// pages - list of "page" objects, contain info regarding each page that will be listed in the menu
class SideNavigation extends React.Component{
    constructor(props){
        super(props)
        this.renderPages = this.renderPages.bind(this)
        this.handleOpenPageClick = this.handleOpenPageClick.bind(this)
    }
    //handle open click is used to open pages. It calls setActivePage in the App component
    handleOpenPageClick(pageName){
        this.props.setActivePage(pageName)
    }
    
    //get Icon applies the correct Icon to each page depending on the pages icon property
    //accepts "iconType" a string
    getIcon(iconType){
        if(iconType === "web"){
            return <Web />
        }else if(iconType === "pump"){
            return <Opacity />
        }
    }

    // render pages loops through the list of page info and generates the links to each page
    renderPages(){
        console.log(this.props.pages)
        let pageLinks = this.props.pages.map((page,index) => {
            return( 
                <div className = "side-nav-page" onClick = {() => this.handleOpenPageClick(page.name)} key = {index} >
                    <div className = "chev-right">{page.isActive ?<ChevRight />:null}</div>
                    <div className = "side-nav-page-name-and-icon">
                        {this.getIcon(page.icon)}
                        <div className = "side-nav-page-name">{page.name}</div> 
                    </div>
                </div>
            )
        })
        console.log(pageLinks)
        return pageLinks
    }
    
    render(){
        return(
            <div className = "side-nav-main">
                <img src ={HTImage} className = "side-nav-logo"/>
                <div className = "page-list">
                    {this.renderPages()}
                </div>
            </div>
        )
    }
}

export default SideNavigation