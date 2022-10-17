// import what I need
const mongoose = require ('./connection')

const { Schema, model } = mongoose

// create the schema
const UserSchema = new Schema(
	{
		username: { 
			type: String, 
			required: true, 
			unique: true 
		},
		password: { 
			type: String, 
			required: true 
		}
	},
	{ timestamps: true }
)

// creat the model
const User = model('User', UserSchema)

// export the model
module.exports = User
