// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// Comment schema
const commentSchema = require('./comment')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const fishSchema = new Schema({
	name: { type: String, required: true},
	bodyOfWater: {type: String, required: true},
	readyToCatch: {type: Boolean, required: true},
	owner: {
		type: Schema.Types.ObjectID,
		ref: 'User',
		},
	comments: [commentSchema]
}, { timestamps: true })

const Fish = model('Fish', fishSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Fish
