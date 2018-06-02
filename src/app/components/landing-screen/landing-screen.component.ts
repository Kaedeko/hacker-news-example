import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { tap } from "rxjs/operators";

@Component({
	selector: "app-landing-screen",
	templateUrl: "./landing-screen.component.html",
	styleUrls: ["./landing-screen.component.scss"]
})
export class LandingScreenComponent implements OnInit {
	public storyList: number[];
	public storyData: any[];

	constructor(private _data: DataService) {}

	ngOnInit() {
		this._data.storyList$.pipe(tap(val => (this.storyList = val))).subscribe();
		this._data.storyData$.pipe(tap(val => (this.storyData = val))).subscribe();
	}
}
