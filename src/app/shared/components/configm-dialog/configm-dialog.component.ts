import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, model, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-configm-dialog',
  templateUrl: './configm-dialog.component.html',
  styleUrls: ['./configm-dialog.component.css'],
  standalone:true,
  imports:[ MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class DialogOverviewExampleDialog  {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);

  @Input() title?:string;
  @Input({required:true}) message?:string;
  @Input()cancelButtonLabel='الغاء الأمر';
  @Input()okButtonLable='نعم';
  @Output() click=new EventEmitter<void>();
  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick(){
    this.click.emit();
  }
}
