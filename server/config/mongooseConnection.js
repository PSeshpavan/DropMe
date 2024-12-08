import mongoose from 'mongoose';

const connectDB = async () => {
    // await mongoose.connect(`${process.env.MONGO_LOCAL_URI}`)
    await mongoose.connect(`${process.env.MONGO_CLOUD_URI}`)
    .then(() => {
        console.log('Connected to MongoDB at: ' + process.env.MONGO_CLOUD_URI);
    })
    .catch(err => console.log(err));
}


export {connectDB};