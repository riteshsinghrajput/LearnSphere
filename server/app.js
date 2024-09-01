import { config } from 'dotenv';
config();

import express from 'express'
import cors from 'cors'
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express()
 

app.use(
    cors({
        origin:[process.env.CLIENT_URL],
        credentials: true
    })
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cookieParser());

import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/instructor.routes.js';
import courseRoutes from './routes/course.routes.js'
import subscptionRoutes from './routes/subscription.routes.js'
import miscRoutes from './routes/miscellaneous.routes.js'
import conversationRoutes from './routes/conversation.routes.js'
import messageRoutes from './routes/message.routes.js'

app.get('/' , (req, res)=>{
    res.send('hey !')
})

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin',adminRoutes );
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/courses/subscription', subscptionRoutes);
app.use('/api/v1/conversation' , conversationRoutes)
app.use('/api/v1/message' , messageRoutes)
app.use('/api/v1/misc',miscRoutes)

app.all('*' , (req, res)=>{
    res.status(404).send('OOPS!! 404 PAGE NOT FOUND')
})

app.use(errorMiddleware);

export default app;