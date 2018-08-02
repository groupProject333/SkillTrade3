const db = require("../database/models");
var mongoose = require("mongoose");
module.exports = {
  findMessages: function(req, res) {
    db.User.findById({ _id: req.params.id })
      .populate("messages")
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  },
  updateChips: function(req, res) {
    var chips = req.body.chips
    console.log(chips)
    console.log(req.body)
    db.User.findOneAndUpdate({username: req.body.username}, {$inc: {chips: chips}}, {new: true})
    .then(function(dbUser) {
      res.send(dbUser)
    })
    .catch(function(err){console.log(err)}
    )},
  getUser: function(req, res) {
    console.log("HERE:CONTROLLERS");
    db.User.findOne({ username: req.params.username })
      .populate("messages")
      .then(function(dbUser) {
        console.log(dbUser);
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  },
  sendMessage: function(req, res) {
    console.log("!!!!HERE:CONTROLLERS" + req.body.sender);
    db.Message.create(req.body)
      .then(function(dbMessage) {
        console.log(dbMessage);
        return db.User.findOneAndUpdate(
          { username: dbMessage.receiver },
          { $push: { message: dbMessage._id }, 
            $inc: {chips:dbMessage.chips}},
          { new: true }
        );
      })
      .catch(function(err) {
        res.json(err);
      });
  },
  getMessageBody: function(req, res) {
    console.log("HERE MESSAGE BODY CONTROLLER" + req.params.id);
    db.Message.find({ _id: req.params.id })
      .then(function(dbMessage) {
        console.log(dbMessage + "??????");
        res.json(dbMessage);
      })
      .catch(function(err) {
        res.json(err);
      });
  },
  deleteMessage: function(req, res) {
    // req.map(element => {
    //     console.log(element)
    // })
    // console.log(JSON.stringify(messageData) + "!!")
    // console.log("CONTROLLERS" + req.id + "!!")
    console.log(typeof req.params.id);
    var id = mongoose.Types.ObjectId(req.params.id);
    console.log(id);
    db.User.findOne(
      { username: req.params.username }, function(err, me) {
          for (var i = 0; i < me.message.length; i++) {
              if (String(me.message[i]) ==String(id)) {
                  me.message.remove(id)
                  me.save(me)
              }
          }
        // //   me.save(callback)
        //   me.save(function(err, us) {
        //       next(err, "kljlmjk"+JSON.stringify(me))
        //   })
      },
      { $unset: { message: { _id: id } } },
      function(err, doc) {
        if (!err) {
          res.status(200).send();
        } else {
          res.render("error", { error: err });
        }
      }
    );
    // var oId = new mongo.ObjectID(req.params.id);
    // db.User
    // .findOneAndUpdate({ username: req.params.username }, { $pull: {"message": {"_id": { "$oid": req.params.id  }}}})
    //     .findByIdAndRemove(req.params.id)
    // //     // .update({ message: req.params.id}, {$pullAll: {message: { _id = req.params.id}}})
    //     .then(dbModel => {
    //         // dbModel.remove()
    //         console.log(dbModel)
    //         console.log("HERE 66")

    //     }
    // )
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
  }

  // collection.findOneAndUpdate(
  //     {_id: req.query.id},
  //     {$push: {items: item}},
  //     {safe: true, upsert: true},
  //     function(err, model) {
  //         console.log(err);
  //     }
};
