import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { tap } from "rxjs/operators";

@Component({
	selector: "app-landing-screen",
	templateUrl: "./landing-screen.component.html",
	styleUrls: ["./landing-screen.component.scss"]
})
export class LandingScreenComponent implements OnInit {
	private _storyList: number[];
	private _storyData: any[] = [];

	constructor(private _data: DataService) {}

	ngOnInit() {
		this._data.storyList$.pipe(tap(val => (this._storyList = val))).subscribe();
		this._data.storyData$.pipe(tap(val => (this._storyData = val))).subscribe();
	}

	get storyList(): number[] {
		return this._storyList;
	}

	public storyData(id: number): any {
		return JSON.stringify(this._storyData[id]);
	}
}
