import { Component, Input } from '@angular/core';
import { IDailyStats, IStats, IStatsPerDay } from '@/types';
import { dayName } from '@/functions/day-name.function';
import { FormService } from '@/services/form.service';

@Component({
  selector: 'app-day-stats',
  templateUrl: './day-stats.component.html',
  styleUrls: ['./day-stats.component.css']
})
export class DayStatsComponent {
  @Input({ required: true }) stats!: IDailyStats[];
  @Input() showContactDetails = false;

  public readonly dayName = dayName;

  public constructor(
    public fs: FormService,
  ) {}


  public allergies(foods: IStats["problematicFoods"]): Array<[string, string, number]> {
    return Object.keys(foods ?? {}).map(food => [
      this.fs.foodDetail(food).icon as string,
      this.fs.foodDetail(food).label,
      foods[food],
    ]);
  }

  public taskHelp(tasks: IStats["taskHelp"]): Array<[string, string, number]> {
    return Object.keys(tasks).map(t => [
      this.fs.helpDetail(t).icon as string,
      this.fs.helpDetail(t).label,
      tasks[t],
    ]);
  }

  public availableCarSeats (stats: IStatsPerDay): number {
    return (stats.amountHaveCar + stats.freeCarSeats) - stats.attending;
  }

} 