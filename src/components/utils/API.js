import axios from 'axios';

export default {

  deleteMessage: function(messageData) {
    console.log("message API" + messageData.id)
    return axios.delete("/message/delete/"+ messageData.username+"/"+messageData.id)
},
	getUser: function(username) {
		console.log('here API');
		return axios.get('/user/' + username);
	},
	sendMessage: function(receiverData) {
		console.log('message API');
		return axios.post('/user/send', receiverData);
	},
	getMessageBody: function(id) {
		console.log('here API body' + id);
		return axios.get('/message/' + id);
	},
///	build\index.html
////////////////////////////////////////////////////////////////
    // Listing
    getListings: function() {
        console.log('hit browse api')
        return axios.get("/listing/");
	  },
	  checkListing: function(id) {
		return axios.get("/listing/" + id);
		},
		saveReview: function(reviewData) {

			console.log("hit review api");
			return axios.post("/api/profiles/post", reviewData)
		},
	saveListing: function(listingData) {
		console.log('hit listing api', listingData);
		return axios.post('/listing/', listingData);
	},
	getReviewBody: function(id) {
		console.log("hit review api  " + id);
		return axios.get("/api/profiles/reviews/" + id)
	},
	getProfile: function(id) {
		axios.get("/api/profiles/exist/" + id).then(function(response){
			if (response === true) {
				return axios.get("/api/profiles/" + id);
			} else {
				return axios.post("/api/profiles/"+ id);
			}
		});
	},	
	saveProfile: function(profileData) {
		return axios.put("/api/profiles/"+ profileData._id, profileData);
	},
	updateChips: function(chips) {
		return axios.put('/user/chips', chips);

	}
};