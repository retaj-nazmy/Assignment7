import { compareHash, generateHash } from "../../common/index.js";
import { userModel } from "../../database/model/user.model.js";

export const signup = async (data) => {
  try {
    let { name, email, password, phone, age } = data;
    let existedUser = await userModel.findOne({ email });
    if (existedUser) {
      return { message: "Email already exists" };
    } else {
      let hashedPassword = await generateHash({ plainText: password });
      let hashedPhone = await generateHash({ plainText : phone });
      let addedUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
        phone: hashedPhone,
        age,
      });
      if (addedUser) {
        return { message: "user added successfully", data: addedUser };
      } else {
        return { message: "can't add user" };
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (data) => {
  try {
    let { email, password } = data;
    let user = await userModel.findOne({ email });
    if (user) {
      let isMatched = await compareHash({
        plainText: password,
        hashedText: user.password,
      });
      if (isMatched) {
        return { message: "login success" };
      } else {
        return { message: "password not matched" };
      }
    } else {
      return { message: "invalid email " };
    }
  } catch (error) {
    console.log(error.message);
  }
};


export const update = async (params, data) => {
  try {
    let { id } = params;
    let { name, email, age } = data;

    let user = await userModel.findById(id);
    if (!user) {
      return { message: "User not found" };
    }

    if (email && user.email != email) {
      let checkEmail = await userModel.findOne({ email });

      if (checkEmail) {
        return { message: "Email already exists" };
      }
    }

    let updatedUser = await userModel.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true } 
    );

    if (updatedUser) {
      return { message: "User updated", updatedUser };
    } else {
      return { message: "something went wrong" };
    }

  } catch (error) {
    console.log(error.message);
  }
};


export const deleteUser = async (query) => {
  try {
    let {id} = query;
    let deletedUser = await userModel.findByIdAndDelete(id);
    if (deletedUser) {
        return { message: "user deleted" };
    }else{
        return { message: "user not found" };
    }
  } catch (error) {
    console.log(error.message);
  }
};


export const getById = async (data) => {
  try {
    let { id } = data;  
    let user = await userModel.findById(id)
    if (user) {
        return { message: "user found" , user };

    }else{
        return { message: "user not found" };
    }
  } catch (error) {
    console.log(error.message);
  }
};
