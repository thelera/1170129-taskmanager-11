import {MONTH_NAMES} from "../consts.js";
import {formatTime} from "../utils/common.js";
import {createElement} from "../utils/render.js";
import Abstract from "./abstract-component.js";

const createTaskTemplate = (task) => {
  const {description, dueDate, color, repeatingDays, isArchive, isfavourite} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;

  const date = isDateShowing ? `${dueDate.getDate()}${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;
  const arhiveButtonInactiveClass = isArchive ? `` : `card__btn--disabled`;
  const favouriteButtonInactiveClass = isfavourite ? `` : `card__btn--disabled`;

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive ${arhiveButtonInactiveClass}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favourites ${favouriteButtonInactiveClass}"
            >
              favourites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                    <span class="card__time">${time}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class Task extends Abstract{
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createTaskTemplate(this._task);
  }

  setEditButtonClickHandler (handler) {
    this.getElement().querySelector(`.card__btn--edit`)
    .addEventListener(`click`, handler);
  }
}
