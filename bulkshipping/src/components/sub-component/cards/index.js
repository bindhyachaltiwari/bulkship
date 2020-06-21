
import React from 'react';
import './style.scss';

const createList = (props) => {
    
    const { extraClass, list } = props.details;
    const listItem = [];
    list && list.length > 0 && list.forEach((item, index) => {
        listItem.push(<li className={`${extraClass}-item`} key={`${extraClass}_${index}`}>{item}</li>);
    });

    return (
        <ul className={`${extraClass}-list`}>
            {listItem}
        </ul>
    )

}

const createBox = (props) => {
    const { extraClass, data } = props.details;
    const resp = data && data.length > 0 && data.map((item, index) => {
        return (
            <div className={`custom-card ${extraClass}`} key={`${extraClass}_${index}`}>
                <label className='title'>{item.name}</label>
                <span className='value'>{item.value}</span>
            </div>
        )
    });

    return resp;
}

const Card = (props) => {
    const { heading, extraClass, headerThemeClass, list } = props.details;
    return (
        <div className={`custom-card-wrapper ${extraClass}-wrapper`}>
            <div className={`heading-wrapper ${headerThemeClass}`}>
                <h5 className='heading-5'>{heading}</h5>
            </div>
            {list && list.length > 0 ? createList(props) : createBox(props)}
        </div>

    )
}

export default Card;