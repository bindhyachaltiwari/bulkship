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
            original,
            original$: updateOriginal$,
            actual,
            actual$: updateActual$
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
        const updateOriginal$ = this.commonFunction(e.target.value);
        const { actual, actual$ } = this.state;
        const localObj = {
            original: parseFloat(e.target.value),
            original$: updateOriginal$ ? updateOriginal$ : 0,
            actual,
            actual$
        }
        this.setState({ ...localObj });
        this.props.onOriginalActualChange(localObj);
    }

    getActualValue(e) {
        const updateActual$ = this.commonFunction(e.target.value);
        const { original, original$ } = this.state;
        const localObj = {
            original,
            original$,
            actual: parseFloat(e.target.value),
            actual$: updateActual$
        }

        this.setState({ ...localObj });
        this.props.onOriginalActualChange(localObj);
    }

    render() {
        const { actual$, original$ } = this.state;
        return (
            <>
                <td>
                    <input type='text' required onChange={this.getOriginalValue} autoComplete='off' />
                </td>
                <td>
                    <input type='text' required onChange={this.getActualValue} autoComplete='off' />
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