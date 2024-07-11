export class CustomDate {
  public date: Date;

  public constructor() {
    this.date = new Date();
  }

  public year() {
    return this.date.getFullYear();
  }

  public month() {
    return this.date.getMonth() + 1;
  }

  public day() {
    return this.date.getDate();
  }

  /**
   *
   * @returns `MM`
   */
  public padMonth() {
    return String(this.month()).padStart(2, "0");
  }

  /**
   *
   * @returns `dd`
   */
  public padDay() {
    return String(this.day()).padStart(2, "0");
  }

  /**
   *
   * @returns `YYYY-MM-dd`
   */
  public input() {
    return `${this.year()}-${this.padMonth()}-${this.padDay()}`;
  }

  /**
   * 
   * @param value `d-M-YYYY`
   * @returns `YYYY-MM-dd`
   */
  static to_input(value: string) {
    const dateRegex = new RegExp(/(?<year>\d{4})-(?<month>\d+)-(?<day>\d+)/);
    
    const result = dateRegex.exec(value)?.groups;

    if (!result) return new CustomDate().input();


    const year = result.year;
    const month = result.month.padStart(2, "0");
    const day = result.day.padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
}
