const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const Pusher = require('pusher');
const Votos = require('../model/votos')

const pusher = new Pusher({
    appId: "1728671",
    key: "126aaf37d840aabb0828",
    secret: "4882107902df3b08c295",
    cluster: "sa1",
    useTLS: true
  });
router.get('/', (req,res) => {
    Votos.find().then(votes => res.json({ success: true, votos: votes}))
});

router.post('/', (req, res) => {
    const NewVote = {
        voto: req.body.voto,
        pontos: 1
    }
    new Votos(NewVote).save().then(vote => {
        pusher.trigger("votos", "votar", {
            pontos: parseInt(vote.pontos),
            voto: vote.voto
          });
        return res.json({success: true, message: 'Obrigado por votar'});
    })
});

module.exports = router;