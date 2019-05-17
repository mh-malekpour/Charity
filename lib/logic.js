async function handleHelp(help) {

    help.donated.owner1 = help.charitycorp;
    let assetRegistry = await getAssetRegistry('org.aut.mathcs.blockchain.Donated');
    await assetRegistry.update(help.donated);

    help.donor.credit.value -= help.donated.value;
    help.charitycorp.balance.value += help.donated.value;
}

async function handleReceive(receive) {

    receive.donated.owner2 = receive.recipient;
    let assetRegistry = await getAssetRegistry('org.aut.mathcs.blockchain.Donated');
    await assetRegistry.update(receive.donated);

    receive.charitycorp.credit.value -= receive.donated.value;
    receive.recipient.recCredit.value += receive.donated.value;
}

function distributeChareny(){
    let result = await query('selectAllCharityCorps');

    for (let i = 0; i < result.length; i++){
       result[i].balance += 100; 
    }
}
