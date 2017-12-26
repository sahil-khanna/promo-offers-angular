import {NgModule} from '@angular/core';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatProgressSpinnerModule,
    MatRadioModule } from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatRadioModule
    ],
    exports: [
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatRadioModule
    ]
})

export class MaterialModule {

}
