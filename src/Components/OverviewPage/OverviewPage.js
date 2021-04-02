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
            
            let addedArr = []
            pages.forEach((page,index)=>{
                let newDataPoint
                if(page.data !== undefined){
                    page.data.forEach((d,i)=>{
                        console.log("i",i)
                        let currentPosVal = parseFloat(addedArr[i])
                        console.log("cv")
                        console.log(currentPosVal)
                        if(!isNaN(currentPosVal)){
                            console.log('if')
                            newDataPoint = parseFloat(d.y) + currentPosVal
                        }else{
                            console.log('else')
                            newDataPoint = parseFloat(d.y)
                        }
                        
                        console.log(newDataPoint)
                        addedArr.splice(i,1,newDataPoint)
                        console.log(addedArr)
                    })
                }
            })
            let avgData =[]
            addedArr.forEach((n,i)=>{
                avgData.push({x:i+1,y:n})
            })
            console.log(avgData)
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