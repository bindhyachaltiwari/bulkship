import React from 'react';
import { MenuItem } from '@material-ui/core';

class MiscUtils {
    schoolDetails = {};
    classList = [];
    studentList = [];
    schoolId = '';
    getOptions(options) {
        let value = [];
        if (Array.isArray(options)) {
            for (let j = 0; j < options.length; j++) {
                if (typeof options[j] === 'object' && options[j] !== null) {
                    value.push(<MenuItem value={options[j].studentName} key={options[j].studentId} data-id={options[j].studentId}>{options[j].studentName}</MenuItem>)
                }
                else {
                    value.push(<MenuItem value={options[j]} key={options[j]}>{options[j]}</MenuItem>)
                }

            }
        } else {
            for (let j = 1; j <= options; j++) {
                value.push(<MenuItem value={j} key={j}>{j}</MenuItem>)
            }
        }
        return value;
    }

    isFieldValid(validationtype, value, validity, id) {
        if (validationtype === 'password') {
            validationtype = validationtype + '*';
        }
        if (validationtype.endsWith('*')) {
            validationtype = (!value || !value.length) ? 'required' : validationtype.slice(0, -1);
        }
        let regex = '';
        let vld = true;

        if (value || validationtype === 'required') {
            switch (validationtype) {
                case 'onlyAlphabets':
                    regex = /^[a-zA-Z ]*$/;
                    vld = regex.test(value)
                    break;
                case 'required':
                    vld = value && value.length ? true : false;
                    break
                case 'aplhaNumeric':
                    regex = /^[a-zA-Z0-9 ]*$/;
                    vld = regex.test(value);
                    break
                case 'numeric':
                    regex = /^[0-9 ]*$/;
                    vld = regex.test(value);
                    break;
                case 'decimal':
                    regex = /^[0-9]+(\.[0-9]{1,2})?$/;
                    vld = regex.test(value);
                    break;
                case 'mobile':
                    regex = /^[0-9 ]*$/;
                    if (!regex.test(value)) {
                        vld = false;
                        validationtype = 'numeric';
                    } else if (value.length < 10) {
                        vld = false;
                        validationtype = 'mobileLength';
                    }
                    break;
                // case 'password':
                //     regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
                //     if (!regex.test(value)) {
                //         vld = false;
                //         validationtype = 'password';
                //     } else if (value.length < 8) {
                //         vld = false;
                //         validationtype = 'passwordLength';
                //     }
                //     break;
                case 'email':
                    regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    vld = regex.test(value);
                    break;
                case 'allCharacters':
                default:
                    vld = true;
                    break
            }
        }
        return this.getFormValidity(id, vld, validity, validationtype);
    }

    getFormValidity(id, isValid, validity, validationtype) {
        Object.assign(validity, {
            [id]: {
                isInvalid: !isValid,
                validationtype,
            }
        });

        const keys = Object.keys(validity);
        let v = false;
        if (keys.length) {
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                if (validity[key].isInvalid) {
                    v = true;
                    break;
                }
            }
        }

        return { validity, v };
    }

    getErrorMessage(validationtype) {
        switch (validationtype) {
            case 'onlyAlphabets':
                return 'Special characters or numerical values are not allowed';
            case 'required':
                return 'Field is required';
            case 'aplhaNumeric':
                return 'Special characters are not allowed'
            case 'numeric':
                return 'Only numerics values are allowed';
            case 'decimal':
                return 'Only numerics values are allowed upto 2 decimals';
            case 'mobileLength':
                return 'Phone number must be 10 digits.'
            case 'password':
                return 'Must have at least one uppercase, one lowercase, one number and one special character'
            case 'passwordLength':
                return 'Password must be of 8 digits.'
            case 'email':
                return 'Not a valid email'
            default:
                return '';
        }
    }

    promiseAllHandler(p) {
        return Promise.all(p.map(p => p.catch(e => e)));
    }
}


const miscUtils = new MiscUtils();
export default miscUtils;