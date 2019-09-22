var {user_model} = require('../../models')
var db = require('../../util/mysql_connection')

module.exports = async function transaction(req, res) {
	try{
                let id = req.params.id
                console.log("Getting transactions %s", req.params.id)
                const [purchase_order_id] = await db.connection.query("SELECT `purchase_order_id` FROM `transaction` WHERE `tx_id` = ?;", [id]);
                console.debug("Purchase order ID: %s", purchase_order_id[0])
                res.send({code: "Success", purchase_order_id: purchase_order_id})
                }
 	catch(err){
        console.log(err)
 		res.status(400).send({msg: 'Failed getting purchase_order_id for transaction', err});
 	}
 }
