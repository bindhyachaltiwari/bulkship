import React from 'react';
import './css/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import About from './components/Others/About';
import Location from './components/Others/Location';
import LoginHome from './components/Login/LoginHome';
import Home from './components/Others/Home';
import Header from './components/Others/Header';
import Footer from './components/Others/Footer';
import PieCharts from './components/Others/PieCharts';
import CheckPerformance from './components/Client/CheckPerformance';
import FirstComponentStateFul from './components/FirstComponentStateFul'
import ForgotPassword from './components/Login/ForgotPassword';
import AddNewUser from './components/Admin/user/AddNewUser';
import ViewAllUsers from './components/Admin/user/ViewAllUsers';
import AddNewVessel from './components/Admin/vessel/AddNewVessel';
import ViewAllVessels from './components/Admin/vessel/ViewAllVessels';
import FillVoyageDetails from './components/Admin/voyage/FillVoyageDetails'
import ViewVoyageDetails from './components/Admin/voyage/ViewVoyageDetails'
import ViewPerformanceDetails from './components/Admin/performance/ViewPerformanceDetails';
import PrivateRoute from './components/Admin/common/PrivateRoute';
import FillPerformanceDetails from './components/Admin/performance/FillPerformanceDetails';

function App() {
  return (
    <Router>
      <div className='App main-wrapper'>
        <Header />
        <Switch>
          <Route path='/about' component={About}></Route>
          <Route path='/location' component={Location}></Route>
          <Route path='/login' component={LoginHome}></Route>

          <PrivateRoute path='/addNewUser' component={AddNewUser}></PrivateRoute>
          <PrivateRoute path='/viewAllUsers' component={ViewAllUsers}></PrivateRoute>
          <PrivateRoute path='/editUserDetails' component={ViewAllUsers}></PrivateRoute>


          <PrivateRoute path='/addNewVessel' component={AddNewVessel}></PrivateRoute>
          <PrivateRoute path='/viewAllVessels' component={ViewAllVessels}></PrivateRoute>
          <PrivateRoute path='/editVesselDetails' component={ViewAllVessels}></PrivateRoute>


          <PrivateRoute path='/fillVoyageDetails' component={FillVoyageDetails}></PrivateRoute>
          <PrivateRoute path='/viewVoyageDetails' component={ViewVoyageDetails}></PrivateRoute>
          <PrivateRoute path='/editVoyageDetails' component={ViewVoyageDetails}></PrivateRoute>

          <PrivateRoute path='/fillPerformanceDetails' component={FillPerformanceDetails}></PrivateRoute>
          <PrivateRoute path='/viewPerformanceDetails' component={ViewPerformanceDetails}></PrivateRoute>
          <PrivateRoute path='/editPerformanceDetails' component={ViewPerformanceDetails}></PrivateRoute>
         
          <PrivateRoute path='/checkPerformance' component={CheckPerformance}></PrivateRoute>
          <Route path='/pieChart' component={PieCharts}></Route>
          <Route path='/forgotPassword' component={ForgotPassword}></Route>
          <Route path='/' component={Home}></Route>
        </Switch>
      </div>
      <Footer/>
      {/* <FirstComponentStateFul/> */}
    </Router>
  );
}
export default App;