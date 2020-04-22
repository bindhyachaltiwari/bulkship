import React,{Component} from 'react';

class CheckPerformance extends Component {
    constructor(props) {
        super(props);
        console.log(props.location.state);
    }
    render() {
        return(
            <div>
                Check Performance
            </div>
        )
    }
}
export default CheckPerformance;