import { ConstantsLib as c } from './constants-lib';

export class BankHolidayService {
    private cachedHolidays?: Set<string>;

    // Returns ISO dates (YYYY-MM-DD) for England and Wales bank holidays
    async getUkBankHolidays(): Promise<Set<string>> {
        if (!this.cachedHolidays) {
            this.cachedHolidays = await this.loadUkBankHolidays();
        }
        return this.cachedHolidays;
    }

    private async loadUkBankHolidays(): Promise<Set<string>> {
        const response = await fetch(c.BANK_HOLIDAYS_URL);
        if (!response.ok) {
            throw new Error(`Failed to load UK bank holidays: HTTP ${response.status}`);
        }
        const root = await response.json() as { 'england-and-wales': { events: { date: string }[] } };
        const holidays = new Set(root['england-and-wales'].events.map(event => event.date));
        if (holidays.size === 0) {
            throw new Error('No bank holidays found in the API response');
        }
        return holidays;
    }
}

export class WorkingDayService {
    constructor(private readonly bankHolidayService: BankHolidayService) {}

    async minusWorkingDays(start: Date, workingDaysToSubtract: number): Promise<Date> {
        const bankHolidays = await this.bankHolidayService.getUkBankHolidays();
        const date = new Date(start);
        let remaining = workingDaysToSubtract;

        while (remaining > 0) {
            date.setDate(date.getDate() - 1);
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const isHoliday = bankHolidays.has(WorkingDayService.toIsoDate(date));
            if (!isWeekend && !isHoliday) {
                remaining--;
            }
        }
        return date;
    }

    private static toIsoDate(date: Date): string {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${date.getFullYear()}-${month}-${day}`;
    }
}
