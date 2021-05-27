/*
	mongoDB Schema for diseases
*/
const mongoose = require ('mongoose');

var AllBloods = mongoose.Schema({
    Id: {
        type: String,
        unique: true,
	   required: true 
    },
    BloodGroup: {
        type: String,
        required: true,
        default: null
    }
});

var blood = mongoose.model('Blood', AllBloods);

/*
 	Default diseases in the system
		-> those will be added as soon as the system is live
		-> if they are deleted from the system, and the system restarts, then they will be added again in the system
*/

var scoreOfDisease = {}; // empty map

module.exports = blood;
