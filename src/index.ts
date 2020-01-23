import connectDataBase from "./db";
import generateTasks from "./generateTasks"
import excuteOnTheOclocks from "./excutePeriodic"

const forceReset =
  process.argv.findIndex(arg => {
    return arg === "--reset";
  }) !== -1;

connectDataBase(forceReset).then(() => {
  // eslint-disable-next-line no-console
  console.log("\nSuccess to connect database\n");
  
  // アプリ立ち上げ時により過去に生成されていないタスクがあれば、生成する。
  // generateTasks()は何度実行しても、タスク生成が重複することはない。(なぜなら、生成時に同時にnextgeneratingdateも更新するので)
  generateTasks();

  // タスク生成
  excuteOnTheOclocks( () => {
    // eslint-disable-next-line no-console
    console.log("Run cron");
    generateTasks();
  });
  
  // eslint-disable-next-line no-console
  console.log(`Success to run lovelab-batch`);
});

