import React from 'react';
import './PumpPage.css';


class PumpPage extends React.Component{
    constructor(props){
        super(props)
        
    }

    render(){
        return(
            <div className = "page-main">
                <div className = "page-header">
                    {this.props.pageInfo.name}
                </div>
            </div>
        )
    }
}

export default PumpPage