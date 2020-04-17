import {createElement} from "../utils.js";
import Abstract from "./abstract-component.js";

const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class MoreButton extends Abstract{
  getTemplate() {
    return createLoadMoreButtonTemplate();
  }
}
