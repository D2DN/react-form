import React from "react";
import './styles.css';
import { connect } from "react-redux";
import { Field , reduxForm } from "redux-form";
import { bindActionCreators } from 'redux';

function renderAddressMailing (props) {

	return (
		<div>
			{console.log(props.initialValues)}
		</div>
	);
}

class SampleForm extends React.Component {

	constructor (props) {
		super( props );
		this.state = {
			hasAddressMailing: false ,
		}
	}


	render () {
		const { hasAddressMailing } = this.props;
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={ handleSubmit }>
				<Field
					name='individual.firstname'
					component={renderAddressMailing}
					type='checkbox'
					checked={ hasAddressMailing }
					{ ... this.props }
				/>
				<button className='button-continue' type="submit">
					Continue
				</button>
			</form>
		);
	};
};

SampleForm = reduxForm( {
	form: "initializeFromState" ,
} )( SampleForm );


function mapStateToProps (state) {
	return {
		initialValues: state.SampleFormReducer.sampleForm ,
		address: state.address ,
	};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators( {} , dispatch );
}

export default connect( mapStateToProps , mapDispatchToProps )( SampleForm );
