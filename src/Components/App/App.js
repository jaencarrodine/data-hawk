import React from 'react';
import './App.css';

import SideNavigation from '../SideNavigation/SideNavigation'
import OverviewPage from '../OverviewPage/OverviewPage'
import PumpPage from '../PumpPage/PumpPage'


class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      pages:[
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
    }
    this.setActivePage = this.setActivePage.bind(this)
    this.renderPage = this.renderPage.bind(this)
  }

  //setActive page is called in the side navigation page to change set which page is active and deactivate all othe pages
  setActivePage(pageName){
    let pageList = this.state.pages 
    let updatedPageList = pageList.map((page)=>{
      if(page.name === pageName){
        page.isActive = true
      }else{
        page.isActive = false  
      }
      return page
    })
    this.setState({pages:updatedPageList})
  }


  //render page function opens pages according to the page with isactive === true
  renderPage(){
    let activePage
    this.state.pages.forEach(page=>{
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

  render(){
    return (
      <div className="App">
        
        <SideNavigation pages = {this.state.pages} setActivePage = {this.setActivePage} />
        {this.renderPage()}
      </div>
    )
  }
  
}

export default App;
