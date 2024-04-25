const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    fullName: {
        type: String,
    },
    job: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'client'],
        required : false,
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    cart : [
        {
            type: Schema.Types.ObjectId,
            ref : 'Product'
        }
    ]
},

{
    timestamps: true
});

const userSchema = mongoose.model('User', UserSchema);

module.exports = userSchema;
