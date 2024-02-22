import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { hello, sharedLib } from '@monorepo-test/shared-lib';
import { ApiService } from './services/api.service';
import { HelloApiStandaloneComponent } from './components/hello-api-standalone.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, HelloApiStandaloneComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'web-ui';

  helloFromAPI = '- non connesso alle API -';

  constructor(
    private readonly api: ApiService,
  ) {
    console.log(sharedLib());
    hello();
    this.apiTest();
  }

  async apiTest() {
    try {
      const res = await this.api.test.askHello();
      if (res?.message) {
        this.helloFromAPI = res.message;
      }
    } catch (ex) {
      console.error(ex);
    }
  }
}

