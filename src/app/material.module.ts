import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatProgressSpinnerModule,
    MatRadioModule, MatMenuModule, MatIconModule, MatListModule, MatCardModule, MatDatepickerModule,
    MatNativeDateModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';

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
