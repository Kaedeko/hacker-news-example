import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";

import { DataService } from "../../services/data.service";
import { IApiItem } from "../../services/data.types";

@Component({
	selector: "app-story-view",
	templateUrl: "./story-view.component.html",
	styleUrls: ["./story-view.component.scss"]
})
export class StoryViewComponent implements OnInit {
	private _story: IApiItem;
	private _comments: IApiItem[] = [];

	constructor(
		private _data: DataService,
		private _route: ActivatedRoute,
		private _router: Router
	) {}

	ngOnInit() {
		this._route.paramMap
			.pipe(
				switchMap(params => {
					const paramId = Number(params.get("id"));
					if (typeof paramId !== "number") {
						this._router.navigate(["/"]);
						throw new Error("ID value is not a number");
					}
					return this._data.fetchItem(<number>paramId);
				}),
				tap(item => {
					this._story = item;
					this._story.kids.forEach(id => this.fetchComments(id).subscribe());
				})
			)
			.subscribe();
	}

	get comments(): IApiItem[] {
		return this._comments;
	}

	get story(): IApiItem {
		return this._story;
	}

	private fetchComments(id: number): Observable<IApiItem> {
		return this._data.fetchItem(id).pipe(
			tap(item => {
				const itemIndex = this._comments.findIndex(comment => {
					return comment.id === id;
				});
				if (itemIndex !== -1) {
					this._comments[itemIndex] = item;
				} else {
					this._comments.push(item);
				}
				this._comments.sort((a, b) => {
					return a.score > b.score ? -1 : 1;
				});
			})
		);
	}
}
