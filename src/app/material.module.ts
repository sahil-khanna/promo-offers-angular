import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatProgressSpinnerModule,
	MatRadioModule, MatMenuModule, MatCardModule,
	MatNativeDateModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';

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
		MatNativeDateModule
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
		MatNativeDateModule
	]
})

export class MaterialModule {

}
