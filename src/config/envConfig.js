
const _config = {
    port : process.env.PORT,
    mongouri : process.env.MONGO_URI,
    nodeEnv : process.env.NODE_ENV
}

export const config = {

    get(key){
        const value = _config[key];

        if(!value){
            console.log("value is -> ",value);
            
            console.error(`The ${key} variable is not found make sure to pass the correct enironment variable`);
            process.exit(1);
        }
        return value;
    }
    
}