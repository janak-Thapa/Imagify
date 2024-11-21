import UserModel from "../models/userModel.js";
import FormData from 'form-data'
import axios from 'axios'

export const generateImage = async (req,res) =>{
    try {
        const {userId,prompt} = req.body;
        const user = await UserModel.findById(userId)

        if(!user || ! prompt){
            return res.json({success:false,message:'Missing Details'})
        }
        // if(user.creditBalance === 0 || UserModel.creditBalance < 0){
        //     return res.json({success:false,message:"No Credit Balance", creditBalance:user.creditBalance})
        // }
        const formData = new FormData()
        formData.append('prompt',prompt)

       const {data} =  await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
            headers:{                'x-api-key':process.env.CLIPDROP_API
            },
            responseType:'arraybuffer'
        })

        const base64Image = Buffer.from(data,'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`

        await UserModel.findByIdAndUpdate(user._id)
        
        res.json({success:true,message:'Image Generated',resultImage})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
        
    }
}