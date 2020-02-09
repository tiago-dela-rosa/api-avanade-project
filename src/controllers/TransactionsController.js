const UserSchema = require('../models/User');

module.exports = {
    async store(req, res) {
        //res.send({ id: req.params.userID});

        let { userId } = req.params;
        let { account_number } = req.body;

        let teste = await UserSchema.findById(userId).then((resp) => {
            console.log(resp)
        })
        

    }
}