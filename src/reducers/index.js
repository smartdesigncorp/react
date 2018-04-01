// Dependencies
import { combineReducers } from 'redux';

// Apps Reducers
import library from '../containers/Library/reducer';
import form from '../containers/Form/reducer';

// Shared Reducers
import device from './deviceReducer';

const rootReducer = combineReducers({
  device,
  library,
  form
});

export default rootReducer;
