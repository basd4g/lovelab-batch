class Oclock {
  static now(): Date{
    const date = new Date();
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }
  static next(): Date{
    const date = this.now();
    date.setHours( date.getHours()+1 );
    return date;
  }
}

export default Oclock;
