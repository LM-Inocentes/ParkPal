import { Schema, model } from 'mongoose';

export interface INotifications{
    id: string;
    userID: string;
    type: string;
    description: string;
    date: string;
}

export const NotificationsSchema = new Schema<INotifications>(
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

export const NotificationsModel = model<INotifications>('notifications', NotificationsSchema);