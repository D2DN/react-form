import { FETCH_SAMPLE_FORM , FETCH_ADDRESS_FROM_MELISSA } from './actionTypes';
import axios from 'axios';


export function fetchSampleForm2GraphQL () {
	/**
	 * TODO When the service JSON to GRAPHQL will be ready we need to call directly the service
	 * TODO We need to transform this action creator with react-thunk because i became a call from API.
	 */
	const data = {
		individual: {
			firstName: 'Jane' ,
			lastName: 'Doe' ,
			address: {
				Address: {
					Address: '302-7902 rue saint huber, h2r2p2 Montreal'
				}
			},
			Phone : '+1 (111) 111 1111 ',
			Phone1 : '+1 (222) 222 2222'
		},
	};
return {
	type: FETCH_SAMPLE_FORM ,
	data
}
}

/**
 *  Function that allows to fetch the address from Melissa Service.
 *  Note: Bug in Melissa, you need to remove all the ('-') in your address
 * @param value address enter by the customer
 * @returns {function(*)} dispatch function for the reducer to set the address in the redux store
 */
export function fetchAddressFromMellisa (value) {
	console.log(value)
	const request = axios.get( `http://expressentry.melissadata.net/jsonp/GlobalExpressFreeForm?&format=jsonp&id=OTCiavJ8jtOFmsWZ3EMeik**&FF=${value.replace( /-/g , ' ' )}&country=CA&maxrecords=5` )
	return (dispatch) => {
		request.then( ({ data }) => {
			dispatch( { type: FETCH_ADDRESS_FROM_MELISSA , payload: data.d.Results } )
		} );
	};
}