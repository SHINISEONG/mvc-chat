const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const Dm = require('../models/dm');
const router = express.Router();

router.get('/chattypes/:chattype/channels/', async (req, res, next) => {
  try {
    return res.json(
      await Dm.find({ chattype: req.params.chattype }).distinct('channel')
    );
  } catch (error) {
    next(error);
  }
});

router.get(
  '/chattypes/:chattype/channels/:channel/chats',
  async (req, res, next) => {
    try {
      return res.json(
        await Dm.find({
          $and: [
            { channel: req.params.channel },
            { chattype: req.params.chattype },
          ],
        })
      );
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/chattypes/:chattype/channels/:channel/chats',
  async (req, res, next) => {
    try {
      const chattype = req.params.chattype;
      const channel = req.body.channel;
      // console.log(channel);
      const chat = await Dm.create({
        userId: req.body.userId,
        content: req.body.content,
        channel: channel,
        chattype: chattype,
      });
      const io = req.app.get('io');
      io.of(`/ct-${chattype}`)
        .to(`/ct-${chattype}-${channel}`)
        .emit('message', chat);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }
);

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, '../uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post(
  '/chattypes/:chattype/channels/:channel/images',
  upload.array('image'),
  async (req, res, next) => {
    try {
      const chattype = req.params.chattype;
      const channel = req.params.channel;
      for (let i = 0; i < req.files.length; i++) {
        const chat = await DM.create({
          userId: channel,
          channel: channel,
          chattype: chattype,
          content: req.files[i].path,
        });
      }
      const io = req.app.get('io');
      io.of(`/ct-${chattype}`)
        .to(`/ct-${chattype}-${channel}`)
        .emit('message', 'ok');
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
