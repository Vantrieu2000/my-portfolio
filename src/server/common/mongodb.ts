import mongoose from 'mongoose';

const connectToDB = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI!);
            console.log('Connected to MongoDB');
        }
    } catch (error) {
        console.error(error);
    }
};

export default connectToDB;
