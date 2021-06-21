import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/@root/confirm-dialog/confirm-dialog.component';
import { Tool } from 'src/models/tool.model';
import { ToolService } from 'src/services/tool/tool.service';
import { AuthService } from 'src/services/AuthService';
import { MemberService } from 'src/services/member/member.service';
import { ToolFormComponent } from '../tool-form-component/tool-form.component';

@Component({
  templateUrl: './tool-list.component.html'
})
export class ToolListComponent implements OnInit {

  source: MatTableDataSource<Tool> = new MatTableDataSource();

  isReady = false;

  currentUser = this.authService.currentUserState;

  displayedColumns: string[] = ['ID', 'Author Name', 'Creation Date', 'Source', 'Actions'];

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 5;

  constructor(
    private memberService: MemberService,
    private toolService: ToolService,
    private authService: AuthService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  openDialog(action: 'ADD' | 'EDIT' | 'DELETE', id?: string) {
    if (action === 'DELETE') {
      this.dialog.open(ConfirmDialogComponent, {
      }).afterClosed().pipe().subscribe(isDeleteConfirmed => {
        if (isDeleteConfirmed && id) {
          this.toolService.delete(id).then(() => this.fetchData());
        }
      });
    } else {
      this.dialog.open(ToolFormComponent, {
        width: '80%',
        ...{ data: id }
      }).afterClosed().subscribe((results: "ERROR" | "SUCCESS") => {
        this.fetchData();
        switch (results) {
          case "SUCCESS":
            this._snackBar.open("L'outil' a été modifié avec succès.", "Ok", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: this.durationInSeconds * 1000,
              panelClass: 'snack-color-validate'
            });
            break;
          case "ERROR":
            this._snackBar.open("Une erreur inattendue s'est produite.", "Ok", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: this.durationInSeconds * 1000,
              panelClass: 'snack-color-validate'
            });
            break;
          default:
            break;
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.source.filter = filterValue.trim().toLowerCase();
  }

  private fetchData(): void {
    this.toolService.getAll().then(tools => {
      this.memberService.getAll().then(members => {
        this.source.data = tools
          .map(tool => ({
            ...tool,
            author: members.find(member => member.id === tool.author_id)
          }));
        this.isReady = true;
      })
    });
  }

}
