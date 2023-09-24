import mongoose, { connect, ConnectOptions } from 'mongoose';
mongoose.set('strictQuery', true);

export const dbConnect = () => {
    connect(process.env.MONGO_URL!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions).then(
        () => console.log("Connected to MongoDB Atlas"),
        (error) => console.log(error)
        )
}
