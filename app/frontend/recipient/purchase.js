module.exports = async function purchase(req, res) {
	try {
        let amount = req.body.amount
        let recipient_id = req.body.recipient_id
        let retailer = req.body.retailer

        //Check if recipient has enough money
        const [savings] = await db.connection.query("SELECT `savings` FROM `recipient` WHERE `recipient_id` = ?;", [recipient_id]);
        if (amount > savings[0]) {
            res.status(400).send({code: 'Not enough funds', message:err.message});
        }

        //Make POST request to Interac: send money request to helping hands
        //https://gateway-web.beta.interac.ca/publicapi/api/v2/money-requests/send

        let update_recipient = "UPDATE `recipient` SET `savings` = ? WHERE `recipient_id` = ?;"
        let result = db.connection.query(update_recipient, [savings[0] - amount, recipient_id]);

		let insert_purchase_order = "INSERT INTO `purchase_order` (`retailer`, `timestamp`, `amount`, `items`, `receipt_image`) VALUES (?, CURRENT_TIMESTAMP, ?, '');"
        let result = db.connection.query(insert_purchase_order, [retailer, amount]);

 	 	res.send({code: "Purchase has been processed"})
 	}
 	catch(err){
 		res.status(400).send({code: 'Purchase processing failed', message:err.message});
 	}
 }