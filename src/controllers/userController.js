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

module.exports = {
    getUser: getUser,
    postUser: postUser,
    getListUser: getListUser,
    getEditUser: getEditUser,
    postEditUser: postEditUser,
    deleteUser: deleteUser,
}