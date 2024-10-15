const express = require("express");
const cors = require('cors');
const connectDB = require('./config/db')
// const dotenv = require('dotenv').config();
const authRoute = require('./routers/userRoutes')
const User = require('./models/User')
const bcrypt = require('bcryptjs')
const filmRoute = require('./routers/filmRoutes');
const salleRoute = require('./routers/salleRoutes');
const seanceRoute = require('./routers/seanceRoute')
const ratingRoute = require('./routers/rating.routes')
const reservationRoute = require('./routers/reservationRoutes')
const favoriteRoute = require('./routers/favorite.routes')
const commentRoute = require('./routers/comment.routes')
const  auth  = require("./middlewares/auth");

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/uploads', express.static('uploads'));

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
}));

async function initAdmin(){
    try{
        const admin = await User.findOne({email:'admin@gmail.com'});
        if(!admin){
            const hashedPassword = await bcrypt.hash('12345678',8)
            const newAdmin= new User({
                name : 'admin',
                email: 'admin@gmail.com',
                password: hashedPassword,
                role: 'admin'
            })
            await newAdmin.save();
            console.log('fisrt admine created')
        }

   }catch(error){
    console.log('error for creating first admin: ', error);
    
   }
}
// initAdmin();

app.use('/api/reservations',auth(['client']), reservationRoute);

app.use('/api', authRoute);
app.use('/api/films', filmRoute);
app.use('/api/salles',salleRoute);
app.use('/api/seances', seanceRoute);
app.use('/api/favorites',auth(['client']), favoriteRoute );
app.use('/api/ratings', ratingRoute );
app.use('/api/comments',auth(['client']), commentRoute );



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    
})