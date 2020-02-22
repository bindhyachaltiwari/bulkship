import React from 'react';
import './css/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import About from './components/Others/About';
import Location from './components/Others/Location';
import LoginHome from './components/Login/LoginHome';
import FillPerformanceDetails from './components/Admin/FillPerformanceDetails';
import AddNewClient from './components/Admin/AddNewClient';
import AddNewVessel from './components/Admin/AddNewVessel';
import FillVoyageDetails from './components/Admin/FillVoyageDetails';
import Home from './components/Others/Home';
import Header from './components/Others/Header';
import Footer from './components/Others/Footer';
import FirstComponentStateFul from './components/FirstComponentStateFul'
import ForgotPassword from './components/Login/ForgotPassword';
import ViewAllVessels from './components/Manager/ViewAllVessels';
import ViewAllClients from './components/Manager/ViewAllClients';
import PrivateRoute from './components/Admin/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App main-wrapper">
        <Header />
        <Switch>
          <Route path="/about" component={About}></Route>
          <Route path="/location" component={Location}></Route>
          <Route path="/login" component={LoginHome}></Route>
          <Route path="/fillVoyageDetails" component={FillVoyageDetails}></Route>
          <Route path="/fillPerformanceDetails" component={FillPerformanceDetails}></Route>
          <Route path="/addNewVessel" component={AddNewVessel}></Route>
          <PrivateRoute path="/addNewClient" component={AddNewClient}></PrivateRoute>
          <Route path="/viewAllVessels" component={ViewAllVessels}></Route>
          <Route path="/viewAllClients" component={ViewAllClients}></Route>
          <Route path="/forgotPassword" component={ForgotPassword}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </div>
      <Footer localStorage = {localStorage.getItem('authToken')}/>
      {/* <FirstComponentStateFul/> */}
    </Router>
  );
}
export default App;