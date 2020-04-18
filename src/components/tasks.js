import {createElement} from "../utils/common.js";
import Abstract from "./abstract-component.js";

const createTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class Tasks extends Abstract {
  getTemplate() {
    return createTasksTemplate();
  }
}
