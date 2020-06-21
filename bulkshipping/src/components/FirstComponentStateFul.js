
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {addItem,getApiActionCal} from '../action/action';

function mapDispatchToProps(dispatch) {
    return {
        addItem: item => {
            dispatch(addItem(item))
        },
        getApiCallData: () => {
            dispatch(getApiActionCal())
        }
    }
}
const mapStatetoProps = (state) => {
    return {
        items:state.items,
        apiData:state.apiData
    };
}

class FirstComponentStateFul extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count:1,
            items : ['bunty','babli'],
            apiData:[]
        }
        this.itemList ='';
        this.incrementCounter = this.incrementCounter.bind(this);
        this.addItemTo = this.addItemTo.bind(this);
        this.addItems=this.addItems.bind(this);
        this.getApiCall =this.getApiCall.bind(this);
    }
    addItemTo(event) {
        this.itemList = event.target.value;
    }
    addItems() {
        this.props.addItem(this.itemList)
    }
    incrementCounter() {
        this.setState({
            count:this.state.count+1
        })
        
    }
    getApiCall() {
        this.props.getApiCallData();
    }
    componentDidUpdate() {
        document.title =`You clicked it ${this.state.count} times`;
    }
    componentDidMount() {
        document.title =`You clicked it ${this.state.count} times`;
    }
    render(){
        return (
            <div>
                <p>you clicked it {this.state.count} times</p>
                <button onClick ={this.incrementCounter}></button>
                <input type="text" onChange={this.addItemTo}/>
                <button onClick={this.addItems}></button>
                <ul>
                {
                    this.props.items.map(item => 
                    <li key={item}>{item}</li> )
                }
                    
                </ul>
                <button onClick={this.getApiCall}>get API call</button>
                <ul>
                {
                    this.props.apiData.map(item => 
                    <li key={item.id}>{item.title}</li> )
                }
                    
                </ul>
            </div>
        )
    }
}
const Form = connect(mapStatetoProps,mapDispatchToProps)(FirstComponentStateFul)
export default Form;