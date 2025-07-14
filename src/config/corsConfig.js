import cors from "cors";

const corsOptions = ()=>{
    return cors({
        origin : (origin,callback)=>{
            const allowedOrigin = [
                "http://localhost:8080",
                "https://taskpledge.gopaldevs.xyz"
            ]
            if(!origin || allowedOrigin.indexOf(origin) !== -1){
                return callback(null,true);
            }
            else{
                return callback(new Error("Not Allowed By Cors"));
            }
        },
        methods : ['GET','POST','PATCH','PUT','DELETE','OPTIONS'],
        allowedHeaders : [
            'Content-Types',
            'Authorization',
            'Accept-Version'
        ],
        exposedHeaders : ['Content-Range','X-Total-Count'],
        credentials : true , // // enables support for cookies
        preflightContinue : false,
        maxAge : 600, // / cached pre flight response for 10 mins(600 sec) -->  
                     // avoid sending options requests multiple times
        optionsSuccessStatus : 204

    })
}

export default corsOptions;