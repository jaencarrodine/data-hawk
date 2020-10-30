import React from 'react';
import './OverviewPage.css';
import LineChart from "../LineChart/LineChart"

class OverviewPage extends React.Component{
    constructor(props){
        super(props)
        
    }

    render(){
        return(
            <div className = "page-main">
                <div className = "page-header">
                    Overview
                </div>
                <div className ="page-main-section">
                    <div className = "page-column">
                        <LineChart />
                    </div>
                </div> 
            </div>
        )
    }
}

export default OverviewPage