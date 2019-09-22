var {user_model} = require('../../models')
var db = require('../../util/mysql_connection')

module.exports = async function profile(req, res) {
	try{
        console.log("Getting all users")
        const [rows] = await db.connection.query("SELECT `is_verified`,`bio`,`alias` FROM `recipient` WHERE `recipient_id` = ?;", [req.params.id]);
        let is_verified = rows[0].is_verified
        let bio = rows[0].bio
        console.debug("Recipient is_verified = %s", is_verified)
        console.debug("Recipient bio = %s", bio)
        console.debug("Recipient alias = %s", alias)
	    res.send({code: "Success", alias: alias, bio: bio, is_verified: is_verified})
 	}
 	catch(err){
        console.log(err)
 		res.status(400).send({msg: 'Failed getting bio for recipient', err});
 	}
 }
