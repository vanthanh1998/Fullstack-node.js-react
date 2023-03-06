import bcrypt from "bcryptjs"
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    console.log(data);
    return new Promise(async(resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phone,
                gender: data.gender == 1 ? true : false,
                roleId: data.roleId,
            })

            resolve('create ok'); // ~~ return 
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise((resolve, reject)=> {
        try {
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let getListUser = () => {
    return new Promise((resolve, reject) => { // promise => tránh việc bất đồng bộ xảy ra
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ 
                where: { id: userId } , 
                raw : true,
            });
            if(user){
                resolve(user);
            } else {
                resolve({});
            }
        } catch (e) {
            reject(e);
        }
    })
}

let postEditUser = (data) => {
    console.log("---------------");
    console.log(data);
    return new Promise(async (resolve, reject) => {
        try {
            // find get row id
            let user = await db.User.findOne({ 
                where: { id: data.id }, // input hidden name id
            });

            if(user){
                user.email = data.email,
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address = data.address,
                await user.save();

                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }else{
                resolve();
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ 
                where: { id: userId }
            });
            if(user){
                await user.destroy();
            }
            resolve(); // ~~ return 
        } catch (e) {
            reject(e);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist){
                // user already exist
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true,
                })
                if(user){
                    // compare pw
                    let check = await bcrypt.compareSync(password, user.password); // false
                    if(check){
                        userData.errorCode = 0;
                        userData.errorMessage = `OK`;
                        console.log(user);
                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errorCode = 3;
                        userData.errorMessage = `Wrong password`;
                    }
                }else{
                    userData.errorCode = 2;
                    userData.errorMessage = `User's not found!`;
                }
            }else{
                userData.errorCode = 1;
                userData.errorMessage = `Your's Email isn't exist in your system. Plz try other email!`;
                // return error
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if(user){
                resolve(true);
            }else{
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getListUser : getListUser,
    getUserInfoById: getUserInfoById,
    postEditUser: postEditUser,
    deleteUserById: deleteUserById,
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
}