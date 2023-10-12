import { Router } from 'express';
import  asyncHandler  from 'express-async-handler';
import { FeedbackModel } from '../models/feedback.model';

const router = Router();

router.post("/feedback" ,asyncHandler(
    async (req, res) => {
        const {id, type, desc, name} = req.body;
        const Ifeedback = 
        {
            id,
            name,
            type, 
            desc,
          }
        const dbFeedback = await FeedbackModel.create(Ifeedback);
        res.send(dbFeedback);
    }
  ))

  router.get("/recent/feedback", asyncHandler(
    async (req, res) =>{
        const feedback = await FeedbackModel.find().limit(2).sort({ createdAt: -1 });
        res.send(feedback);                       //sending items from database
    }
  ))

export default router;