import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatProgressSpinnerModule,
	MatRadioModule, MatMenuModule, MatCardModule,
	MatNativeDateModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
	imports: [
		MatInputModule,
		MatButtonModule,
		MatToolbarModule,
		MatFormFieldModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatMenuModule,
		MatIconModule,
		MatTabsModule,
		MatListModule,
		MatSelectModule,
		MatCardModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatCheckboxModule
	],
	exports: [
		MatInputModule,
		MatButtonModule,
		MatToolbarModule,
		MatFormFieldModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatMenuModule,
		MatIconModule,
		MatTabsModule,
		MatListModule,
		MatSelectModule,
		MatCardModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatCheckboxModule
	]
})

export class MaterialModule {

}
