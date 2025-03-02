import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({

    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'candidateProfile',
    },

    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recruiter',
    },

    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
    },

    interviewDate: {
        type: Date,
        required: true, // Ensures date is always provided
        set: (dateString) => {
          // Convert "DD/MM/YYYY" to "YYYY-MM-DD" for Date object
          const [day, month, year] = dateString.split("/"); 
          return new Date(`${year}-${month}-${day}`);
        },
      },

    feedback:{

        type:String,
        default:'No feedback provided'
    },

    status:{
        type:String,
        enum:['pending','pass','fail'],
        default:'pending'
    },

    createdAt: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000),
    },
    updatedAt: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000),
    },
});

interviewSchema.pre('save', function (next) {
    this.updatedAt = Math.floor(Date.now() / 1000);
    next();
});

export const interviewModel = mongoose.model('interview', interviewSchema);