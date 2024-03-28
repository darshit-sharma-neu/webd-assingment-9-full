import mongoose from 'mongoose';

const Job = mongoose.model('Job', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    applyLink: {
        type: String,
        required: true
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
}))

export default Job;