import { env } from './env';
import { app } from './app';

const connect = async () => {
    app.listen(env.PORT, () => console.log(`HTTP server running on port ${env.PORT}.`));
};

connect();