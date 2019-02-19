import React , { Component } from 'react';
import './styles.css';

// import react-autosuggest for autocomplete in the address inputs
import Autosuggest from 'react-autosuggest';

//import react redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAddressFromMellisa } from '../../actions/actions';

/**
 *
 * @param suggestion return address
 * @returns {*}
 */
function getSuggestionValue (suggestion) {
	return suggestion;
}

/**
 *
 * @param suggestion address extract from Melissa
 * @returns {*}
 */
function renderSuggestion (suggestion) {
	return (
		<span>{ suggestion }</span>
	);
}

function renderAddressLabel (addressSelected , suggestions , selected) {
	let addressSplitted = addressSelected.split( ',' );
	if ( suggestions.length === 0 && selected === true ) {
		return (
			<div>
				<div>{ addressSplitted[ 0 ] }</div>
				<div>{ addressSplitted[ 1 ] }</div>
			</div>
		)
	}

}

class AutoCompleteAddressBaoField extends Component {

	constructor () {
		super();
		this.state = {
			suggestions: [] ,
			value: '' ,
			selected: false ,
			addressSelected: '' ,
		};
	}

	/**
	 * Call the action creator for the fetch of addresses from mellisa
	 * @param value value enter by the customer in the input address
	 * @returns {Array} Array of address from Melissa
	 */
	getSuggestions (value) {
		this.props.fetchAddressFromMellisa( value );
		// return array of address
		return this.convertResponseToArray();
	}

	/**
	 * Method who is call when the user enter a value in the fields Address
	 * @param event
	 * @param newValue
	 */
	onChange = (event , { newValue , method }) => {
		this.setState( {
			value: newValue ,
		} );
	};

	/**
	 * Method that allows to fetch the value in the suggestion of address
	 * @param value the value enter by the customers
	 */
	onSuggestionsFetchRequested = ({ value }) => {
		this.setState( {
			suggestions: this.getSuggestions( value )
		} );

	};

	/**
	 * Set the suggestion to empty array of the flied address
	 */
	onSuggestionsClearRequested = () => {
		this.setState( {
			suggestions: [] ,
		} );
	};

	/**
	 * Because the component <AutoSuggest/> accept only an array in this props we need to change
	 * the cast of the Melissa response.
	 * @returns {Array} Array with only the fields address from Melissa.
	 */
	convertResponseToArray () {
		let arrayOfAddress = [];
		if ( this.props.address !== undefined ) {
			Array.from( this.props.address ).forEach( function (element) {
				arrayOfAddress.push( element.Address.Address );
			} );
			return arrayOfAddress;
		}
		return []
	}

	render () {
		const { ...input }  = this.props;
		const {  value, suggestions } = this.state;
		const inputProps = {
			placeholder: 'Enter your address' ,
			value,
			onChange: this.onChange
		};
		return (
			<div>
				<Autosuggest { ...input }
				             suggestions={ suggestions }
				             onSuggestionsFetchRequested={ this.onSuggestionsFetchRequested }
				             onSuggestionsClearRequested={ this.onSuggestionsClearRequested }
				             getSuggestionValue={ getSuggestionValue }
				             renderSuggestion={ renderSuggestion }
				             onSuggestionSelected={
					             (event , { suggestion , suggestionValue }) => {
						             this.props.fetchAddressFromMellisa( suggestionValue );
						             this.setState( {
							             value,
							             selected: true ,
							             addressSelected: suggestionValue
						             } );
						             input.onChange( this.props.address )
					             }
				             }
				             inputProps={ inputProps }
				             shouldRenderSuggestions={ (value) => value.trim().length > 0 }
				/>
				{ renderAddressLabel( this.state.addressSelected , suggestions , this.state.selected ) }
			</div>
		)
	}
}

function mapStateToProps (state) {
	return {
		address: state.address
	};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators( { fetchAddressFromMellisa } , dispatch );
}

export default connect( mapStateToProps , mapDispatchToProps )( AutoCompleteAddressBaoField );