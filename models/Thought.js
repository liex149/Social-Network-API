const { Schema, model} = require('mongoose');

const thoughtSchema = new Schema ({

    thoughtText: {
        text: String,
        require: true,
        minLength: 1,
        maxLength: 280,
    },

    createdAt: {
        default: Date.now,

    }, 

    username: {
        type: String, 
        
    }
})