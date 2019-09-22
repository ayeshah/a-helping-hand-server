module.exports = async function classify(req, res) {
	try {
        let recipient_id = req.body.recipient_id
        let purchase_order_id = req.body.purchase_order_id

        //Runs OCR & spelling correction
        // let items = ocr(receipt_url)
        let items = [['049000052688', 2.00, 'Food'], ['403450000376', 5.00, 'Food'], ['000038649813', 30.00, 'Clothing']]
        
        // Update items in purchase order
        // let update_purchase_order_items = "UPDATE `purchase_order` SET `items` = ? `purchase_order_id` = ?;"
        // let result = db.connection.query(update_purchase_order_items, [items, purchase_order_id]);
        
        // classify purchases
        let transactions = {"Food": 7.00, "Clothing": 30.00, "Inelegible": 0.00}

        if (transactions['Inelegible'] > 0.0) {
            let update_recipient_strikes = "UPDATE `recipient` SET `strikes` = `strikes` + 1 WHERE `recipient_id` = ?;"
            let result = db.connection.query(update_recipient_strikes, [recipient_id]);
        }

		let insert_transaction = "INSERT INTO `transaction` (`tx_type`, `amount`, `donor_id`, `recipient_id`, `category`, `purchase_order_id`, date`) VALUES (0, ?, '', ?, ?, ?, CURRENT_TIMESTAMP);"
        let result = db.connection.query(insert_transaction, [transactions['Food'], recipient_id, "Food", purchase_order_id]);
        let result = db.connection.query(insert_transaction, [transactions['Clothing'], recipient_id, "Clothing", purchase_order_id]);

 	 	res.send({code: "Purchases have been classified"})
 	}
 	catch(err){
 		res.status(400).send({code: 'Purchase classification failed', message:err.message});
 	}
 }