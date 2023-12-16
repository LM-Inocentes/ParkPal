import { Schema, model } from 'mongoose';

export interface IPark{
    id: string;
    userID: string;
    type: string;
    description: string;
    date: string;
}

export const ParkSchema = new Schema<IPark>(
    {
        id: { type:String, required:true },
        userID: { type:String, required:true },
        type: { type:String, required:true },
        description: { type:String, required:true },
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

export const ParkModel = model<IPark>('park', ParkSchema);