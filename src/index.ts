import connectDataBase from "./db";
import generateTasks from "./generateTasks"
import { excuteOnTheHour } from "./excutePeriodic"

const forceReset =
  process.argv.findIndex(arg => {
    return arg === "--reset";
  }) !== -1;

connectDataBase(forceReset).then(() => {
  // eslint-disable-next-line no-console
  console.log("\nSuccess to connect database\n");
  
  // タスク生成
  excuteOnTheHour( () => {
    // eslint-disable-next-line no-console
    console.log("Run cron");
    generateTasks();
  });
  
  // eslint-disable-next-line no-console
  console.log(`Success to run lovelab-batch`);
});

