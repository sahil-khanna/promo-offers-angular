import {NgModule} from '@angular/core';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatProgressSpinnerModule,
    MatRadioModule, MatMenuModule, MatIconModule } from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatMenuModule,
        MatIconModule
    ],
    exports: [
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatMenuModule,
        MatIconModule
    ]
})

export class MaterialModule {

}
