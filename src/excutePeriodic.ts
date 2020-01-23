import { CronJob } from 'cron';

const excuteOnTheOclocks = (job:()=>void) => {

  const sec = "0";
  const min = "0";
  const hour = "*";
  const dayOfMonth = "*";
  const month = "*";
  const dayOfWeek = "*";

  const cronString = `${sec} ${min} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  const cronJob = new CronJob(cronString, () => {
    // eslint-disable-next-line no-console
    console.log(`${new Date().toISOString()}: Excute Periodic.`);
    job();
  });

  cronJob.start();
};

export default excuteOnTheOclocks;
