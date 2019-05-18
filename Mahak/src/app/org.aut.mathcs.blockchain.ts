import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.aut.mathcs.blockchain{
   export class Donated extends Asset {
      dId: string;
      isCash: boolean;
      value: Charency;
      owner1: CharityCorp;
      owner2: Recipient;
   }
   export class Donor extends Participant {
      doId: string;
      name: string;
      credit: Charency;
   }
   export class CharityCorp extends Participant {
      name: string;
      balance: Charency;
   }
   export class Recipient extends Participant {
      rid: string;
      recCredit: number;
      priority: number;
      location: string;
   }
   export class Charency extends Asset {
      cId: string;
      value: number;
      pubnum: number;
   }
   export class Help extends Transaction {
      Donated: Donated;
      charitycorp: CharityCorp;
   }
   export class Recive extends Transaction {
      Donated: Donated;
      recipient: Recipient;
   }
// }
