let getHomePage = (req, res) => {
    return res.render('home.ejs')
}

// object: {
//     key: '',
//     value: ''
// }
module.exports = {
    getHomePage: getHomePage,
}