import { take, switchMap } from "rxjs/operators";
import { interval, of, timer } from "rxjs";

// Create an Observable that will publish a value on an interval
const secondsCounter = interval(1000);
// Subscribe to begin publishing values
secondsCounter.subscribe(n =>
  console.log(`It's been ${n} seconds since subscribing!`)
);
timer(5000)
  .pipe(switchMap(() => secondsCounter))
  .subscribe(n => console.log(`It's been ${n} seconds since subscribing!`));
