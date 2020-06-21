import React from 'react';
import { connect } from 'react-redux';
import actionTypes from '../../../store/actions/constants';
import './style.scss';

class Overlay extends React.Component {

    closeOverlay = (e) => {
        e.stopPropagation();
        const targetEle = e.target;
        if (targetEle.classList.contains('overlay')) {
            const { setOverlay, callback } = this.props;
            setOverlay('');
            if (callback) {
                callback();
            }
        }
    }

    render() {
        const { extraClass, closeBtn } = this.props;
        return (
            <div className={`overlay ${extraClass}`} onClick={this.closeOverlay}>
                {closeBtn && <span className='close-btn' onClick={this.closeOverlay}></span>}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { ui } = state;
    return {
        ui
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveTab: (data) => { dispatch({ type: actionTypes.SET_ACTIVE_TAB, data }) },
        setOverlay: (data) => { dispatch({ type: actionTypes.SET_OVERLAY, data }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);