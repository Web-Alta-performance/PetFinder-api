import { env } from "./env";
import { app } from './app';
import mongoose from "mongoose";

const connect = async () => {
    await mongoose.connect(env.DATABASE_URL)
        .then(() => console.log('Connected to Database.'))
        .catch((error) => console.error('something went wrong: ', error));

    app.listen(env.PORT, () => console.log('HTTP server running.'));
};

connect();