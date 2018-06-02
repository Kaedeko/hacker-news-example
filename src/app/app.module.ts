import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { LandingScreenComponent } from "./components/landing-screen/landing-screen.component";
import { StoryViewComponent } from "./components/story-view/story-view.component";
import { MaterialModule } from "./material/material.module";

const appRoutes: Routes = [
	{ path: "", component: LandingScreenComponent },
	{ path: "story/:id", component: StoryViewComponent },
	{ path: "story", redirectTo: "", pathMatch: "full" },
	{ path: "**", redirectTo: "" }
];

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
