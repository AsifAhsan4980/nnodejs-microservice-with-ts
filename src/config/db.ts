import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const uri = process.env.DATABASE_CONNECTION_AUTH as string;

        await mongoose.connect(uri)

        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
