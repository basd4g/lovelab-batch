type Interval = string;

const neighborDate = (
  date: Date,
  interval: Interval,
  isPast: boolean
): Date => {
  const diff = isPast === true ? -1 : 1;
  switch (interval) {
    case "oneday": {
      date.setDate(date.getDate() + diff);
      return date;
    }
    case "oneweek": {
      date.setDate(date.getDate() + diff * 7);
      return date;
    }
    case "onemonth": {
      const dateOrg = new Date(date.getTime());
      const monthOrg = date.getMonth();
      const monthNew = monthOrg + diff;
      date.setMonth(monthNew);
      if (date.getMonth() === monthNew) {
        return date;
      }
      // returnする日付に29日,30日,31日を返したがその月に存在しないときは月末の日に設定する。
      return new Date(
        dateOrg.getFullYear(),
        monthNew + 1,
        0,
        dateOrg.getHours(),
        dateOrg.getMinutes(),
        dateOrg.getSeconds()
      );
    }

    default: {
      throw new Error();
    }
  }
};

const calcFirstDeadlineDate = (
  firstdeadlinedate: Date,
  interval: Interval
): Date => {
  // タスクの生成
  // 生成するタスクのdeadlinedateは、date = firstdeadlinedate.getTime + intervalTime * n > now && nが最小
  let deadlinedate = firstdeadlinedate;
  const now = new Date();
  const nowMs = now.getTime();
  // deadlinedateが過去ならば次の回へ
  while (deadlinedate.getTime() < nowMs) {
    deadlinedate = neighborDate(deadlinedate, interval, false);
  }
  // deadlineが未来過ぎるならば戻して
  const nextIntervalDateMs = neighborDate(now, interval, false).getTime();
  while (deadlinedate.getTime() > nextIntervalDateMs) {
    deadlinedate = neighborDate(deadlinedate, interval, true);
  }
  return deadlinedate;
};

export default calcFirstDeadlineDate;
