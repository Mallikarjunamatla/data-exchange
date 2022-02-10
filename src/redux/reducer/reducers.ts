import { combineReducers } from 'redux';
import * as types from '../actions/actionsTypes'
import { initialRecordsTypes } from '../../interface/types.';
// export const recordReducer = (state = initialRecords , {type, payload} : any )=>{
//      switch(type){
//          case types.ADD_RECORD : 
//          return [...initialRecords,payload];
//          case types.DELETE_RECORD : {
//              const newRecordArray = initialRecords.filter((record : initialRecordsTypes)=>{
//                  return record.id !== payload.id;
//              })
//              return newRecordArray;
//          }
//          case types.DELETE_ALL :
//              return [];
//         case types.SORT_BY_STATUS : {
//             const newSortByStatusArray = initialRecords.sort((recordA : initialRecordsTypes, recordB : initialRecordsTypes)=>{
//                 if((recordA.status === 'Active') || (recordB.status === 'Active')){
//                     return 1
//                 }else if((recordB.status === 'Closed') || (recordB.status === 'Closed')){
//                     return -1;
//                 }
//                 else{
//                     return 0;
//                 }
//             })
//          return newSortByStatusArray;
//         }
//      }
// }




// const initialRecords : Array<initialRecordsTypes> = []

export const initialState = {
	loading: false,
	records: [],
	Id : []
};

function recordsReducer(state = initialState, action: { type: any; payload: any; Id : any, status: any; }) {
	switch (action.type) {
		case types.GET_RECORDS:
			return {
				...state,
				records: action.payload,
				Id : action.Id
			};
		case types.SET_LOADING_STATUS:
			return {
				...state,
				loading: action.status,
			};
		default:
			return state;
	}
}

const initialUserState = {
	user: null,
};

const userReducer = (state = initialUserState, action: { type: any; user: any; }) => {
	switch (action.type) {
		case types.SET_USER:
			return {
				...state,
				user: action.user,
			};
		default:
			return state;
	}
};


const reducers = {
    records : recordsReducer,
    user : userReducer,
}

export {reducers};
export default combineReducers(reducers);