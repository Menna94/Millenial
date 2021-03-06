import dotenv from 'dotenv';
dotenv.config();



const notFound = ((req,res,next)=>{
    const error = new Error(`NOT FOUND - ${req.originalURL}`)
    res.status(404);
    next(error);
});


const errorHandler = (err,req,res,next)=>{
    const stsCode = res.statusCode === 200? 500 : res.statusCode;
    res.status(stsCode);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production'? null : err.stack
    })
};

export {notFound,errorHandler};
