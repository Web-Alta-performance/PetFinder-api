import { env } from "./env";
import { app } from "./app";

app.listen(env.PORT, () => {
    console.log('HTTP server running.')
})