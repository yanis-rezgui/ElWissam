import { Router } from "express";
import { addTestimonial, deleteTestimonial, getAllTestimonials, getTestimonialsClient, updateTestimonials } from "../controllers/testimonials.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";

const testimonialRouter = new Router();

testimonialRouter.post('/', getTestimonialsClient);

testimonialRouter.post('/all',authorize, isAdmin, getAllTestimonials);

testimonialRouter.post('/add', authorize, isAdmin, addTestimonial);

testimonialRouter.put('/:id', authorize, isAdmin, updateTestimonials);



testimonialRouter.delete('/:id', authorize, isAdmin, deleteTestimonial);

export default testimonialRouter;