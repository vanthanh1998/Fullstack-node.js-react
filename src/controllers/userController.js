import userSevice from "../sevices/userSevice"

let getUser = (req, res) => {
    return res.render('user/create.ejs');
}

let postUser = async (req, res) => {
    await userSevice.createNewUser(req.body);
    return res.send('thanhrain');
}

let getListUser = async (req, res) => {
    let data = await userSevice.getListUser();
    return res.render('user/list.ejs', {data: data});
}

let getEditUser = async (req, res) => {
    let userId = req.query.id;
    if(userId){
        let userData = await userSevice.getUserInfoById(userId); // thiếu await báo error => Promise { <pending> }
        console.log("-------------------");
        console.log(userData);
        console.log("-------------------");
        return res.render('user/edit.ejs', {userData: userData});
    } else {
        return res.send('error');
    }
}

let postEditUser = async (req, res) => {
    let data = await userSevice.postEditUser(req.body);
    return res.render('user/list.ejs', {data: data});
}

let deleteUser = async (req, res) => {
    let id = req.query.id;
    if(id){
        await userSevice.deleteUserById(id);
        return res.send('delete ok');
    }else{
        return res.send('delete fail');
    }
}

let handleLogin = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    // check email exist
    // compare pw
    // return userInfo (role)
    // access token: JWT (json web token)

    if(!email || !password){
        return res.status(500).json({
            errorCode: 1, // use check login fail
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userSevice.handleUserLogin(email, password);

    return res.status(200).json({
        errorCode: userData.errorCode, // use check login fail
        message: userData.errorMessage,
        user: userData.user ? userData.user : {},
    })
}

let handleGetAllUser = async(req, res) => {
    let id = req.query.id // ALL, ID
    if(!id){
        return res.status(200).json({
            errorCode: 1,
            errorMessage: 'Missing required parameters',
            users
        })
    }

    let users = await userSevice.getAllUser(id);

    return res.status(200).json({
        errorCode: 0,
        errorMessage: 'OK',
        users
    })
}

module.exports = {
    getUser: getUser,
    postUser: postUser,
    getListUser: getListUser,
    getEditUser: getEditUser,
    postEditUser: postEditUser,
    deleteUser: deleteUser,
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
}