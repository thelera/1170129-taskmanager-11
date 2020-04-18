import {createElement} from "../utils/common.js";
import Abstract from "./abstract-component.js";

const createBoardTemplate = () => {
  return (
    `<section class="board container">
    </section>`
  );
};

export default class Board extends Abstract{
  getTemplate() {
    return createBoardTemplate();
  }
}
