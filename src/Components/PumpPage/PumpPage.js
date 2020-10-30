import React from 'react';
import './PumpPage.css';


class PumpPage extends React.Component{
    constructor(props){
        super(props)
        
    }

    render(){
        return(
            <div className = "pump-page-main">
                <div className = "pump-page-header">
                    {this.props.pageInfo.name}
                </div>
            </div>
        )
    }
}

export default PumpPage