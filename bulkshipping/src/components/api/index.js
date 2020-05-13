import axios from 'axios';

class API {
    apiUrl = '';

    checkUsername = data => {
        return axios.post(this.apiUrl + '/userDetails/checkUsername', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

    updatePassword = data => {
        return axios.post(this.apiUrl + '/userDetails/updatePassword', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

    login = data => {
        return axios.post(this.apiUrl + '/userDetails/login', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

    insertUserDetails = data => {
        return axios.post(this.apiUrl + '/userDetails/insertUserDetails', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

    insertVesselDetails = data => {
        return axios.post(this.apiUrl + '/vesselDetails/insertVesselDetails', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

    insertPerformanceData = data => {
        return axios.post(this.apiUrl + '/performanceDetails/insertPerformanceData', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

    insertVoyageData = data => {
        return axios.post(this.apiUrl + '/voyageDetails/insertVoyageData', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

    getAllManager = () => {
        return axios.get(this.apiUrl + '/userDetails/getAllManager');
    }

    getAllVesselsPerformance = data => {
        return axios.post(this.apiUrl + '/performanceDetails/getAllVessels', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

    getAllVoyage = data => {
        return axios.post(this.apiUrl + '/voyageDetails/getAllVoyage', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

    getAllUserDetails = () => {
        return axios.get(this.apiUrl + '/userDetails/getAllUserDetails');
    }

    getAllClientList = () => {
        return axios.get(this.apiUrl + '/userDetails/getAllClientList');
    }

    getAllVesselsList = () => {
        return axios.get(this.apiUrl + '/vesselDetails/getAllVesselsList');
    }

    getAllVesselsDetails = () => {
        return axios.get(this.apiUrl + '/vesselDetails/getAllVesselDetails');
    }

    getAllVoyageDetails=()=>{
        return axios.get(this.apiUrl + '/voyageDetails/getAllVoyageDetails');
    }

    fillPerformanceDetails = data => {
        return axios.post(this.apiUrl + '/performanceDetails/fillPerformanceDetails', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

    deleteVesselDetails = data => {
        return axios.delete(this.apiUrl + '/vesselDetails/' + data);
    }

    updateVesselDetails = data=>{
        return axios.post(this.apiUrl + '/vesselDetails/updateVesselDetails', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

    deleteVoyageDetails = data => {
        return axios.delete(this.apiUrl + '/voyageDetails/' + data);
    }

    updateVoyageDetails = data=>{
        return axios.post(this.apiUrl + '/voyageDetails/updateVoyageDetails', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }





};

const api = new API();
export default api;