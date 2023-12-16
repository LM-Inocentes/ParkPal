import { Schema, model } from 'mongoose';

export interface IPark{
    id: number;
    isAvailable: boolean;
    isReported: boolean;
    parkerID: string;
    name: string;
    PlateNo: string;
    time: string;
}

export const ParkSchema = new Schema<IPark>(
    {
        id: { type:Number, required:false },
        parkerID: { type:String, required:false },
        name: { type:String, required:false },
        PlateNo: { type:String, required:false },
        time: { type:String, required:false },
        isAvailable: { type:Boolean, required:true },
        isReported: { type:Boolean, required:true },
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