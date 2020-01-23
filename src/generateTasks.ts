import { TaskGenerators } from './models/taskGenerators';
 import { Tasks } from './models/tasks';
import { Op } from 'sequelize';
import Oclock from './Oclock';
import calcFirstDeadlineDate from './calcFirstDeadlineDate';
import suggestWhoisdoinguserid from './suggestWhoisdoinguserid';

const generateTasks = () => {
  console.log("get taskGenerators to have to generate tasks");

  // nextgeneratingdateが現在時とそれより古いものを抽出する
  TaskGenerators.findAll({
    where: {
      nextgeneratingdate: {
//        [Op.gte]: Oclock.now(),// 現在時ちょうど以降
        [Op.lt]: Oclock.next()// 現在+1時ちょうどより前
      }
    }
  })
  .then( taskGenerators => {

    console.log(`${new Date().toISOString()}: generating tasks.`);

    const promises = taskGenerators.map( taskGenerator => {

      console.log(`taskGeneratorId:${taskGenerator.id}`);

      // タスク生成のためのデータを揃える
      // deadlinedateを計算する
      const deadlinedate = calcFirstDeadlineDate( taskGenerator.firstdeadlinedate, taskGenerator.interval );
      const nextgeneratingdate = new Date(deadlinedate.getTime());
      nextgeneratingdate.setHours( deadlinedate.getHours()+1 );

      return suggestWhoisdoinguserid(taskGenerator.groupid)
      .then( whoisdoinguserid => {

        // タスク生成
        const taskRequest = {
          name: taskGenerator.name,
          comment: taskGenerator.comment,
          groupid: taskGenerator.groupid,
          whoisdoinguserid,
          deadlinedate
        };
        console.log(taskRequest);
        return Tasks.create(taskRequest);
      })
      .then( task => {
        console.log(`Added task id:${task.id}`);

        // 定期タスクのnextgeneratingdateを更新
        console.log(`Updated taskGenerator {id:${taskGenerator.id}, nextgeneratingdate:${nextgeneratingdate}}`);
        return TaskGenerators.update({nextgeneratingdate},{where:{id:taskGenerator.id}});
      });
    });

    Promise.all( promises )
    .then( () => {
      console.log(`${new Date().toISOString()}: Finished to generating tasks.`);
    });
  });
}

export default generateTasks;
