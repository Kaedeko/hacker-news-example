import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { environment } from "../../environments/environment";
import { DataService } from "./data.service";

describe("DataService", () => {
	let service: DataService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [DataService]
		});
		service = TestBed.get(DataService);
		httpMock = TestBed.get(HttpTestingController);
	});

	it("should be created", () => {
		// World's most basic test. Guess it ensures there aren't any errors with the test setup.
		expect(service).toBeTruthy();
	});

	it("should return an array of numbers from #fetchBestStories", (done: DoneFn) => {
		service.fetchBestStories().subscribe(value => {
			expect(value).toEqual([123, 456, 789]);
			done();
		});

		const mockRequest = httpMock.expectOne(
			`${environment.restUri}/beststories.json`
		);
		mockRequest.flush([123, 456, 789]);
	});

	it("should throw an error if #fetchBestStories fails", (done: DoneFn) => {
		service.fetchBestStories().subscribe(
			value => {
				fail("expected an error");
				done();
			},
			error => {
				expect(error.error.type).toBe("some error");
				done();
			}
		);

		const mockRequest = httpMock.expectOne(
			`${environment.restUri}/beststories.json`
		);
		mockRequest.error(new ErrorEvent("some error"));
		httpMock.verify();
	});

	it("should return the requested api item object from #fetchItem", (done: DoneFn) => {
		service.fetchItem(1).subscribe(value => {
			expect(value.id).toBe(1);
			done();
		});

		const mockRequest = httpMock.expectOne(`${environment.restUri}item/1.json`);
		mockRequest.flush({ id: 1 });
	});

	it("should throw an error if #fetchItem fails", (done: DoneFn) => {
		service.fetchItem(1).subscribe(
			value => {
				fail("expected an error");
				done();
			},
			error => {
				expect(error.error.type).toBe("some error");
				done();
			}
		);

		const mockRequest = httpMock.expectOne(`${environment.restUri}item/1.json`);
		mockRequest.error(new ErrorEvent("some error"));
		httpMock.verify();
	});
});
