import React from 'react';
import './PumpPage.css';
import LineChart from "../LineChart/LineChart"

function PumpPage(props){
    

    
    return(
        <div className = "page-main">
            <div className = "page-header">
                {props.pageInfo.name}
            </div>
            <div className ="page-main-section">
                <div className = "page-column">
                    <LineChart data = {props.pageInfo.data} chartTitle = {"Overall health"} />
                </div>
            </div> 
        </div>
    )
    
}

export default PumpPage