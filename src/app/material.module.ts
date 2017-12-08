import {NgModule} from '@angular/core';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatFormFieldModule } from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule
    ],
    exports: [
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule
    ]
})

export class MaterialModule {

}
