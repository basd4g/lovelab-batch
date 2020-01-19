import connectDataBase from "./db";
import generateTasks from "./generateTasks"

const forceReset =
  process.argv.findIndex(arg => {
    return arg === "--reset";
  }) !== -1;

connectDataBase(forceReset).then(() => {
  // eslint-disable-next-line no-console
  console.log("\nSuccess to connect database\n");
  
  // タスク生成
  generateTasks();
  
  // eslint-disable-next-line no-console
  console.log(`Success to run lovelab-batch`);
});
