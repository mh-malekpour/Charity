/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DonatedService } from './Donated.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-donated',
  templateUrl: './Donated.component.html',
  styleUrls: ['./Donated.component.css'],
  providers: [DonatedService]
})
export class DonatedComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  dId = new FormControl('', Validators.required);
  isCash = new FormControl('', Validators.required);
  value = new FormControl('', Validators.required);
  owner1 = new FormControl('', Validators.required);
  owner2 = new FormControl('', Validators.required);

  constructor(public serviceDonated: DonatedService, fb: FormBuilder) {
    this.myForm = fb.group({
      dId: this.dId,
      isCash: this.isCash,
      value: this.value,
      owner1: this.owner1,
      owner2: this.owner2
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceDonated.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.aut.mathcs.blockchain.Donated',
      'dId': this.dId.value,
      'isCash': this.isCash.value,
      'value': this.value.value,
      'owner1': this.owner1.value,
      'owner2': this.owner2.value
    };

    this.myForm.setValue({
      'dId': null,
      'isCash': null,
      'value': null,
      'owner1': null,
      'owner2': null
    });

    return this.serviceDonated.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'dId': null,
        'isCash': null,
        'value': null,
        'owner1': null,
        'owner2': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.aut.mathcs.blockchain.Donated',
      'isCash': this.isCash.value,
      'value': this.value.value,
      'owner1': this.owner1.value,
      'owner2': this.owner2.value
    };

    return this.serviceDonated.updateAsset(form.get('dId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceDonated.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceDonated.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'dId': null,
        'isCash': null,
        'value': null,
        'owner1': null,
        'owner2': null
      };

      if (result.dId) {
        formObject.dId = result.dId;
      } else {
        formObject.dId = null;
      }

      if (result.isCash) {
        formObject.isCash = result.isCash;
      } else {
        formObject.isCash = null;
      }

      if (result.value) {
        formObject.value = result.value;
      } else {
        formObject.value = null;
      }

      if (result.owner1) {
        formObject.owner1 = result.owner1;
      } else {
        formObject.owner1 = null;
      }

      if (result.owner2) {
        formObject.owner2 = result.owner2;
      } else {
        formObject.owner2 = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'dId': null,
      'isCash': null,
      'value': null,
      'owner1': null,
      'owner2': null
      });
  }

}
