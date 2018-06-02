import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { tap, map, first } from "rxjs/operators";
import { IStory } from "../../services/data.types";

@Component({
	selector: "app-landing-screen",
	templateUrl: "./landing-screen.component.html",
	styleUrls: ["./landing-screen.component.scss"]
})
export class LandingScreenComponent implements OnInit {
	private _storyData: IStory[] = [];

	constructor(private _data: DataService) {}

	ngOnInit() {
		this._data.storyData$
			.pipe(
				map(data => {
					data.sort((a, b) => {
						return a.score > b.score ? -1 : 1;
					});
					return data;
				}),
				tap(data => (this._storyData = data))
			)
			.subscribe();
	}

	get storyData(): IStory[] {
		return this._storyData;
	}
}
