import { CronJob } from 'cron';

interface ExcutingInterval  {
  sec:number|null;
  min:number|null;
  hour:number|null;
  dayOfMonth:number|null;
  month:number|null;
  dayOfWeek:number|null;
}

const excutePeriodic = (when:ExcutingInterval, job:()=>void ) => {
  const cronString = `${when.sec||'*'} ${when.min||'*'} ${when.hour||'*'} ${when.dayOfMonth||'*'} ${when.month||'*'} ${when.dayOfWeek||'*'}`;

  const cronJob = new CronJob(cronString, job);
  cronJob.start();
}

const excuteOnTheHour = (job:()=>void) => {
  const excutingInterval:ExcutingInterval = {
    sec:0,
    min:0,
    hour:null,
    dayOfMonth:null,
    month:null,
    dayOfWeek:null
  };

  excutePeriodic(excutingInterval, job);
};

export { excutePeriodic, excuteOnTheHour, ExcutingInterval };
