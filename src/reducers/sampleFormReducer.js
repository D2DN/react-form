import { FETCH_SAMPLE_FORM  } from '../actions/actionTypes';

const SampleFromReducer = (state = {} , action) => {
	switch ( action.type ) {
		case FETCH_SAMPLE_FORM:
			return {
				sampleForm: action.data ,
			};
		default:
			return state;
	}
};

export default SampleFromReducer;