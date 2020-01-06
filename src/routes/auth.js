const express = require("express");
const User = require("../models/User");
const { registerValidation } = require("../validation");

const router = express.Router();

router.post("/register", async (request, response) => {
  // lets validate the data before we a user
  const { error } = registerValidation(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const user = new User({
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
    date: request.body.date
  });
  try {
    const saveUser = await user.save();
    response.send(saveUser);
  } catch (error) {
    response.status(400).send(error);
  }
});

module.exports = router;
