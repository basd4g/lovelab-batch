import { TaskGenerators } from './models/taskGenerators';

const generateTasks = () => {
  console.log("hello,lovelab");
  TaskGenerators.findAll({where: {}})
  .then( taskGenerators => {
    console.log(taskGenerators)
  });
}

export default generateTasks;
