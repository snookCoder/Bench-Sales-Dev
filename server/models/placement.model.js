import mongoose from 'mongoose';

const placement_schema = new mongoose.Schema({
    
    candidateId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'candidateProfile'
    },

    recruiterId:{
       type:mongoose.Schema.Types.ObjectId, 
       ref:'recruiter'
    },

    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job'
    },

    position:{
        type:String,
        default:'Associate Developer',
    },

    salary:{
        type:Number,
        default:0
    },

    startDate:{
        type: Date,
        required: true, // Ensures date is always provided
        set: (dateString) => {
          // Convert "DD/MM/YYYY" to "YYYY-MM-DD" for Date object
          const [day, month, year] = dateString.split("/"); 
          return new Date(`${year}-${month}-${day}`);
        },
    },

    isActive:{
        type:Boolean,
        default:true
    },

    createdAt:{
        type:Number,
        default:()=>Math.floor(Date.now()/1000)
    },
    updatedAt:{
        type:Number,
        default:()=>Math.floor(Date.now()/1000)
    }
})



placement_schema.pre('save', function(next) {
    this.updatedAt = Math.floor(Date.now() / 1000);
    next();
});

export const placement_model = mongoose.model('placement', placement_schema);