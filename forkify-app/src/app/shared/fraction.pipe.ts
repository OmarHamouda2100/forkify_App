import { Pipe, PipeTransform } from "@angular/core";
import Fraction from "fraction.js";

@Pipe({
  name: 'fraction',
  standalone: true
})

export class FractionPipe implements PipeTransform {
  transform(value: number) {
    const fraction = new Fraction(value)
    const whole: number | any = Math.floor(Number(fraction.n) / Number(fraction.d))
    const numerator: number | any = Number(fraction.n) % Number(fraction.d);
    const denominator: number | any = fraction.d;

    return numerator > 0 ? `${whole} ${numerator}/${denominator}` : `${whole}`;
  }
}
