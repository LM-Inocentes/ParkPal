import { Schema, model } from 'mongoose';

export interface IAdmin{
    id: string;
    password: string;
    Fullname: string;
    username: string;
    Level: string;
}

export const AdminSchema = new Schema<IAdmin>(
    {
        id: { type:String, required:true },
        password: { type:String, required:true },
        Fullname: { type:String, required:true },
        username: { type:String, required:true, unique:true },
        Level: { type:String, required:true },
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

export const AdminModel = model<IAdmin>('admin', AdminSchema);