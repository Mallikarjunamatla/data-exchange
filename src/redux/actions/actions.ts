import * as types from './actionsTypes'

import {db, auth, provider} from "../../firebase/Firebase";
export function setUser(payload : any) {
	return {
		type: types.SET_USER,
		user: payload,
	};
}

export function setLoading(status : boolean) {
	return {
		type: types.SET_LOADING_STATUS,
		status,
	};
}

export function getRecords(payload : any, Id : any) {
	return {
		type: types.GET_RECORDS,
		payload: payload, 
		Id,
	};
}

export function getUserAuth() {
	
	return (dispatch : any) => {
		dispatch(setLoading(true))
		auth.onAuthStateChanged( (user : any) => {
			if (user) {
				dispatch(setUser(user));
				dispatch(setLoading(false))
			}
		});
	};
}

export   function signInWithEmailPassword(email : string,password : string) {
	return (dispatch : any) => {
		auth.signInWithEmailAndPassword(email,password)
			.then((payload : any) => dispatch(setUser(payload.user)))
			.catch((err : any) => alert(err.message));
	};
}


export  function signInWithGoogleAPI() {

	
	
	return (dispatch : any) => {
	  //var provider = new firebase.auth.GoogleAuthProvider();
	  // In memory persistence will be applied to the signed in Google user
	  // even though the persistence was set to 'none' and a page redirect
	  // occurred.
	 
	  auth.signInWithPopup(provider)
	  .then((payload : any) => dispatch(setUser(payload.user)))
	  .catch((err : any) => alert(err.message));
	};	
			
	
	//auth.setPersistence(auth.Persistence.SESSION)
	
}

export  function signOutAPI() {
	return (dispatch : any) => {
		auth.signOut()
			.then(() => dispatch(setUser(null)))
			.catch((err : any) => alert(err.message));
	};
}
export function getArticlesAPI() {
	return (dispatch : any) => {
		dispatch(setLoading(true));
		let payload;
		let Id;
		db.collection("member")
			.orderBy("status", "desc")
			.onSnapshot((snapshot : any) => {
				payload = snapshot.docs.map((doc : any) => doc.data());
				Id = snapshot.docs.map((doc : any) => doc.id);
			
				dispatch(getRecords(payload,Id));
			});
		dispatch(setLoading(false));   
	};  
} 

export  function postArticleAPI(payload : any) {
	return (dispatch : any) => {
			dispatch(setLoading(true));
			db.collection("member").add({
				name : payload.name,
                company : payload.company,
                status : payload.status,
                lastUpdated : payload.lastUpdated,
                note : payload.note,
                memberId : payload.memberId
			});
			dispatch(setLoading(false));
		
	};  
} 

export  function updateArticleAPI(payload : any) {
	return (dispatch : any) => {
		db.collection("member").doc(payload.memberId).update(payload.update);
	};
}


export  function deleteArticleAPI(payload : any) {
	// event.preventDefault();
	
	console.log('DEL',payload)
return(dispatch : any) =>{

	db.collection("member").doc(payload.id).delete().then(function() {
		console.log("Document successfully deleted!");
	}).catch(function(error : any) {
		console.log("Error removing document: ", error);            
	});
	// Get a reference to the storage service, which is used to create references in your storage bucket
	

	// // Create a storage reference from our storage service
	// const storageRef = storage.ref();

	// // Create a reference to the file to delete
	// const desertRef = storageRef.child(`images/${payload.imagename}`);

	// // Delete the file
	// desertRef.delete().then(function() {
	// // File deleted successfully
	// console.log("Deleted")

	// }).catch(function(error) {
	// // Uh-oh, an error occurred!

	// });
}
	

}

// export function getWidthAPI(payload){
// 	return {
// 		type: GET_WIDTH,
// 		width: payload.width,
// 	};
// }

// export function getHeightAPI(payload){

// 	return {
// 		type: GET_hEIGHT,
// 		width: payload.height,
// 	};
// }



