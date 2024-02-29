import User from "../models/UserModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../until/error.js";
import jwt from 'jsonwebtoken';

/// user sign-up api
export const signUp = async (req, res, next) => {
   const { email, password } = req.body;

   //pass hashing
   const hashedPassword = bcryptjs.hashSync(password, 10);
   const newUser = new User({ email, password: hashedPassword });
   try {
      await newUser.save();
      res.status(201).json({ 'msg': "user created successfully" })
   } catch (error) {
      next(error)
   }
}


//user sign-in api
export const signIn = async (req, res, next) => {

   try {
      const { email, password } = req.body;
      const isValidate = await User.findOne({ email });
      if (!isValidate) return next(errorHandler(404, "User not found"));
      const validPassword = await bcryptjs.compare(password, isValidate.password)
      if (!validPassword) return next(errorHandler(401, "wrong credentials"));

      //generate token
      const token = await jwt.sign({ id: isValidate._id }, process.env.JWT_SECRET);

      const { password: pass, ...rest } = isValidate._doc;
      //set cookie
      res.cookie('access_token', token, { httpOnly: true, sameSite: 'None', secure: true })
      res.status(200).json(rest)
   } catch (error) {
      next(error)
   }
}




export const signOut = async (req, res, next) => {
   try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
   } catch (error) {
      next(error);
   }
};