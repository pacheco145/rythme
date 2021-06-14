const indexGet = (req, res) => {
    const pageTitle = 'Cartoteca';    
    return res.render('index', { title: pageTitle, user: req.user });
};

module.exports = { indexGet };