import {createElement} from "../utils/common.js";
import Abstract from "./abstract-component.js";

const createSortingTemplate = () => {
  return `<div class="board__filter-list">
    <a href="#" class="board__filter">SORT BY DEFAULT</a>
    <a href="#" class="board__filter">SORT BY DATE up</a>
    <a href="#" class="board__filter">SORT BY DATE down</a>
  </div>`;
};

export default class Sorting extends Abstract{
  getTemplate() {
    return createSortingTemplate();
  }
}
