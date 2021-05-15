import admin                      from './admin.reducer';
import closeWorkload              from './close.workload.reducer';
import { combineReducers }        from 'redux';
import fuelling                   from './fuelling.reducer';
import motorOil                   from './motor.oil.reducer';
import openWorkload               from './open.workload.reducer';
import router                     from './router.reducer';
import communication              from './communication.reducer';
import {reducer as toastrReducer} from 'react-redux-toastr';

const rootReducer = combineReducers({
   admin:        admin,
   close:        closeWorkload,
   communication: communication,
   fuelling:     fuelling,
   motorOil:     motorOil,
   openWorkload: openWorkload,
   router:       router,
   toastr:       toastrReducer
})

export default rootReducer
