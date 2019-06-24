import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.aut.mathcs.blockchain{
   export class Donated extends Asset {
      dID: string;
      isCash: boolean;
      price: Charency;
      currentCharity: CharityCorp;
      owner: Person;
   }
   export class CharityCorp extends Participant {
      name: string;
      balance: Charency;
   }
   export class Charency extends Asset {
      cID: string;
      value: number;
   }
   export class Person extends Participant {
      pID: string;
      name: string;
      location: string;
      priority: number;
      credit: Charency;
   }
   export class Help extends Transaction {
      donated: Donated;
      charityCorp: CharityCorp;
   }
   export class Receive extends Transaction {
      donated: Donated;
      charityCorp: CharityCorp;
      newOwner: Person;
   }
// }
