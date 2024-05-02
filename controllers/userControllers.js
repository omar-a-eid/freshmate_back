import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { mapGender, userExists } from "../util/userUtil.js";
import validate from "../util/userValidation.js";
export async function getUsersById(req, res) {
  //add try and catch to handle the error
  try {
    // get id by params
    const UserId = req.params.id;
    // findone the particularid in the DB
    const foundUser = await userModel.findOne({ _id: UserId });
    if (!foundUser) {
      //if not found in DB
      return res.send("invalid User id");
    }
    return res.json(foundUser);
  } catch (error) {
    return res.status(500).send("internal server error");
  }
}

export async function signup(req, res) {
  const { filename } = req.file;
  try {
    const { email, gender, password } = req.body;
    // map the gender to the corresponding object
    if (gender) req.body.gender = mapGender(gender);

    // Validate request body
    const valid = validate(req.body);
    if (!valid) {
      fs.unlink("public/assets/profiles/" + filename, (err) => {
        if (err) {
          console.error(`Error deleting image`, err);
        } else {
          console.log(`Deleted image`);
        }
      });
      return res.status(400).json(validate.errors);
    }

    // Check if user already exists
    const userAlreadyExists = await userExists(email);
    if (userAlreadyExists) {
      fs.unlink("public/assets/profiles/" + filename, (err) => {
        if (err) {
          console.error(`Error deleting image`, err);
        } else {
          console.log(`Deleted image`);
        }
      });
      return res.status(400).send("The user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update request body with hashed password and lowercased email
    req.body.password = hashedPassword;
    req.body.email = email.toLowerCase();
    req.body.avatar = "assets/profiles/" + filename;

    const newUser = await userModel.create(req.body);

    const token = jwt.sign(
      { email: newUser.email, userId: newUser._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "10h",
      }
    );
    return res
      .status(200)
      .send({ userId: newUser._id.toString(), token: token });
  } catch (error) {
    fs.unlink("public/assets/profiles/" + filename, (err) => {
      if (err) {
        console.error(`Error deleting image`, err);
      } else {
        console.log(`Deleted image`);
      }
    });
    console.log(error);
    return res.status(500).send("Internal Server Error!");
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).send("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign(
      { email, userId: user._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "10h",
      }
    );
    return res.status(200).send({ userId: user._id.toString(), token: token });
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
}

export async function update(req, res) {
  try {
    const { gender, username, email, password } = req.body;
    if (gender) req.body.gender = mapGender(gender);

    // get param of order req.body.id
    const UserId = req.params.id;
    // check for it in the db if found change the data
    const foundUser = await userModel.findById(UserId);
    if (!foundUser) {
      return res.send(`User not found`);
    }
    //update the new data with the old data
    if (username) {
      foundUser.username = username;
    }
    // Update request body with hashed password and lowercased email
    if (email) {
      foundUser.email = email.toLowerCase();
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
    }
    if (req.file) {
      const { filename } = req.file;

      fs.unlink("public/assets/profiles/" + foundUser.avatar, (err) => {
        if (err) {
          console.error(`Error deleting image`, err);
        } else {
          console.log(`Deleted image`);
        }
      });

      foundUser.avatar = "assets/profiles/" + filename;
    }

    //save to database
    let updatedUser = await foundUser.save();
    // AllOrders = await OrderModel.find();
    return res.json({
      message: `User ${UserId} updated successfully`,
      data: updatedUser,
    }); // res
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error!");
  }
}
