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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { DonatedComponent } from './Donated/Donated.component';
import { CharencyComponent } from './Charency/Charency.component';

import { DonorComponent } from './Donor/Donor.component';
import { CharityCorpComponent } from './CharityCorp/CharityCorp.component';
import { RecipientComponent } from './Recipient/Recipient.component';

import { HelpComponent } from './Help/Help.component';
import { ReciveComponent } from './Recive/Recive.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Donated', component: DonatedComponent },
  { path: 'Charency', component: CharencyComponent },
  { path: 'Donor', component: DonorComponent },
  { path: 'CharityCorp', component: CharityCorpComponent },
  { path: 'Recipient', component: RecipientComponent },
  { path: 'Help', component: HelpComponent },
  { path: 'Recive', component: ReciveComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
