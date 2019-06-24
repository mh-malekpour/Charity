/**
 * Track the help of a donor from donor to charityCorp
 * @param {org.aut.mathcs.blockchain.Help} help - the help to be processed
 * @transaction
 */

async function handleHelp(help){
  	
  	if (help.donated.owner.credit.value >= help.donated.price.value){
        
        help.donated.owner.credit.value -= help.donated.price.value;
        help.charityCorp.balance.value += help.donated.price.value;
        

        let Registry2 = await getAssetRegistry('org.aut.mathcs.blockchain.Charency');
        await Registry2.update(help.charityCorp.balance);

        let Registry3 = await getAssetRegistry('org.aut.mathcs.blockchain.Charency');
        await Registry3.update(help.donated.owner.credit);

      
      	help.donated.owner = null;
      	help.donated.currentCharity = help.charityCorp;
      
      	let Registry1 = await getAssetRegistry('org.aut.mathcs.blockchain.Donated');
        await Registry1.update(help.donated);
      
    }else{
      	//alert('Not enough credit for donation!');
	console.log('Not enough credit for donation');
    }
  
}

/**
 * Track the receive of a donor from donor to charityCorp
 * @param {org.aut.mathcs.blockchain.Receive} receive - the receive to be processed
 * @transaction
 */
async function handleReceive(receive){
  
  	
    
    if (receive.charityCorp.balance.value >= receive.donated.price.value){

      receive.charityCorp.balance.value -= receive.donated.price.value;
      receive.newOwner.credit.value += receive.donated.price.value;
      
    
      let Registry1 = await getAssetRegistry('org.aut.mathcs.blockchain.Charency');
      await Registry1.update(receive.newOwner.credit);
      
      let Registry2 = await getAssetRegistry('org.aut.mathcs.blockchain.Charency');
      await Registry2.update(receive.charityCorp.balance);
      
      receive.donated.currentCharity = null;
      receive.donated.owner = receive.newOwner;
      
      let Registry3 = await getAssetRegistry('org.aut.mathcs.blockchain.Donated');
      await Registry3.update(receive.donated);
    
    }else{
      //alert("not enough balance for spend the donation");
      console.log('Not enough balance for spend donation!');
    }
  
}

async function distributeChareny(){
    let result = await query('selectAllCharityCorps');

    for (let i = 0; i < result.length; i++){
       result[i].balance += 100; 
    }
}
