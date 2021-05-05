import React,{useState, useEffect} from 'react';
import './OverviewPage.css';
import LineChart from "../LineChart/LineChart"

function OverviewPage(props){
    /*const [dataState, updateDataState] = useState('')

    useEffect(()=>{
        getAvgData()
    },[props.pages])
    */

    //parses data in all charts and converts it to an average to be displayed in overview chart
    function getAvgData(){
        let pages = props.pages
        let dataCount = 0
        if(pages !== undefined){
            dataCount ++
            
            let totalsObj = {}
            let numPages = 0
            pages.forEach((page,index)=>{
                let newDataPoint
                if(page.data !== undefined){
                    page.data.forEach((d,i)=>{
                        if(totalsObj['data_'+i] === undefined){
                            totalsObj['data_'+i] = d.y
                        }else{
                            let currentDataPoint = totalsObj['data_'+i]
                            totalsObj['data_'+i] = currentDataPoint + d.y
                        }
                    })
                    numPages ++
                }
            })
            let avgData =[]
            
            console.log(totalsObj)
            let j = 0
            for(const dataPoint in totalsObj){
                let y = totalsObj[dataPoint] /  numPages
                avgData.push({x:j, y:y})
                j++
            }
            return(avgData)
        }
        
    }
    //creates a chart for each pump
    function renderPumpCharts(){
        let pumpPages = props.pages.filter((page)=>{
            if(page.pageType === "Pump"){
                return page
            }
        })

        let charts =  pumpPages.map((page)=>{
            return <LineChart chartTitle = {page.name +" Health"} data = {page.data} />
        })
        return charts
    }

   
    return(

        <div className = "page-main">
            
            <div className = "page-header">
                Overview
            </div>
            <div className ="page-main-section">
                {props.dataAccess !== false?
                        <div className = "page-column">
                            <LineChart chartTitle = {"System Health"} data = {getAvgData()}/>
                            {renderPumpCharts()}
                        </div>:
                    
                    <div className = "no-data-access">Looks like you don't have access to any data. Please contact your company's admin to request access.</div> 
                }               
                
            </div> 
        </div>
    )
    
}

export default OverviewPage