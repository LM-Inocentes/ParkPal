import { Schema, model } from 'mongoose';

export interface IFeedback{
    id: string;
    type: string;
    desc: string;
    name: string;
    date: string;
}

export const FeedbackSchema = new Schema<IFeedback>(
    {
        id: { type:String, required:true },
        type: { type:String, required:true },
        desc: { type:String, required:true },
        name: { type:String, required:true },
        date: { type:String, required:true },
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
)

export const FeedbackModel = model<IFeedback>('feedback', FeedbackSchema);