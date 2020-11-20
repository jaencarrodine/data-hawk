import React, {useEffect} from 'react';
import './LineChart.css';
import {VictoryArea, VictoryClipContainer, VictoryGroup, VictoryScatter} from "victory"

function LineChart(props){
    
    useEffect(()=>{

    },[props.data])
   
    return(
        <div className = "line-chart">
            <div className = "chart-title">
                {props.chartTitle}
            </div>
            {/*see Victory docs for info about chart styling*/}
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
            
        </div>
    )

}

export default LineChart