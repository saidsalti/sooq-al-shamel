import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '@shared/components/configm-dialog/configm-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}

  confirm(
    title: string,
    message: string,
    confirmText: string = 'Confirm',
    cancelText: string = 'Cancel'
  ): Observable<boolean> {


    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',

    });

    return dialogRef.afterClosed();
  }
}
