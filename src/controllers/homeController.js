import db from "../models/index"
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('home.ejs', {
            data: JSON.stringify(data),
        });
    } catch (error) {
        console.log(error);
    }
}

// object: {
//     key: '',
//     value: ''
// }
module.exports = {
    getHomePage: getHomePage,
}