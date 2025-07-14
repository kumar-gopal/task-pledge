

const apiversioning = (version) => (req,res,next)=>{
    if(req.path.startWith(`/api/${version}`)){
        next();
    }
    else{
        res.status(404).json({
            success : false,
            error : "Api version is not supported"
        })
    }
}


const headerVersioning = (version)=>(req,res,next)=>{
    if(req.get('Accept-Version') === version){
        next();
    }
    else{
        res.status(404).json({
            success : false,
            error : "Header verson is not supported"
        });
    }
}

const contectTypeVersioning = (version)=>(req,res,next)=>{
    const contentType = req.get('Content-Type');
    if(contentType && contentType.includes(`application/vnd.api.${version}`)){
        next();
    }
    else{
        res.status(404).json({
            success : false,
            error : "Content-Type is not supported"
        });
    }
}

export {
    apiversioning,
    headerVersioning,
    contectTypeVersioning
}