import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SampleForm from './components/forms/simpleForm';
import { fetchSampleForm2GraphQL } from './actions/actions'


function handleSubmit (values) {
console.log('onSubmit', JSON.stringify(values))
	// TODO call the method for send information to JSON2GRAPHQL
}


class App extends Component {

	componentWillMount(){
		this.props.fetchSampleForm2GraphQL()
	}

  render() {
    return (
      <div>
	      <SampleForm onSubmit={handleSubmit}/>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({ fetchSampleForm2GraphQL } , dispatch);
}


export default connect(null , mapDispatchToProps)(App);
