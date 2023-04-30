const express = require('express');
const path = require('path');

const Dm = require('../models/dm');
const router = express.Router();

router.get(
  '/workspaces/:workspace/channels/:channel/senderid/:id/chats',
  async (req, res, next) => {
    try {
      return res.json(await Dm.find({ channel: req.params.channel }));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/workspaces/:workspace/channels/:channel/senderid/:id/chats',
  async (req, res, next) => {
    try {
      const workspace = req.params.workspace;
      const channel = req.params.channel;
      const chat = await Dm.create({
        userId: req.params.id,
        content: req.body.content,
        channel: req.params.channel,
      });
      const io = req.app.get('io');
      io.of(`/ws-${workspace}`)
        .to(`/ws-${workspace}-${channel}`)
        .emit('message', chat);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
