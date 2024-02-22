import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hello-api-standalone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hello-api-standalone.component.html',
  styleUrl: './hello-api-standalone.component.scss',
})
export class HelloApiStandaloneComponent {
  @Input() text?: string;
}
