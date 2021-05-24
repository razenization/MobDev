// Частина 1

// Дано рядок у форматі "Student1 - Group1; Student2 - Group2; ..."

let studentsStr =
  'Дмитренко Олександр - ІП-84; Матвійчук Андрій - ІВ-83; Лесик Сергій - ІО-82; Ткаченко Ярослав - ІВ-83; Аверкова Анастасія - ІО-83; Соловйов Даніїл - ІО-83; Рахуба Вероніка - ІО-81; Кочерук Давид - ІВ-83; Лихацька Юлія- ІВ-82; Головенець Руслан - ІВ-83; Ющенко Андрій - ІО-82; Мінченко Володимир - ІП-83; Мартинюк Назар - ІО-82; Базова Лідія - ІВ-81; Снігурець Олег - ІВ-81; Роман Олександр - ІО-82; Дудка Максим - ІО-81; Кулініч Віталій - ІВ-81; Жуков Михайло - ІП-83; Грабко Михайло - ІВ-81; Іванов Володимир - ІО-81; Востриков Нікіта - ІО-82; Бондаренко Максим - ІВ-83; Скрипченко Володимир - ІВ-82; Кобук Назар - ІО-81; Дровнін Павло - ІВ-83; Тарасенко Юлія - ІО-82; Дрозд Світлана - ІВ-81; Фещенко Кирил - ІО-82; Крамар Віктор - ІО-83; Іванов Дмитро - ІВ-82';

// Завдання 1
// Заповніть словник, де:
// - ключ – назва групи
// - значення – відсортований масив студентів, які відносяться до відповідної групи

const studentsGroup = studentsStr
  .split(';')
  .map((student) => student.split(/- (.+)?/, 2).map((el) => el.trim()));

const result = {};

studentsGroup.map(([student, group]) => {
  result[group] === undefined
    ? (result[group] = [student])
    : result[group].push(student);
});

console.log('result => ', result);

// Завдання 1 - END

// Дано масив з максимально можливими оцінками

const points = [12, 12, 12, 12, 12, 12, 12, 16];

// Завдання 2
// Заповніть словник, де:
// - ключ – назва групи
// - значення – словник, де:
//   - ключ – студент, який відносяться до відповідної групи
//   - значення – масив з оцінками студента (заповніть масив випадковими значеннями, використовуючи функцію `randomValue(maxValue: Int) -> Int`)

function randomGrade(maxValue) {
  switch (Math.ceil(Math.random() * 5)) {
    case 1:
      return Math.ceil(maxValue * 0.7);
    case 2:
      return Math.ceil(maxValue * 0.9);
    case (3, 4, 5):
      return maxValue;
    default:
      return 0;
  }
}

const studentPoints = {};

Object.entries(result).map(([group, students]) => {
  students.map((student) => {
    const randomPoints = points.map((maxGrade) => randomGrade(maxGrade));
    studentPoints[group]
      ? (studentPoints[group][student] = randomPoints)
      : (studentPoints[group] = { [student]: randomPoints });
  });
});

console.log('studentPoints => ', studentPoints);

// Завдання 3
// Заповніть словник, де:
// - ключ – назва групи
// - значення – словник, де:
//   - ключ – студент, який відносяться до відповідної групи
//   - значення – сума оцінок студента

const sumPoints = Object.assign({}, studentPoints);

Object.entries(sumPoints).map(([group, value]) =>
  Object.entries(value).map(([student, grades]) => {
    sumPoints[group][student] = grades.reduce(
      (accum, current) => accum + current,
      0,
    );
  }),
);

console.log('sumPoints => ', sumPoints);

// Завдання 4
// Заповніть словник, де:
// - ключ – назва групи
// - значення – середня оцінка всіх студентів групи

const groupAvg = Object.assign({}, sumPoints);

Object.entries(groupAvg).map(([group, grades]) => {
  const gradeArray = Object.values(grades);
  groupAvg[group] = (
    gradeArray.reduce((accum, grade) => accum + grade, 0) / gradeArray.length
  ).toFixed(2);
});

console.log('groupAvg => ', groupAvg);

// Завдання 5
// Заповніть словник, де:
// - ключ – назва групи
// - значення – масив студентів, які мають >= 60 балів

const passedPerGroup = Object.assign({}, sumPoints);

Object.entries(passedPerGroup).map(([group, grades]) => {
  Object.entries(grades).map(([student, gradeAvg]) => {
    if (gradeAvg >= 60) {
      if ('length' in passedPerGroup[group]) {
        return passedPerGroup[group].push(student);
      }

      return (passedPerGroup[group] = [student]);
    }
  });
});

Object.entries(passedPerGroup).map(([key, value]) => {
  !('length' in value) && delete passedPerGroup[key];
});

console.log('passedPerGroup => ', passedPerGroup);
