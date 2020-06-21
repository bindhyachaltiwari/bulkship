import React from 'react';
import Calendar from './../calendar';
import api from './../../../api';

import './style.scss';

class RightMenu extends React.Component {
    constructor(){
        super();
        this.state = {
            currentMonthHolidays: {},
            holidayShow: false
        }
        this.onChange = this.onChange.bind(this);
        this.onBtnClickHandler = this.onBtnClickHandler.bind(this);
    }

/*     componentDidMount(){
        api.fetchEvents(1).then((resp) => {
            console.log('fetch events: ', resp);
        })
    } */
    
    onChange = (arg) => {
        this.setState({currentMonthHolidays: arg});
    };

    onBtnClickHandler = (e) => {
        if(e.target.dataset.btntype === 'holiday') {
            const { holidayShow } = this.state;
            this.setState({holidayShow: !holidayShow});
        }
    }

    render() {
        const { currentMonthHolidays, holidayShow } = this.state;
        
        const days = currentMonthHolidays && currentMonthHolidays.holidays ? Object.keys(currentMonthHolidays.holidays) : [];
        return (
            <>
            <Calendar
                onChange={this.onChange}
                value={this.state.date}
            />
            <div className='upcoming-info'>
                    <div className='holiday-info'>
                        <div><span className='holiday-color holiday-applied'>color</span>Leave Applied</div>
                        <div><span className='holiday-color holiday-public'>color</span>Public Holiday</div>
                    </div>
                    {/* <div className='events'>
                        <h5 className='heading'>Upcoming Events</h5>
                        <span>Rangoli Competetion : 31 March</span>
                    </div> */}
            </div>
            </>
        )
    }
}

export default RightMenu;