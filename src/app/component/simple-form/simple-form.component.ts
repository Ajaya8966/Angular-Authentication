import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simple-form',
  standalone: true, // Enable standalone mode
  imports: [NgIf, FormsModule], // Import necessary modules
  template: `
    <div class="container">
      <h2>Simple Form</h2>
      <form (ngSubmit)="onSubmit()">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" [(ngModel)]="formData.name" name="name" required>
        </div>

        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" [(ngModel)]="formData.email" name="email" required>
        </div>

        <button type="submit">Submit</button>
      </form>

      <div *ngIf="submitted">
        <h3>Form Submitted Successfully</h3>
        <p><strong>Name:</strong> {{ formData.name }}</p>
        <p><strong>Email:</strong> {{ formData.email }}</p>
      </div>
    </div>
  `,
  styles: [`
    .container {
      width: 300px;
      margin: auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

    input {
      width: 100%;
      padding: 8px;
      margin: 5px 0;
    }

    button {
      background: blue;
      color: white;
      padding: 8px;
      border: none;
      cursor: pointer;
    }
  `]
})
export class SimpleFormComponent {
  formData = {
    name: '',
    email: ''
  };
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
}
