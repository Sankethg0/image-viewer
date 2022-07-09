const { resolveSrv } = require('dns/promises');
const fs = require('fs')
module.exports = (req,res,next) =>{
    //save category name and image
    if(typeof(req.file)==='undefined'|| typeof(req.body)==='undefined'){
        return res.status(400).json({
            errors:"problem with sending data"
        })    
    }

    //get image and name
    console.log(req.file);
    let name = req.body.name 
    let image = req.file.path 

    //check the correct format
    if(!(req.file.mimetype).includes('jpeg') 
    && !(req.file.mimetype).includes('png')
    && !(req.file.mimetype).includes('jpg')){
      fs.unlinkSync(image)
      return res.status(400).json({
        errors:'file not supported'
      })
    }
    //file size to 1mb
    if(req.file.size> 1024*1024){
      fs.unlinkSync(image)
      return res.status(400).json({
        errors:'file is too large'
      })
    }
    //check if the feild is empty
    if(!name || !image){
      return res.status(400).json({
        error: "all fields are required"
      })
    }
    next()
}