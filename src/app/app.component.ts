import { Component } from "@angular/core";

import { stateFadeAnimation } from "./animations";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	animations: [stateFadeAnimation]
})
export class AppComponent {
	title = "app";
}
