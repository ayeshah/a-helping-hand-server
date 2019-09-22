var {user_model} = require('../../models')
var db = require('../../util/mysql_connection')

module.exports = async function donate(req, res) {
	try {
        let amount = req.body.amount
        let donor_id = req.body.donor_id
        let recipient_id = req.body.recipient_id

        //Charge donor

        //Update funds if successful payment
        let update_recipient = "UPDATE `recipient` SET `savings` = `savings` + ? WHERE `recipient_id` = ?;"
        let result = db.connection.query(update_recipient, [amount, recipient_id]);

        let insert_transaction = "INSERT INTO `transaction` (`tx_type`, `amount`, `donor_id`, `recipient_id`, `category`, `purchase_order_id`, `date`) VALUES (1, ?, ?, ?, '', '', CURRENT_TIMESTAMP);"
        result = db.connection.query(insert_transaction, [amount, donor_id, recipient_id,]);

 	 	res.send({code: "Donation has been processed"})
 	}
 	catch(err){
 		res.status(400).send({code: 'Unable to process donation', message:err.message});
 	}
 }