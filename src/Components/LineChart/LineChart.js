import React, {useEffect, useState} from 'react';
import './LineChart.css';
import {VictoryArea, VictoryClipContainer, VictoryGroup, VictoryScatter, VictoryChart, VictoryZoomContainer, VictoryTooltip, VictoryBrushContainer} from "victory"
import CloseIcon from '@material-ui/icons/Close';

function LineChart(props){

    //chartOpen controls chart size
    const [chartOpen, setChartOpen] = useState(false)
    //zoom domain controls which part of the chart is displayed 
    const [zoomDomain, setZoomDomain] = useState()
    //selectedDomain controls the size of the selection box in the lower chart
    const [selectedDomain, setSelectedDomain] = useState()

    useEffect(()=>{

    },[props.data])
    

    //open or close the chart
    function handleChartClick(operation){
        if(!chartOpen){
            setChartOpen(operation)
        }else if(chartOpen && !operation){
            setChartOpen(operation)
        }
        
    }

    //handles zoom and pan interactions with the chart
    function handleZoom(domain) {
        setSelectedDomain(domain)
    }
    
    //handles drag interactions with lower chart
    function handleBrush(domain) {
       setZoomDomain(domain)
    }


    //set the charts domain to fit the provided data
    function getDomain(){
        if(props.data[0] !== undefined){
            let min = props.data[0]
            let max = props.data[props.data.length-1]
            let yValues = props.data.map((i)=> parseInt(i.y))
            let minX = min.x
            let maxX = max.x  
            let minY = 0
            let biggestY = Math.max(...yValues) 
            let maxY = biggestY + (biggestY*.2)
            return{x:[minX,maxX],y:[minY,maxY]}
        }

    }

    //access the most recent data point to be displayed in the top right corner of the chart
    function getCurrentScore(){
        if(props.data[0] !== undefined){
            return props.data[props.data.length -1].y
        }
    }

    


    return(
        <div className = "line-chart" onClick = {() =>handleChartClick(true)} id = {chartOpen?'open':'closed'}>
            <div className = "chart-title">
                <div className = "chart-title" id = {chartOpen?'cs-open':'cs-closed'}>{props.chartTitle} </div>
                <div className = "current-score" id = {chartOpen?'css-open':'css-closed'}>{getCurrentScore()}</div>
                {chartOpen && <div className = "close-icon" onClick = {() =>handleChartClick(false)}><CloseIcon size = "large" /> </div>}
            </div>
            {/*see Victory docs for info about chart styling*/}
            {!chartOpen?
                <VictoryGroup
                    
                    padding = {{bottom:0,left:0,right:0,top:40}}>
                    <VictoryArea 
                        data={props.data}
                        groupComponent={<VictoryClipContainer clipPadding={{ top: 5, right: 10, bottom:0, top:0 }}/>}
                        style={{ data: { stroke: "#00665D", strokeWidth: 4, strokeLinecap: "round", fill:"#00A493" } }}
                        padding = {{bottom:0,left:0,right:0,top:40}}
                        interpolation="natural"

                    />
                    <VictoryScatter
                        size={({ active }) => active ? 8 : 5}
                        data={props.data}
                        padding = {{bottom:0,left:0,right:0,top:40}}
                    />
                </VictoryGroup> 
            : <div className = "open-chart">
                
                <VictoryChart 
                    containerComponent = {<VictoryZoomContainer  zoomDimension = "x" zoomDomain = {zoomDomain} onZoomDomainChange = {handleZoom}/>}
                    domain={getDomain()}
                    padding = {{bottom:30,left:30,right:30,top:0}}
                >
                    
                    
                    <VictoryArea 
                        data={props.data}
                       
                        style={{ data: { stroke: "#00665D", strokeWidth: 4, strokeLinecap: "round", fill:"#00A493" } }}
                        
                        interpolation="natural"
                        height = {300}
                        
    
                    />
                    <VictoryScatter
                        size={({ active }) => active ? 8 : 5}
                        data={props.data}
                        
                    />
                    
                </VictoryChart>
               

                <VictoryChart
                containerComponent = {<VictoryBrushContainer  brushDimension = "x" brushDomain = {selectedDomain} onBrushDomainChange = {handleBrush} />}
                padding = {{bottom:0,left:0,right:0,top:0}}
                domain = {getDomain()}
                height = {100}
                
                >
                    <VictoryArea 
                       
                        data={props.data}
                        
                        style={{ data: { stroke: "#00665D", strokeWidth: 2, strokeLinecap: "round", fill:"#00A493" } }}
                        padding = {{bottom:0,left:0,right:0,top:0}}
                        interpolation="natural"
        
                    />
                    
                </VictoryChart>

                </div>
            }
            
        </div>
    )

}

export default LineChart