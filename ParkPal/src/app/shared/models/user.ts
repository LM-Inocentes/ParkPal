export class User{
    Level!: number; 
    id!: string;
    password!: string;
    Fullname!: string;
    
    username?: string;      //undefined if user
    
    email?: string;         //undefined if admin
    ORdoc?: string;         
    CRdoc?: string;
    StudyLoad?: string;
    IDdoc?: string;
    Payment?: string;
    VMake?: string;
    VModel?: string;
    VPlateNo?: string;
    isRegistered?: boolean;
    isSuspended?: boolean;
    token!: string;
}