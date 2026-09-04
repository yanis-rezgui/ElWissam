import prisma from "../config/prisma.js"


export const getTestimonialsClient = async(req , res , next) => {

    try{

        const testimonials = await prisma.testimonial.findMany({
            where : {
                active : true
            },
            orderBy: [
                {
                    createdAt: "desc",
                },
                {
                    id: "desc",
                },
            ],
        });


        return res.status(200).json({
            success : true,
            message : "Testimonials got successfully",
            data: testimonials
        });
        
    }catch(err){
        next(err);
    }
}


export const getAllTestimonials = async(req , res, next) => {

    try{

        const {active, fullName} = req.body;

        const where = {}

        if(typeof active === "boolean"){
            where.active = active
        }

        if(fullName && fullName.trim() !== ""){
            where.fullName = fullName
        }

        const testimonials = await prisma.testimonial.findMany({
            where,
            orderBy: [
                {
                    createdAt: "desc",
                },
                {
                    id: "desc",
                },
            ],
        });

        return res.status(200).json({
            success : true,
            message : "Testimonials got successfully",
            data: testimonials
        });


    }catch(err){
        next(err);
    }
}


export const updateTestimonials = async(req , res , next) => {

    try{

        const {fullName, message, rating, active} = req.body;

        const id = req.params.id;

        const testimonial = await prisma.testimonial.findUnique({
            where: {
                id
            }
        });

        if(!testimonial){
            return res.status(404).json({
                success : false,
                message : "Error testimonial not found"
            });
        }

        const where = {};

        if(fullName && fullName.trim() !== ""){
            where.fullName = fullName.trim();
        }

        if(message && message.trim() !== ""){
            where.message = message.trim();
        }

        if(Number(rating) > 0 && Number(rating) <= 5){
            where.rating = Number(rating)
        }

        if(typeof active === "boolean"){
            where.active = active
        }

        const updatedTestimonial = await prisma.testimonial.update({
            where : {
                id,
            },
            data : where
        });

        return res.status(200).json({
            success: true,
            message : "Testimonial updated successfully",
            data : updatedTestimonial
        });
    }catch(err){
        next(err);
    }
}


export const addTestimonial = async(req , res, next) => {

    try{

        const {fullName, message, rating, active} = req.body;

        if(!fullName || fullName.trim() === ""){
            return res.status(400).json({
                success : false,
                message : "fullName is required"
            });
        }

        if(!message || message === ""){
            return res.status(400).json({
                success : false,
                message: "message is required"
            });
        }

         if(Number(rating) <= 0 || Number(rating) > 5){
            return res.status(400).json({
                success : false,
                message: "rating must be between 1 and 5"
            });
        }

        if(typeof active !== "boolean"){
            return res.status(400).json({
                success : false,
                message : "active must be a boolean"
            });
        }


        const newTestimonial = await prisma.testimonial.create({
            data :{
                fullName,
                message,
                rating : Number(rating),
                active
            }
        });

        return res.status(201).json({
            success : true,
            message : "Testimonial created successfully",
            data : newTestimonial
        });

    }catch(err){
        next(err);
    }
}


export const deleteTestimonial = async(req, res, next) => {

    try{

        const testimonialId = req.params.id;

        const testimonial = await prisma.testimonial.findUnique({
            where : {
                id : testimonialId
            }
        });

        if(!testimonial){
            return res.status(404).json({
                success : false,
                message : "Error testimonial not found"
            });
        }

        const deletedTestimonial = await prisma.testimonial.delete({
            where : {
                id : testimonialId
            }
        });

        return res.status(200).json({
            success : true,
            message : "Testimonial deleted successfully",
            data : testimonialId
        });
    }catch(err){
        next(err);
    }
}