import React,{Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
class AddRightsToManager extends Component {
    constructor(props) {
        super(props);
        this.state = { managerList:[],adminList:[] };
        this.getAllManager();
        this.handleBackButton = this.handleBackButton.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.addRemoveAdminRight = this.addRemoveAdminRight.bind(this);
    }
    getAllManager = async () => {
        await axios.post('/userDetails/getAllManager', {
            headers: { 'Content-Type': 'application/json' },
        }).then(res => {
            if (res.data.status) {
                this.setState({
                    managerList: res.data.managerList,
                    error: false,
                });
            } else {
                this.setState({ error: true });
                return;
            }
        });
    }
    handleBackButton() {
        this.props.history.goBack();
      }
      handleChecked(event) {
        if(event.currentTarget.checked) {
            this.setState({ adminList: [...this.state.adminList, event.currentTarget.name] }) 
            //this.setState({ adminList: this.state.adminList.concat(event.currentTarget.name) })
        }
        else {
            let array = [...this.state.adminList]; // make a separate copy of the array
            let index = array.indexOf(event.currentTarget.name)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({adminList: array});
            }
        }
        console.log(this.state.adminList);
      }
      async addRemoveAdminRight() {
        // await axios.post('http://localhost:3003/userDetails/addRightsValue', {
        //     headers: { 'Content-Type': 'application/json' },
        //     data: {
        //         this.state.adminList
        //       }
        // }).then(res => {
        //     if (res.data.status) {
        //         this.setState({
        //             managerList: res.data.managerList,
        //             error: false,
        //         });
        //     } else {
        //         this.setState({ error: true });
        //         return;
        //     }
        // });
        
        let adminList = this.state.adminList;
        console.log(adminList);
        let data = (await axios.post('http://localhost:3003/userDetails/addRightsValue', {
            headers: { 'Content-Type': 'application/json' },
            data: {
                adminList
            }
            }));
            if (data.status) {
                console.log('done');
            }

      }
    render() {
        return(
            
            <div className="about_us_2 about_us_2_animated">
            <Button variant="contained" color="primary" onClick={this.handleBackButton} style={{ top: "4%", left: "10%", position: "fixed" }}>
            Back
            </Button>
            <h2>Edit Manager Role</h2>
                <ul> 
                {this.state.managerList.length ? (this.state.managerList.map((item, key) =>
    <li key={item}><input type="checkbox" name={item} onChange={ this.handleChecked }/>
    <label for={item}> {item}</label></li>
                )):(
                    <div>no manager present</div>
                )}
                
                </ul>
                <Button onClick = {this.addRemoveAdminRight}
            type="submit"
            variant="raised"
            color="primary"
            style={{ margin: '16px' }}>
            {'Submit'}
          </Button>
            </div>
        )
    }
}
export default AddRightsToManager