import React, { Component } from 'react';
export default class ViewPerformanceModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    render() {
        const { original, actual, actual$, original$ } = this.state.obj;
        return (
            <>
                <td>
                    <input type='text' disabled value={original || 0} />
                </td>
                <td>
                    <input type='text' disabled value={actual || 0} />
                </td>
                <td>
                    <input type='text' disabled value={original$ || 0} />
                </td>
                <td>
                    <input type='text' disabled value={actual$ || 0} />
                </td>
            </>
        )
    }
}