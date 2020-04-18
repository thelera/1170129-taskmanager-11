import TaskEditComponent from "../components/task-edit.js";
import TaskComponent from "../components/task.js";
import MoreButtonComponent from "../components/load-more-button.js";
import SortComponent from "../components/sort.js";
import TasksComponent from "../components/tasks.js";
import NoTasksComponent from "../components/no-tasks.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {SortType} from "../components/sort.js";

const ESC_BUTTON = `Escape`;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const onEscKeyDown = (evt) => {
    if (evt.key === ESC_BUTTON) {
      replace(taskComponent, taskEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskComponent.setEditButtonClickHandler(() => {
    replace(taskEditComponent, taskComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replace(taskComponent, taskEditComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => renderTask(taskListElement, task));
};

const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
  }

  return sortedTasks.slice(from, to);
};

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._moreButtonComponent = new MoreButtonComponent();
  }

  render(tasks) {
    const container = this._container;

    const renderLoadMoreButton = () => {
      const loadMoreButtonComponent = this._moreButtonComponent;
      render(container.getElement(), loadMoreButtonComponent, RenderPosition.BEFOREEND);

      loadMoreButtonComponent.setClickHandler(() => {
        const previousTasksCount = showingTasksCount;
        showingTasksCount = previousTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

        const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), previousTasksCount, showingTasksCount);

        renderTasks(taskListElement, sortedTasks);

        if (showingTasksCount >= tasks.length) {
          loadMoreButtonComponent.getElement().remove();
          loadMoreButtonComponent.removeElement();
        }
      });
    };

    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container.getElement(), this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container.getElement(), this._sortComponent, RenderPosition.BEFOREEND);
    render(container.getElement(), this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = container.getElement().querySelector(`.board__tasks`);

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    renderTasks(taskListElement, tasks.slice(0, showingTasksCount));
    renderLoadMoreButton();

    // сортировка
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount);

      taskListElement.innerHTML = ``;

      renderTasks(taskListElement, sortedTasks);
      renderLoadMoreButton();
    });
  }
}
