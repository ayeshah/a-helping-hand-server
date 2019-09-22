var {user_model} = require('../../models')
var db = require('../../util/mysql_connection')

module.exports = async function transactions(req, res) {
	try{
                let id = req.params.id
                console.log("Getting all transactions for recipient %s", req.params.id)
                const [transactions] = await db.connection.query("SELECT `tx_id`, `tx_type`, `amount`, `date` FROM `transaction` WHERE `recipient_id` = ?;", [id]);
                console.debug("Transactions for recipient %s: %s ", id, transactions)
                res.send({code: "Success", transactions: transactions})
                }
 	catch(err){
        console.log(err)
 		res.status(400).send({msg: 'Failed getting transactions for recipient', err});
 	}
 }
