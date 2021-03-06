import * as actionTypesMSF from "constants/actionTypes";
import { asyncState_Extended } from "reducers/models/async_Extended";
import async from "_core/reducers/async";
import AsyncReducer_Extended from "reducers/reducerFunctions/AsyncReducer_Extended";

export default function asynchronous_Extended(
    state = asyncState_Extended,
    action,
    opt_reducer = AsyncReducer_Extended
) {
    switch (action.type) {
        case actionTypesMSF.AVAILABLE_LAYER_LIST_LOADING:
            return opt_reducer.availableFeatureListLoading(state, action);
        case actionTypesMSF.AVAILABLE_LAYER_LIST_LOADED:
            return opt_reducer.availableFeatureListLoaded(state, action);
        case actionTypesMSF.START_FEATURE_LOADING:
            return opt_reducer.startFeatureLoading(state, action);
        default:
            return async.call(this, state, action, opt_reducer);
    }
}
