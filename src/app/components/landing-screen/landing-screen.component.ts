import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { tap } from "rxjs/operators";

@Component({
	selector: "app-landing-screen",
	templateUrl: "./landing-screen.component.html",
	styleUrls: ["./landing-screen.component.scss"]
})
export class LandingScreenComponent implements OnInit {
	constructor(private _data: DataService) {}

	ngOnInit() {
		this._data.storyList$.pipe(tap(val => console.log(val))).subscribe();
	}
}
