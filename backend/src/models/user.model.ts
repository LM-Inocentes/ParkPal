import { Schema, model } from 'mongoose';

export interface IUser{
    id: string;
    username: string;
    email: string;
    password: string;
    Fullname: string;
    ORdoc: string;
    CRdoc: string;
    StudyLoad: string;
    IDdoc: string;
    Payment: string;
    Level: number;
    VMake: string;
    VModel: string;
    VPlateNo: string;
    isRegistered: boolean;
    isSuspended: boolean;
}

export const UserSchema = new Schema<IUser>(
    {
        id: { type:String, required:true },
        username: { type:String, required:true, unique:true },
        Fullname: { type:String, required:true },
        email: { type:String, required:true, unique:true },
        password: { type:String, required:true },
        ORdoc: { type:String, required:false },
        CRdoc: { type:String, required:false },
        StudyLoad: { type:String, required:false },
        IDdoc: { type:String, required:false },
        Payment: { type:String, required:false },
        Level: { type:Number, required:true },
        VMake: { type:String, required:true },
        VModel: { type:String, required:true },
        VPlateNo: { type:String, required:true },
        isRegistered: { type:Boolean, required:true },
        isSuspended: { type:Boolean, required:true },
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