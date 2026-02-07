import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twelvehourformat'
})
export class TwelvehourformatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return this.Convert(value)
  }
  private Convert(value:any):string{
    let HourMiniutes = String(value)
    let Hours = HourMiniutes.substr(0,2)
    console.log('value',Hours)
    let HoursInt = Number(Hours)
    if(HoursInt > 12){
      let hourformtted =  HoursInt - 12
      if(hourformtted<10){
        return '0' + HourMiniutes.replace(Hours,String(hourformtted))  +' PM'
      }
      return HourMiniutes.replace(Hours,String(hourformtted)) +' PM'
    }
    return HourMiniutes.replace(Hours,String(HoursInt)) +' AM'
  }

}
