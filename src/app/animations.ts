import {
  animate,
  query,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const listLoadAnimation = trigger("listLoadAnimation", [
	transition(":enter", [
		style({ transform: "translateX(100%)" }),
		animate("0.5s cubic-bezier(0.75,2.0,0,0.75)")
	])
]);

export const stateFadeAnimation = trigger("stateFadeAnimation", [
	transition("* => *", [
		query(":enter", [style({ opacity: 0 })], {
			optional: true
		}),
		query(
			":leave",
			[style({ opacity: 1 }), animate("0.25s", style({ opacity: 0 }))],
			{ optional: true }
		),
		query(
			":enter",
			[style({ opacity: 0 }), animate("0.25s", style({ opacity: 1 }))],
			{ optional: true }
		)
	])
]);
