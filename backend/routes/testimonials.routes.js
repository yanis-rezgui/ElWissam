import { Router } from "express";
import { addTestimonial, deleteTestimonial, getAllTestimonials, getTestimonialsClient, updateTestimonials } from "../controllers/testimonials.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";

const testimonialRouter = new Router();

testimonialRouter.get('/', getTestimonialsClient);

testimonialRouter.get('/all',authorize, isAdmin, getAllTestimonials);

testimonialRouter.put('/:id', authorize, isAdmin, updateTestimonials);

testimonialRouter.post('/', authorize, isAdmin, addTestimonial);

testimonialRouter.delete('/:id', authorize, isAdmin, deleteTestimonial);

export default testimonialRouter;