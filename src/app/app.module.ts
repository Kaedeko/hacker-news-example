import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";

import { LandingScreenComponent } from "./components/landing-screen/landing-screen.component";
import { environment } from "../environments/environment.prod";

@NgModule({
	declarations: [AppComponent, LandingScreenComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
