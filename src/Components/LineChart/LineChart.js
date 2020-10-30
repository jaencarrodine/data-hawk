import React from 'react';
import './LineChart.css';
import {VictoryArea, VictoryClipContainer, VictoryGroup, VictoryScatter} from "victory"

class PumpPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            sampleData: [
                { x: 1, y: 2},
                { x: 2, y: 3},
                { x: 3, y: 5},
                { x: 4, y: 4},
                { x: 5, y: 6}
              ]
            
        }
        
    }

    render(){
        return(
            <div className = "line-chart">
                <div className = "chart-title">
                    Chart title
                </div>
                {/*see Victory docs for info about chart styling*/}
                <VictoryGroup
                    padding = {{bottom:0,left:0,right:0,top:40}}>
                    <VictoryArea 
                        data={this.state.sampleData}
                        groupComponent={<VictoryClipContainer clipPadding={{ top: 5, right: 10 }}/>}
                        style={{ data: { stroke: "#00665D", strokeWidth: 4, strokeLinecap: "round", fill:"#00A493" } }}
                        padding = {{bottom:0,left:0,right:0,top:40}}
                        interpolation="natural"

                    />
                    <VictoryScatter
                        size={({ active }) => active ? 8 : 5}
                        data={this.state.sampleData}
                        padding = {{bottom:0,left:0,right:0,top:40}}
                    />
                </VictoryGroup> 
                
            </div>
        )
    }
}

export default PumpPage