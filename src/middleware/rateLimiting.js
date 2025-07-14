import rateLimit from "express-rate-limit";


const CustonRateLimiter = (maxRequests,time)=>{
    return rateLimit({
        max : maxRequests,
        windowMs : time,
        message : "Too many requests,please try again later",
        standardHeaders : true,
        legacyHeaders : false,
    });  
}

export default CustonRateLimiter;