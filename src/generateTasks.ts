import { TaskGenerators } from './models/taskGenerators';
import { Op } from 'sequelize';
import Oclock from './Oclock';

const generateTasks = () => {
  console.log("get taskGenerators to have to generate tasks");
  TaskGenerators.findAll({
    where: {
      nextgeneratingdate: {
        [Op.gte]: Oclock.now(),// 現在時ちょうど以降
        [Op.lt]: Oclock.next()// 現在+1時ちょうどより前
      }
    }
  })
  .then( taskGenerators => {
    console.log(taskGenerators)
  });
}

export default generateTasks;
