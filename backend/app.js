import cookieParser from "cookie-parser";
import express from "express"
import helmet from "helmet"
import errorMiddleware from "./middlewares/error.middleware.js";
import cors from "cors"
import { PORT } from "../../DriveFlow/backend/config/env.js";
import { test } from "./test.js";
import seedTerrain from "./scripts/seed.js";
import seedDatabase from "./scripts/seed.js";
import biensRouter from "./routes/bien.routes.js";
import reservationRouter from "./routes/visite.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import testimonialRouter from "./routes/testimonials.routes.js";
import usersRouter from "./routes/users.routes.js";



const app = express();

app.use(helmet())

app.use(cors({ 
    origin : [
        "http://localhost:5173",
    ],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use('/api/v1/biens', biensRouter)
app.use('/api/v1/visites', reservationRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/testimonials', testimonialRouter);
app.use('/api/v1/users', usersRouter);

app.use(errorMiddleware);

const startServer = async() => {

    try{
        console.log("Trying to connect to database : ");
        app.listen(PORT, async()=>{
            console.log(`App running on : http://localhost:${PORT}`);
            await test();
           //seedDatabase();
        });
    }catch(err){
        console.error(err);
    }
}

await startServer();