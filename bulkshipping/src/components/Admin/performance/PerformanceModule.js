import React, { Component } from 'react';
export default class PerformanceModule extends Component {
    constructor(props) {
        super(props);
        this.getOriginalValue = this.getOriginalValue.bind(this);
        this.getActualValue = this.getActualValue.bind(this);
        this.state = {
            original: 0,
            actual: 0,
            original$: 0,
            actual$: 0
        }
    }

    updateAndNotify() {
        const { original, actual } = this.state;
        const updateOriginal$ = this.commonFunction(original);
        const updateActual$ = this.commonFunction(actual);
        const localObj = {
            original:original ? original : (this.props.voyageDays?this.props.voyageDays.original : 0),
            original$: updateOriginal$? updateOriginal$ : (this.props.voyageDays?this.props.voyageDays.original$ : 0),
            actual:actual? actual : (this.props.voyageDays? this.props.voyageDays.actual: 0),
            actual$: updateActual$?updateActual$ : (this.props.voyageDays?this.props.voyageDays.actual$ : 0)
        }
        this.setState({ ...localObj });
        
        this.props.onOriginalActualChange(localObj);
    }

    getSnapshotBeforeUpdate(prevProps) {
        return { notifyRequired: (prevProps.tcHire !== this.props.tcHire || prevProps.addressCommission !== this.props.addressCommission) };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot.notifyRequired) {
            this.updateAndNotify();
        }
    }

    commonFunction(e) {
        const { tcHire, addressCommission } = this.props
        if (e && parseFloat(e) >= 0 && tcHire && addressCommission) {
            const muitpleItem = tcHire * parseFloat(e);
            return (muitpleItem - (addressCommission * (muitpleItem / 100)));
        }

        return 0;
    }

    getOriginalValue(e) {
        //if (e.target.value) {
            const value = e.target.value ? e.target.value : 0;
            const updateOriginal$ = this.commonFunction(value);
            const { actual, actual$ } = this.state;
            const localObj = {
                original: parseFloat(value),
                original$: updateOriginal$ ? updateOriginal$ : 0,
                actual,
                actual$
            }
            this.setState({ ...localObj });
            this.props.onOriginalActualChange(localObj);
        //}
        
    }

    getActualValue(e) {
        //if (e.target.value) {
            const value = e.target.value ? e.target.value : 0;
            
            const updateActual$ = this.commonFunction(value);
            const { original, original$ } = this.state;
            const localObj = {
                original,
                original$,
                actual: parseFloat(value),
                actual$: updateActual$
            }

            this.setState({ ...localObj });
            this.props.onOriginalActualChange(localObj);
        //}
        
    }

    render() {
        const { actual$, original$ } = this.state;
        return (
            <>
                <td>
                    <input type='text' required={this.props.required} onChange={this.getOriginalValue} autoComplete='off' value ={this.props.voyageDays? this.props.voyageDays.original: 0}/>
                </td>
                <td>
                    <input type='text' required={this.props.required} onChange={this.getActualValue} autoComplete='off' value ={this.props.voyageDays?this.props.voyageDays.actual : 0}/>
                </td>
                <td>
                    <input type='text' disabled value={original$? original$ : (this.props.voyageDays?this.props.voyageDays.original$ : 0)}/>
                </td>
                <td>
                    <input type='text' disabled value={actual$ ? actual$: (this.props.voyageDays?this.props.voyageDays.actual$ : 0)}/>
                </td>
            </>
        )
    }
}