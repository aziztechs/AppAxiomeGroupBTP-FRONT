import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChantierService } from '../../../services/chantier.service';
import { ChantierResponse } from '../../../models/chantier.model';
import { ChantierFormComponent } from '../chantier-form/chantier-form.component';

@Component({
  selector: 'app-chantier-list',
  templateUrl: './chantier-list.component.html',
  styleUrls: ['./chantier-list.component.scss']
})
export class ChantierListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'adresse', 'dateDebut', 'dateFin', 'statut', 'actions'];
  dataSource = new MatTableDataSource<ChantierResponse>([]);
  loading = true;
  error = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private chantierService: ChantierService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadChantiers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadChantiers(): void {
    this.loading = true;
    this.error = false;
    
    this.chantierService.getAllChantiers().subscribe({
      next: (chantiers) => {
        this.dataSource.data = chantiers;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des chantiers', err);
        this.error = true;
        this.loading = false;
        this.snackBar.open('Erreur lors du chargement des chantiers', 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openChantierForm(chantier?: ChantierResponse): void {
    const dialogRef = this.dialog.open(ChantierFormComponent, {
      width: '600px',
      data: { chantier }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadChantiers();
      }
    });
  }

  viewChantierDetails(id: number): void {
    this.router.navigate(['/chantiers', id]);
  }

  deleteChantier(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce chantier ?')) {
      this.chantierService.deleteChantier(id).subscribe({
        next: () => {
          this.snackBar.open('Chantier supprimé avec succès', 'Fermer', {
            duration: 3000
          });
          this.loadChantiers();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du chantier', err);
          this.snackBar.open('Erreur lors de la suppression du chantier', 'Fermer', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  getStatusClass(statut: string): string {
    switch (statut.toLowerCase()) {
      case 'en cours':
        return 'status-in-progress';
      case 'terminé':
        return 'status-completed';
      case 'planifié':
        return 'status-planned';
      case 'annulé':
        return 'status-cancelled';
      default:
        return '';
    }
  }
}

