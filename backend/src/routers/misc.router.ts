import { Router } from 'express';
import  asyncHandler  from 'express-async-handler';
import { FeedbackModel } from '../models/feedback.model';
import { NotificationsModel } from '../models/notification.model';
import { UserModel } from '../models/user.model';

const router = Router();

router.post("/feedback" ,asyncHandler(
  async (req, res) => {
      const {id, type, desc, name} = req.body;
      const Ifeedback = 
      {
          id: await FeedbackModel.countDocuments()+1,
          name,
          type, 
          desc,
          date: new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Manila',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
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


router.post("/feedback-list", asyncHandler(
    async (req, res) => {
      const { id, type, desc, name} = req.body;
      const Ifeedback = {
        id, 
        name,
        type, 
        desc,
      }
        const dbFeedback = await FeedbackModel.create(Ifeedback);
        res.send(dbFeedback);
      }
))

router.get("/all/feedback", asyncHandler(
  async (req, res) =>{
    const allFeedback = await FeedbackModel.find().sort({ createdAt: -1 });
      res.send(allFeedback);                       //sending items from database
  }
))
router.delete("/delete/feedback/:id", asyncHandler(
  async (req, res) => {
    const feedback = await FeedbackModel.findOne({ id: req.params.id });
    
    await feedback!.delete(); 
    res.send();
  }
))

router.post("/report" ,asyncHandler(
  async (req, res) => {
      const {userID, type, description} = req.body;
      const Ireport = 
      {
          id: await NotificationsModel.countDocuments()+1,
          userID,
          type: "Report", 
          description,
          date: new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Manila',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        }
      const dbreport = await NotificationsModel.create(Ireport);
      res.send(dbreport);
  }
))

router.post("/warning" ,asyncHandler(
  async (req, res) => {
      const {userID, type, description} = req.body;
      const Ireport = 
      {
          id: await NotificationsModel.countDocuments()+1,
          userID,
          type: "Warning", 
          description,
          date: new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Manila',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        }
      const dbreport = await NotificationsModel.create(Ireport);
      res.send(dbreport);
  }
))

router.post("/suspension" ,asyncHandler(
  async (req, res) => {
      const {userID, type, description} = req.body;
      const Ireport = 
      {
          id: await NotificationsModel.countDocuments()+1,
          userID,
          type: "Suspended Account", 
          description: "Your Account has been suspended. Contact the admin for unsuspension.",
          date: new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Manila',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        }
      const dbreport = await NotificationsModel.create(Ireport);
      res.send(dbreport);
  }
))

router.post("/suspend-account" ,asyncHandler(
  async (req, res) => {
      const {userID} = req.body;
      const user = await UserModel.findOne({ id: userID });
      await user!.updateOne({ $set: { "isSuspended": true } });
      res.send(user);
  }
))

router.post("/unsuspend-account" ,asyncHandler(
  async (req, res) => {
      const {userID} = req.body;
      const user = await UserModel.findOne({ id: userID });
      await user!.updateOne({ $set: { "isSuspended": false } });
      res.send(user);
  }
))

export default router;