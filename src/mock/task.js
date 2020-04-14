import {COLORS} from "../consts.js";

const DefaultRepeatingDays = {
  "mo": false,
  "tu": false,
  "we": false,
  "th": false,
  "fr": false,
  "sa": false,
  "su": false
};

const DescriptionItems = [
  `Сделать домашку`,
  `Изучить теорию`,
  `Пройти интенсив на соточку`,
];

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random > 0.5 ? 1 : -1;
  const diffValue = getRandomIntegerNumber(0, 8) * sign;

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {
    "mo": Math.random() > 0.5,
  });
};

export const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    description: getRandomArrayItem(DescriptionItems),
    dueDate,
    color: getRandomArrayItem(COLORS),
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    isArchive: Math.random() > 0.5,
    isFavourite: Math.random() > 0.5,
  };
};

export const generateTasks = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateTask);
};
