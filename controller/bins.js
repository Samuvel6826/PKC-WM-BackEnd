const sanitize = require('../common/Sanitize')
const userModel = require('../model/bins')
// const auth = require('../common/Auth')
const getUsers = async(req,res)=>{
    try {
        let data = await userModel.find()
        res.status(200).send({
            data,
            message:"Bin Data Fetch Successful"
        })
    } catch (error) { 
        res.status(500).send({
            message:"Internal Server Error",
            errorMessage: error.message
        })
    }
}
const getUserById =  async(req,res)=>{
    try {
        let binId = sanitize.isString(req.params.id)
        let data = await userModel.findById(binId)
        if(data)
        {
            res.status(200).send({
                data,
                message:"Bin Data Fetch Successful"
            })
        }
        else
            res.status(400).send({message:"Invalid Bin ID"})
    } catch (error) { 
        res.status(500).send({
            message:"Internal Server Error",
            errorMessage: error.message
        })
    }
}

const createUser = async(req,res)=>{
    try {
        const binName = sanitize.isString(req.body.binName)
        const binLocation = sanitize.isString(req.body.binLocation)
        const binColor = sanitize.isString(req.body.binColor)

       let existingBinName = await userModel.findOne({binName:binName})
       if(!existingBinName)
       {
            await userModel.create(
                {
                    binName,
                    binLocation,
                    binColor
                })

            res.status(200).send({
                message:"Bin Created Successfully"
            })
       }
       else
       {
        res.status(400).send({
            message:`${req.body.binName} already exists`
        })
       }
    } catch (error) { 
        res.status(500).send({
            message:"Internal Server Error",
            errorMessage: error.message
        })
    }
}

const editUserById = async(req,res)=>{
    try {

        const binName = sanitize.isString(req.body.binName)
        const binLocation = sanitize.isString(req.body.binLocation)
        const binColor = sanitize.isString(req.body.binColor)

        let binId = sanitize.isString(req.params.id)
        let bin = await userModel.findById(binId)
        console.log(binId)
        if(bin)
        {
            // bad approach await userModel.updateOne({_id: userId},{$set:{firstName,lastName,email,batch,status}})
            //suggested approach
            bin.binName = binName
            bin.binLocation = binLocation
            bin.binColor = binColor

            await bin.save()

            res.status(200).send({
                message:"Bin Data Edited Successfully"
            })
        }
        else
            res.status(400).send({message:"Invalid Bin ID"})
        
    } catch (error) { 
        res.status(500).send({
            message:"Internal Server Error",
            errorMessage: error.message
        })
    }
}

const deleteUserById = async(req,res)=>{
    try {
        let binId = sanitize.isString(req.params.id)
        let data = await userModel.findById(binId)
        if(data)
        {
            await userModel.deleteOne({_id:binId})
            res.status(200).send({
                message:"Bin Data Deleted Successfully"
            })
        }
        else
        {
            res.status(400).send({
                message:"Invalid Bin ID"
            })
        }
        
    } catch (error) { 
        res.status(500).send({
            message:"Internal Server Error",
            errorMessage: error.message
        })
    }
}

module.exports={
    getUsers,
    getUserById,
    createUser,
    editUserById,
    deleteUserById
}