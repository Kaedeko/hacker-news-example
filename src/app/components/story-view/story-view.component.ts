import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subject } from "rxjs";

import { DataService } from "../../services/data.service";
import { IApiItem } from "../../services/data.types";

@Component({
	selector: "app-story-view",
	templateUrl: "./story-view.component.html",
	styleUrls: ["./story-view.component.scss"]
})
export class StoryViewComponent implements OnInit {
	private _story$: Subject<IApiItem>;
	private _comments$: Subject<IApiItem[]>;

	constructor(private _data: DataService, private _route: ActivatedRoute) {
		this._route.paramMap.pipe();
	}

	ngOnInit() {}

	get story$(): Observable<IApiItem> {
		return this._story$;
	}

	get comments$(): Observable<IApiItem[]> {
		return this._comments$;
	}
}
