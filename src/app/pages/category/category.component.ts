import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'category.component.html'
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  newCategory = { name: '', description: '' };
  isEditing = false;
  editingCategoryId: number | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }


  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (error) => console.error('Error loading categories', error),
    });
  }

  showToast(icon: 'success' | 'error' | 'warning', title: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon,
      title,
    });
  }



  onSubmit() {
    if (this.isEditing && this.editingCategoryId !== null) {
      this.categoryService.updateCategory(this.editingCategoryId, this.newCategory.name, this.newCategory.description).subscribe({
        next: (updatedCategory) => {
          this.categories = this.categories.map((c) => (c.id === this.editingCategoryId ? updatedCategory : c));
          this.showToast('success', 'Category updated successfully.');
          this.resetForm();
        },
        error: () => this.showToast('error', 'Error updating category'),
      });
    } else {


      this.categoryService.createCategory(this.newCategory.name, this.newCategory.description).subscribe({
        next: (category) => {
          this.categories.unshift(category);
          this.showToast('success', 'Category added successfully.');
          this.resetForm();
        },
        error: () => this.showToast('error', 'Error adding category'),
      });
    }
  }



  editCategory(category: Category) {
    this.newCategory = { name: category.name, description: category.description };
    this.isEditing = true;
    this.editingCategoryId = category.id;
  }






  deleteCategory(category: Category) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {


      if (result.isConfirmed) {
        this.categoryService.deleteCategory(category.id).subscribe({
          next: () => {
            this.categories = this.categories.filter((c) => c.id !== category.id);
            this.showToast('success', 'Category deleted successfully.');
          },
          error: () => this.showToast('error', 'Error deleting category'),
        });
      }


    });
  }




  resetForm() {
    this.newCategory = { name: '', description: '' };
    this.isEditing = false;
    this.editingCategoryId = null;
  }




}
