import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";

import { LandingScreenComponent } from "./components/landing-screen/landing-screen.component";
import { environment } from "../environments/environment.prod";
import { StoryViewComponent } from "./components/story-view/story-view.component";

const appRoutes: Routes = [{ path: "", component: LandingScreenComponent }];

@NgModule({
	declarations: [AppComponent, LandingScreenComponent, StoryViewComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(appRoutes, { enableTracing: false }),
		MaterialModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
