import { Router } from 'express';
import  asyncHandler  from 'express-async-handler';
import { FeedbackModel } from '../models/feedback.model';
import { INotifications, NotificationsModel } from '../models/notification.model';
import { UserModel } from '../models/user.model';
import { IPark, ParkModel } from '../models/park.model';

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

router.post("/report/available" ,asyncHandler(
  async (req, res) => {
      const {userID, reporterName, parkID} = req.body;
      const Ireport = 
      {
          id: await NotificationsModel.countDocuments()+1,
          userID,
          parkID,
          reporterName,
          type: "Report", 
          description: `You have been reported by ${reporterName} for not recording that you occupied the parking space`, 
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

router.post("/report/unavailable" ,asyncHandler(
  async (req, res) => {
      const {userID, reporterName, parkID} = req.body;
      const Ireport = 
      {
          id: await NotificationsModel.countDocuments()+1,
          parkID,
          userID,
          reporterName,
          type: "Report", 
          description: `You have been reported by ${reporterName} for recording that you occupied the parking space and not using it`, 
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
      const {userID, description} = req.body;
      const Ireport = 
      {
          id: await NotificationsModel.countDocuments()+1,
          userID,
          reporterName: "Admin",
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
      const {userID} = req.body;
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

router.patch("/suspend-account/" ,asyncHandler(
  async (req, res) => {
      const {userID} = req.body;
      const user = await UserModel.findOne({ id: userID });
      await user!.updateOne({ $set: { "isSuspended": true } });
      res.send(user);
  }
))

router.patch("/unsuspend-account" ,asyncHandler(
  async (req, res) => {
      const {userID} = req.body;
      const user = await UserModel.findOne({ id: userID });
      await user!.updateOne({ $set: { "isSuspended": false } });
      res.send(user);
  }
))

router.get("/user/reports/:userID", asyncHandler(
  async (req, res) =>{
    const allReports = await NotificationsModel.find({userID: req.params.userID}).sort({ createdAt: -1 });
    res.send(allReports);                       //sending items from database
  }
))

router.post("/parks/" ,asyncHandler(
  async (req, res) => {
      const {Index} = req.body;
      const IPark: IPark = 
      {
          id: Index,
          isAvailable: true,
          isReported: false,
          parkerID: "", 
          name: "", 
          PlateNo: "",
          time: "",
        }
      const dbPARK = await ParkModel.create(IPark);
      res.send(dbPARK);
  }
))

router.get("/parks/all", asyncHandler(
  async (req, res) =>{
    const allParks = await ParkModel.find().sort({ id: 1 });
    res.send(allParks);                       //sending items from database
  }
))

router.patch("/parks/parkUser" ,asyncHandler(
  async (req, res) => {
      const { id, parkerID, name, PlateNo} = req.body;
      const park = await ParkModel.findOne({ id: id });
      await park!.updateOne({
        $set: {
          "parkerID": parkerID,
          "name": name,
          "PlateNo": PlateNo,
          "isAvailable": false,
          "time": new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Manila',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        }
      });
      res.send(park);
  }
))

router.patch("/parks/unparkUser" ,asyncHandler(
  async (req, res) => {
      const { id } = req.body;
      const park = await ParkModel.findOne({ id: id });
      await park!.updateOne({
        $set: {
          "parkerID": "",
          "name": "",
          "PlateNo": "",
          "isAvailable": true,
          "time": ""
        }
      });
      res.send(park);
  }
))

export default router;