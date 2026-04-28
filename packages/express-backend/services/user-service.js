import User from "../models/user.js";

export async function getAllUsers() {
  return User.find({});
}

export async function findUserById(id) {
  return User.findById(id);
}

export async function findUserByName(name) {
  return User.find({ name });
}

export async function findUserByJob(job) {
  return User.find({ job });
}

export async function findUserByNameAndJob(name, job) {
  return User.find({ name, job });
}

export async function addUser(user) {
  const newUser = new User(user);
  return newUser.save();
}

export async function deleteUserById(id) {
  return User.findByIdAndDelete(id);
}
