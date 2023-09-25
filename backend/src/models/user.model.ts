import { Schema, model } from 'mongoose';

export interface IUser{
    id: string;
    email: string;
    password: string;
    Fullname: string;
    contactinfo: string;
    ORdoc: string;
    CRdoc: string;
    StudyLoad: string;
    IDdoc: string;
    Payment: string;
    Level: string;
}

export const UserSchema = new Schema<IUser>(
    {
        id: { type:String, required:true },
        Fullname: { type:String, required:true },
        contactinfo: { type:String, required:true },
        email: { type:String, required:true, unique:true },
        password: { type:String, required:true },
        ORdoc: { type:String, required:false },
        CRdoc: { type:String, required:false },
        StudyLoad: { type:String, required:false },
        IDdoc: { type:String, required:false },
        Payment: { type:String, required:false },
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

export const UserModel = model<IUser>('user', UserSchema);