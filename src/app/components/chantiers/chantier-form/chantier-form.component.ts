import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChantierService } from '../../../services/chantier.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { BudgetService } from '../../../services/budget.service';
import { ChantierRequest, ChantierResponse } from '../../../models/chantier.model';
import { UtilisateurResponse } from '../../../models/utilisateur.model';
import { BudgetResponse } from '../../../models/budget.model';

@Component({
  selector: 'app-chantier-form',
  templateUrl: './chantier-form.component.html',
  styleUrls: ['./chantier-form.component.scss']
})
export class ChantierFormComponent implements OnInit {
  chantierForm!: FormGroup;
  isEditMode = false;
  loading = false;
  responsables: UtilisateurResponse[] = [];
  budgets: BudgetResponse[] = [];
  statuts = ['Planifié', 'En cours', 'Terminé', 'Annulé'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ChantierFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { chantier?: ChantierResponse },
    private chantierService: ChantierService,
    private utilisateurService: UtilisateurService,
    private budgetService: BudgetService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadResponsables();
    this.loadBudgets();
    
    if (this.data?.chantier) {
      this.isEditMode = true;
      this.populateForm(this.data.chantier);
    }
  }

  initForm(): void {
    this.chantierForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      adresse: ['', [Validators.required, Validators.maxLength(200)]],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      statut: ['Planifié', Validators.required],
      budgetId: [null],
      responsableId: [null]
    });
  }

  populateForm(chantier: ChantierResponse): void {
    this.chantierForm.patchValue({
      nom: chantier.nom,
      description: chantier.description,
      adresse: chantier.adresse,
      dateDebut: chantier.dateDebut,
      dateFin: chantier.dateFin,
      statut: chantier.statut,
      budgetId: chantier.budgetId,
      responsableId: chantier.responsableId
    });
  }

  loadResponsables(): void {
    this.utilisateurService.getUtilisateursByRole('CHEF_CHANTIER').subscribe({
      next: (responsables) => {
        this.responsables = responsables;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des responsables', err);
      }
    });
  }

  loadBudgets(): void {
    this.budgetService.getAllBudgets().subscribe({
      next: (budgets) => {
        this.budgets = budgets;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des budgets', err);
      }
    });
  }

  onSubmit(): void {
    if (this.chantierForm.invalid) {
      return;
    }

    this.loading = true;
    const chantierData: ChantierRequest = this.chantierForm.value;

    if (this.isEditMode) {
      this.chantierService.updateChantier(this.data.chantier!.id, chantierData).subscribe({
        next: (response) => {
          this.snackBar.open('Chantier mis à jour avec succès', 'Fermer', {
            duration: 3000
          });
          this.dialogRef.close(response);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du chantier', err);
          this.snackBar.open('Erreur lors de la mise à jour du chantier', 'Fermer', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          this.loading = false;
        }
      });
    } else {
      this.chantierService.createChantier(chantierData).subscribe({
        next: (response) => {
          this.snackBar.open('Chantier créé avec succès', 'Fermer', {
            duration: 3000
          });
          this.dialogRef.close(response);
        },
        error: (err) => {
          console.error('Erreur lors de la création du chantier', err);
          this.snackBar.open('Erreur lors de la création du chantier', 'Fermer', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

