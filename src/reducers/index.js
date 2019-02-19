import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import SampleFormReducer from './sampleFormReducer';
import MelissaReducer from './reducer_melissa';


const rootReducer = combineReducers({
	form: reduxFormReducer,
	SampleFormReducer,
	address : MelissaReducer
});

export default rootReducer;
