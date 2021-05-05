import React from 'react';
import './PumpPage.css';
import LineChart from "../LineChart/LineChart"
//creates a page with a line chart for the specified pump data
function PumpPage(props){
    
    function createDummyData(data){
        if(data !== undefined){
            let newData = []
            let i = 0 
            for(const d of data){
                let num = d.y
                let rand = getRandomInt((-num)+5,100)
                let newObj = {x:i, y: num + rand}
                newData.push(newObj)
                i++
            }
            return newData
        }
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    
    return(
        <div className = "page-main">
            <div className = "page-header">
                {props.pageInfo.name}
            </div>
            <div className ="page-main-section">
                <div className = "page-column">
                    <LineChart data = {props.pageInfo.data} chartTitle = {"Overall Health"} />
                    <LineChart data = {createDummyData(props.pageInfo.data)} chartTitle = {"X-axis Vibration"} />
                    <LineChart data = {createDummyData(props.pageInfo.data)} chartTitle = {"Y-axis Vibration"} />
                    <LineChart data = {createDummyData(props.pageInfo.data)} chartTitle = {"Z-axis Vibration"} />
                </div>
            </div> 
        </div>
    )
    
}

export default PumpPage