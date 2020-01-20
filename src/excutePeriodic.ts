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
  const sec = when.sec==null?'*':when.sec.toString();
  const min = when.min==null?'*':when.min.toString();
  const hour = when.hour==null?'*':when.hour.toString();
  const dayOfMonth = when.dayOfMonth==null?'*':when.dayOfMonth.toString();
  const month = when.month==null?'*':when.month.toString();
  const dayOfWeek = when.dayOfWeek==null?'*':when.dayOfWeek.toString();
  const cronString = `${sec} ${min} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`

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

  excutePeriodic(excutingInterval, ()=>{
    console.log(`${new Date().toISOString()}: Excute Periodic.`);
    job();
  });
};

export { excutePeriodic, excuteOnTheHour, ExcutingInterval };
