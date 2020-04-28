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

    getAllClientDetails = () => {
        return axios.post(this.apiUrl + '/userDetails/getAllClientDetails', {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    getAllManager = () => {
        return axios.post(this.apiUrl + '/userDetails/getAllManager', {
            headers: { 'Content-Type': 'application/json' },
        });
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

    getAllClients = () => {
        return axios.post(this.apiUrl + '/userDetails/getAllClients', {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    getAllVessels = () => {
        return axios.post(this.apiUrl + '/vesselDetails/getAllVessels', {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    getAllVesselsDetails = () => {
        return axios.post(this.apiUrl + '/vesselDetails/getAllVesselDetails', {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    fillPerformanceDetails = data => {
        return axios.post(this.apiUrl + '/performanceDetails/fillPerformanceDetails', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

    deleteVessel = data => {
        return axios.delete(this.apiUrl + '/vesselDetails/' + data);
    }

    updateVessel = data=>{
        return axios.post(this.apiUrl + '/vesselDetails/updateVessel', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }
};

const api = new API();
export default api;