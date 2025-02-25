import { Component } from '@angular/core';
import { ApiCheckModule } from "../components/api-check/api-check.module";
import { ShoppingCatalogModule } from "../components/shopping-catalog/shopping-catalog.module";
import { SupplyRequestFormModule } from "../components/supply-request-form/supply-request-form.module";

@Component({
  selector: "log-root",
  templateUrl: "./app.component.html",
  standalone: true,
  styleUrls: ["./app.component.scss"],
  imports: [
    ApiCheckModule,
    ShoppingCatalogModule,
    SupplyRequestFormModule
  ]
})
export class AppComponent {
  title = 'front';
}
