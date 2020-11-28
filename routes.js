const express = require("express");
const path = require("path");
const fs = require("fs")

module.exports = function (app) {

  app.use(express.static(__dirname + '/public'));

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

}