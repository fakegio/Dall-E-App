import * as dotenv from 'dotenv';
import { OpenAI } from "openai";
import express from 'express';
import cors from 'cors';
import path from 'path';
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

app.get('/', (req,res)=>{
    res.render('index');
});

app.post("/generate", async(req,res)=>{
    const prompt = req.body.prompt;

    try{
        const aiResponse = await openai.images.generate({
            model:"dall-e-3",
            prompt,
            n:1,
            size:'1024x1024'
        });
        
        const image = aiResponse.data[0].url;
        res.send({image});

    }catch(error){
        console.error(error);
        res.status(500).send(error?.response.data.eror.message || 'Something went wrong.')
    }

});

//set up app on port 8080
app.listen(8080,()=>console.log('server running at localhost:8080/generate'));

