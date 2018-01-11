import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatProgressSpinnerModule,
    MatRadioModule, MatMenuModule, MatIconModule, MatListModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';

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
        MatListModule
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
        MatListModule
    ]
})

export class MaterialModule {

}
