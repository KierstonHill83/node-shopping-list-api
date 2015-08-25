var express = require('express');
var router = express.Router();
var ItemLibrary = require('../models/items.js');


var storage = new ItemLibrary();
storage.addItem('Noodles');
storage.addItem('Tomatoes');
storage.addItem('Peppers');


router.get('/items', function(req, res, next) {
  res.json(storage.items);
});
console.log(storage.items);

router.get('/item/:id', function(req, res, next) {
  var getItems = storage.items.filter(function(item) {
    return item.id === +req.params.id;
  });
  if (getItems.length > 0) {
    res.json(getItems);
  } else {
    res.json("Item doesn't exist here!");
  }
});

router.post('/items', function(req, res, next) {
  storage.addItem(req.body.name);
  res.json(storage.items);
});

router.put('/item/:id', function(req, res, next) {
  var getItems = storage.items.filter(function(item) {
    return item.id === +req.params.id;
  });
  if (getItems.length > 0) {
    for (var i = 0; i < storage.items.length; i++) {
      if (storage.items[i].id === parseInt(req.params.id)) {
        for (key in req.body) {
          if (key === 'name') {
            storage.items[i].name = req.body.name;
          }
        }
      }
    }
    res.json({
      message: "Success",
      item: storage.items[i]
    });
  } else {
    res.json({
      message: "That item does not exist here."
    });
  }
});

router.delete('/item/:id', function(req, res, next) {
    for (var i = 0; i < storage.items.length; i++) {
      if (storage.items[i].id === parseInt(req.params.id)) {
        storage.items.splice(i, 1);
        res.send({
          message: "That item has been removed.",
        });
      }
    }
});



module.exports = router;
