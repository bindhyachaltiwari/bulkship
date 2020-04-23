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
import AddNewUser from './components/Admin/AddNewUser';
import AddNewVessel from './components/Admin/AddNewVessel';
import FillVoyageDetails from './components/Admin/FillVoyageDetails';
import Home from './components/Others/Home';
import Header from './components/Others/Header';
import Footer from './components/Others/Footer';
import FirstComponentStateFul from './components/FirstComponentStateFul'
import ForgotPassword from './components/Login/ForgotPassword';
import ViewAllVessels from './components/Manager/ViewAllVessels';
import ViewAllUsers from './components/Manager/ViewAllUsers';
import PrivateRoute from './components/Admin/PrivateRoute';
import PieCharts from './components/Admin/PieCharts';
import CheckPerformance from './components/Client/CheckPerformance';

function App() {
  return (
    <Router>
      <div className="App main-wrapper">
        <Header />
        <Switch>
          <Route path="/about" component={About}></Route>
          <Route path="/location" component={Location}></Route>
          <Route path="/login" component={LoginHome}></Route>
          <PrivateRoute path="/fillVoyageDetails" component={FillVoyageDetails}></PrivateRoute>
          <PrivateRoute path="/fillPerformanceDetails" component={FillPerformanceDetails}></PrivateRoute>
          <PrivateRoute path="/addNewVessel" component={AddNewVessel}></PrivateRoute>
          <PrivateRoute path="/addNewUser" component={AddNewUser}></PrivateRoute>
          <PrivateRoute path="/viewAllVessels" component={ViewAllVessels}></PrivateRoute>
          <PrivateRoute path="/viewAllUsers" component={ViewAllUsers}></PrivateRoute>
          <PrivateRoute path='/checkPerformance' component={CheckPerformance}></PrivateRoute>
          <Route path="/pieChart" component={PieCharts}></Route>
          <Route path="/forgotPassword" component={ForgotPassword}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </div>
      <Footer/>
      {/* <FirstComponentStateFul/> */}
    </Router>
  );
}
export default App;