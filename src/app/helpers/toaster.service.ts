import { Component, Injectable } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
@Injectable({
    providedIn: 'root',
})
export class ToastrMessages {
    constructor(private toastrService: NbToastrService) { }

    config: ToasterConfig;

    destroyByClick = true;
    duration = 5000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;

    showToast(type: NbToastStatus, title: string, body: any) {
        const config = {
            status: type,
            destroyByClick: this.destroyByClick,
            duration: this.duration,
            hasIcon: this.hasIcon,
            position: this.position,
            preventDuplicates: this.preventDuplicates,
        };
        const titleContent = title ? `${title}` : '';

        this.toastrService.show(
            body,
            `${titleContent}`,
            config);
    }
}
