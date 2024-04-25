const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    fullName: {
        type: String,
        //required : true
    },//ou fullName: String,
    job: {
        type: String
    },//ou job: String,
    role: {
        // rh - admain - employee
        type: String,
        enum: ['rh', 'admin', 'employee'],
        required : false,
    },//ou role: String,
    email: {
        type: String
    },//ou email: String,
    password: {
        type: String
    },
    tasks : [
        {
            type: Schema.Types.ObjectId,
            ref : 'Task'
        }
    ]
   
},

{
    timestamps: true
});

const userSchema = mongoose.model('User', UserSchema);

module.exports = userSchema;
