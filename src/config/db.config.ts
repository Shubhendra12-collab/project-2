import mongoose from 'mongoose';

export const connectDB = (DB_URI: string) => {
  mongoose.connect(DB_URI) 
    .then(() => {
      console.log('Database connected successfully');
    })
    .catch((error) => {
      console.log('Database connection error:', error);
      console.log(error);    // Exit the process with an error code
    });
};
    