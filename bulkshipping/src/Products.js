import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import auth0Client from './Auth';

export default class Products extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          questions: null,
        };
      };
      async componentDidMount() {
        const questions = (await axios.get('http://localhost:3001/products/1', {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
          }));
          console.log('componentDidMount questions: ', questions);
        this.setState({
          questions,
        });
      }
      render() {
        const { questions } = this.state;
          return(
              <div>
                  Worked!
              </div>
          )
      }
}