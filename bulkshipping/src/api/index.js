import axios from 'axios';

class API {
    constructor() {
        this.apiUrl = '';
    }

    loginUser(data) {
        return axios.post(this.apiUrl + '/userDetails/login', data);
    }

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

    getAllVesselsPerformance = data => {
        return axios.get(this.apiUrl + '/performanceDetails/getAllVessels/' + data.isDetailsFilled);
    }

    getAllVoyage = data => {
        return axios.get(this.apiUrl + '/voyageDetails/getAllVoyage/' + data.companyName, {
            headers: { 'Content-Type': 'application/json' }
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

    getAllVoyageDetails = () => {
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

    updateVesselDetails = data => {
        return axios.post(this.apiUrl + '/vesselDetails/updateVesselDetails', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

    deleteVoyageDetails = data => {
        return axios.delete(this.apiUrl + '/voyageDetails/' + data);
    }

    deleteUserDetails = data => {
        return axios.delete(this.apiUrl + '/UserDetails/' + data);
    }

    updateUserDetails = data => {
        return axios.post(this.apiUrl + '/userDetails/updateUserDetails', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

    updateVoyageDetails = data => {
        return axios.post(this.apiUrl + '/voyageDetails/updateVoyageDetails', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

    getPortDetails = data => {
        return axios.get(this.apiUrl + '/voyageDetails/getPortDetails/' + data.userName + '/' + data.vesselName + '/' + data.cpDate);
    }

    getPerformanceDetails = data => {
        return axios.get(this.apiUrl + '/performanceDetails/getPerformanceDetails/' + data.chartererName + '/' + data.vesselName + '/' + data.cpDate);
    }

    getCompletePerformanceDetailsForView = data => {
        return axios.get(this.apiUrl + '/performanceDetails/getCompletePerformanceDetailsForView/' + data.userName + '/' + data.vesselName + '/' + data.cpDate);
    }

    getVesselsListAll = () => {
        return axios.get(this.apiUrl + '/vesselDetails/getAllVesselsListAll');
    }

    deletePerformanceDetails = data => {
        return axios.delete(this.apiUrl + '/performanceDetails/deletePerformanceDetails/' + data.chartererName + '/' + data.vesselName + '/' + data.cpDate);
    }

    getVoyageDocuments = data => {
        return axios.get(this.apiUrl + '/voyageDocuments/getVoyageDocuments/' + data);
    }

    uploadDocument = data => {
        return axios.post(this.apiUrl + '/voyageDocuments/uploadDocument', data);
    }

    deleteVoyageDocument = data => {
        return axios.delete(this.apiUrl + '/voyageDocuments/delete/' + data);
    }

    downloadDocument = data => {
        return axios.get(this.apiUrl + '/voyageDocuments/download/' + data);
    }

    contactUs = data => {
        return axios.post(this.apiUrl + '/contactUs/', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

    mailResume = data => {
        return axios.post(this.apiUrl + '/career/', data);
    }

    activateUser = data => {
        return axios.post(this.apiUrl + '/userDetails/activateUser', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

    activateVoyage = data => {
        return axios.post(this.apiUrl + '/voyageDetails/activateVoyage', {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }

};

const api = new API();
export default api;