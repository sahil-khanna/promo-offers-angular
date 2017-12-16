import {NgModule} from '@angular/core';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatProgressSpinnerModule
    ]
})

export class MaterialModule {

}
