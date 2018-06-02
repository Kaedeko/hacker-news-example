import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
	imports: [
		CommonModule,
		MatToolbarModule,
		MatListModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule
	],
	declarations: [],
	exports: [
		MatToolbarModule,
		MatListModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule
	]
})
export class MaterialModule {}
