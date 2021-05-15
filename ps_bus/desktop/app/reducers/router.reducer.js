import { CLEAN_ROUTER }        from '../constants/action.types';
import { GO_TO_FUELLING }      from '../constants/action.types';
import { GO_TO_OPEN_WORKLOAD } from '../constants/action.types';
import { GO_TO_REGIONAL }      from '../constants/action.types';

export default function router(state = { route: ""  }, action) {
  switch (action.type) {
    case GO_TO_FUELLING:
      let newState = Object.assign({}, state)
      newState.route='/fuelling';
      return newState;
    case GO_TO_REGIONAL:
      let newGotoRegional = Object.assign({}, state)
      newGotoRegional.route='/admin/regional';
      return newGotoRegional
    case GO_TO_OPEN_WORKLOAD:
      let newStateGoToWorkload = Object.assign({}, state)
      newStateGoToWorkload.route='/open/workload';
      return newStateGoToWorkload;
    case CLEAN_ROUTER:
      let newStateClean = Object.assign({}, state)
      newStateClean.route=""; 
      return newStateClean
    default:
      return state;
  }
}
