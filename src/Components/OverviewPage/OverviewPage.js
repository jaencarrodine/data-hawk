import React from 'react';
import './OverviewPage.css';


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
            </div>
        )
    }
}

export default OverviewPage