import { async, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

import { AppComponent } from "./app.component";

describe("AppComponent", () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, BrowserAnimationsModule],
			declarations: [AppComponent]
		}).compileComponents();
	}));
	it("should create the hacker news example application", async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
	it(`should have as title 'hacker news example'`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual("Hacker News Example");
	}));
	it("should render the router outlet component", async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector("router-outlet")).toBeDefined();
	}));
});
