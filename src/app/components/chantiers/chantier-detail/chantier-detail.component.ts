import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChantierService } from '../../../services/chantier.service';
import { FactureService } from '../../../services/facture.service';
import { ChantierDetailResponse } from '../../../models/chantier.model';
import { FactureResponse } from '../../../models/facture.model';
import { ChantierFormComponent } from '../chantier-form/chantier-form.component';

@Component({
  selector: 'app-chantier-detail',
  templateUrl: './chantier-detail.component.html',
  styleUrls: ['./chantier-detail.component.scss']
})
export class ChantierDetailComponent implements OnInit {
  chantierId!: number;
  chantier: ChantierDetailResponse | null = null;
  factures: FactureResponse[] = [];
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chantierService: ChantierService,
    private factureService: FactureService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.chantierId = +id;
        this.loadChantierDetails();
        this.loadFactures();
      } else {
        this.router.navigate(['/chantiers']);
      }
    });
  }

  loadChantierDetails(): void {
    this.loading = true;
    this.error = false;
    
    this.chantierService.getChantierDetails(this.chantierId).subscribe({
      next: (data) => {
        this.chantier = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des détails du chantier', err);
        this.error = true;
        this.loading = false;
        this.snackBar.open('Erreur lors du chargement des détails du chantier', 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  loadFactures(): void {
    this.factureService.getFacturesByChantier(this.chantierId).subscribe({
      next: (data) => {
        this.factures = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des factures', err);
      }
    });
  }

  editChantier(): void {
    if (!this.chantier) return;
    
    const dialogRef = this.dialog.open(ChantierFormComponent, {
      width: '600px',
      data: { chantier: this.chantier }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadChantierDetails();
      }
    });
  }

  deleteChantier(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce chantier ?')) {
      this.chantierService.deleteChantier(this.chantierId).subscribe({
        next: () => {
          this.snackBar.open('Chantier supprimé avec succès', 'Fermer', {
            duration: 3000
          });
          this.router.navigate(['/chantiers']);
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

  goBack(): void {
    this.router.navigate(['/chantiers']);
  }
}

