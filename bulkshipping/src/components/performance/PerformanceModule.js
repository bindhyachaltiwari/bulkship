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
        const { original, actual } = this.props && this.props.voyageDays && Object.keys(this.props.voyageDays) .length ? this.props.voyageDays : this.state;
        const updateOriginal$ = this.commonFunction(original);
        const updateActual$ = this.commonFunction(actual);
        const localObj = {
            original: original ? original : (this.props.voyageDays ? this.props.voyageDays.original : 0),
            original$: updateOriginal$ ? updateOriginal$ : (this.props.voyageDays ? this.props.voyageDays.original$ : 0),
            actual: actual ? actual : (this.props.voyageDays ? this.props.voyageDays.actual : 0),
            actual$: updateActual$ ? updateActual$ : (this.props.voyageDays ? this.props.voyageDays.actual$ : 0)
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
        let { tcHire, addressCommission } = this.props
        const value = parseFloat(e);
        tcHire = parseFloat(tcHire);
        addressCommission = parseFloat(addressCommission);
        if (value >= 0 && tcHire >= 0 && addressCommission >= 0) {
            const muitpleItem = tcHire * value;
            return (muitpleItem - (addressCommission * (muitpleItem / 100))).toFixed(2);
        }

        return 0;
    }

    getOriginalValue(e) {
        const value = e.target.value ? e.target.value : 0;
        const updateOriginal$ = this.commonFunction(value);
        const { actual, actual$ } = this.state;
        const localObj = {
            original: this.getValue(value),
            original$: updateOriginal$ ? updateOriginal$ : 0,
            actual,
            actual$
        }
        this.setState({ ...localObj });
        this.props.onOriginalActualChange(localObj);
    }

    getActualValue(e) {
        const value = e.target.value ? e.target.value : 0;
        const updateActual$ = this.commonFunction(value);
        const { original, original$ } = this.state;
        const localObj = {
            original,
            original$,
            actual: this.getValue(value),
            actual$: updateActual$
        }

        this.setState({ ...localObj });
        this.props.onOriginalActualChange(localObj);
    }

    getValue(value) {
        if (!value) return 0;
        if (value[value.length - 1] === '.') return value;
        if (value.slice(-2) === '.0') return value;
        let v = parseFloat(value);
        return v ? v : 0;
    }

    render() {
        const { actual$, original$ } = this.state;
        return (
            <>
                <td className='table-performance-td-th'>
                    <input className='table-performance-input' type='text' required={this.props.required} maxLength='10' disabled={this.props.disabled} onChange={this.getOriginalValue} autoComplete='off' value={this.props.voyageDays ? this.props.voyageDays.original : 0} />
                </td>
                <td className='table-performance-td-th'>
                    <input className='table-performance-input' type='text' required={this.props.required} maxLength='10' disabled={this.props.disabled} onChange={this.getActualValue} autoComplete='off' value={this.props.voyageDays ? this.props.voyageDays.actual : 0} />
                </td>
                <td className='table-performance-td-th'>
                    <input className='table-performance-input' type='text' disabled value={original$ ? original$ : (this.props.voyageDays ? this.props.voyageDays.original$ : 0)} />
                </td>
                <td className='table-performance-td-th'>
                    <input className='table-performance-input' type='text' disabled value={actual$ ? actual$ : (this.props.voyageDays ? this.props.voyageDays.actual$ : 0)} />
                </td>
            </>
        )
    }
}