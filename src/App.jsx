import { useEffect, useMemo, useState } from "react";
import "./App.css";

const subjects = [
  {
    id: "kyrgyz", icon: "🇰🇬", ru: "Кыргызский язык", kg: "Кыргыз тили",
    topics: ["Звуки и буквы", "Части речи", "Имя существительное", "Имя прилагательное", "Глагол", "Предложение"]
  },
  {
    id: "russian", icon: "📖", ru: "Русский язык", kg: "Орус тили",
    topics: ["Звуки и буквы", "Имя существительное", "Имя прилагательное", "Глагол", "Части речи", "Предложение"]
  },
  {
    id: "english", icon: "🌍", ru: "Английский язык", kg: "Англис тили",
    topics: ["Alphabet", "Pronouns", "To be", "Present Simple", "Articles", "Past Simple"]
  },
  {
    id: "math", icon: "➗", ru: "Математика", kg: "Математика",
    topics: ["Натуральные числа", "Сложение", "Вычитание", "Умножение", "Деление", "Дроби"]
  },
  {
    id: "algebra", icon: "📐", ru: "Алгебра", kg: "Алгебра",
    topics: ["Выражения", "Уравнения", "Функции", "Степени", "Многочлены", "Квадратные уравнения"]
  },
  {
    id: "geometry", icon: "📏", ru: "Геометрия", kg: "Геометрия",
    topics: ["Точки и прямые", "Углы", "Треугольники", "Четырёхугольники", "Окружность", "Площадь фигур"]
  },
  {
    id: "history", icon: "🏛️", ru: "История", kg: "Тарых",
    topics: ["Древний мир", "Первые государства", "Средневековье", "История Кыргызстана", "Великий шёлковый путь", "Новое время"]
  },
  {
    id: "geography", icon: "🌎", ru: "География", kg: "География",
    topics: ["Планета Земля", "Материки", "Океаны", "Климат", "Горы Кыргызстана", "Природные ресурсы"]
  },
  {
    id: "biology", icon: "🧬", ru: "Биология", kg: "Биология",
    topics: ["Клетка", "Растения", "Животные", "Органы человека", "Экосистема", "Фотосинтез"]
  },
  {
    id: "physics", icon: "⚡", ru: "Физика", kg: "Физика",
    topics: ["Физические величины", "Движение", "Сила", "Давление", "Энергия", "Электричество"]
  },
  {
    id: "chemistry", icon: "🧪", ru: "Химия", kg: "Химия",
    topics: ["Вещества", "Атомы и молекулы", "Химические элементы", "Смеси", "Реакции", "Периодическая таблица"]
  },
  {
    id: "informatics", icon: "💻", ru: "Информатика", kg: "Информатика",
    topics: ["Информация", "Компьютер", "Алгоритмы", "Интернет", "Программирование", "HTML и CSS"]
  },
  {
    id: "literature", icon: "📚", ru: "Литература", kg: "Адабият",
    topics: ["Сказки", "Басни", "Стихотворения", "Рассказ", "Поэзия", "Жанры литературы"]
  },
  {
    id: "world", icon: "🌱", ru: "Человек и мир", kg: "Адам жана дүйнө",
    topics: ["Человек и общество", "Семья", "Природа", "Здоровье", "Безопасность", "Окружающий мир"]
  },
  {
    id: "art", icon: "🎨", ru: "Изобразительное искусство", kg: "Сүрөт өнөрү",
    topics: ["Цвета", "Линии", "Формы", "Композиция", "Пейзаж", "Портрет"]
  },
  {
    id: "music", icon: "🎵", ru: "Музыка", kg: "Музыка",
    topics: ["Ноты", "Ритм", "Мелодия", "Музыкальные инструменты", "Народная музыка", "Композиторы"]
  }
];

const translations = {
  ru: {
    home: "Главная", subjects: "Предметы", tasks: "Задания",
    achievements: "Достижения", favorites: "Избранное",
    profile: "Мой кабинет", stats: "Статистика",
    welcome: "Учись сегодня — создавай будущее!",
    subtitle: "Твоя образовательная платформа BILIM KG",
    start: "Начать обучение", continue: "Продолжить",
    chooseSubject: "Выбери предмет", allSubjects: "Все предметы",
    grade: "Класс", chooseGrade: "Выбери свой класс",
    topics: "Темы уроков", lesson: "Урок", test: "Проверка знаний",
    explanation: "Объяснение", example: "Пример", practice: "Попробуй сам",
    check: "Проверить ответ", next: "Следующий вопрос",
    finish: "Завершить тест", correct: "Правильно!",
    wrong: "Попробуй ещё раз!", result: "Результат теста",
    back: "Назад", xp: "Баллы XP", level: "Уровень",
    completed: "Пройдено уроков", daily: "Задания на сегодня",
    dailyText: "Выполняй задания и получай XP",
    achievementsTitle: "Твои достижения",
    favoritesTitle: "Избранные уроки",
    noFavorites: "Пока нет избранных уроков",
    notifications: "Уведомления", noNotifications: "Пока нет уведомлений",
    statistics: "Твоя статистика", progress: "Прогресс обучения",
    subjectsCount: "Предметов", lessonsCount: "Уроков пройдено",
    testsCount: "Тестов завершено", accuracy: "Правильных ответов",
    save: "В избранное", saved: "В избранном",
    remove: "Убрать", open: "Открыть",
    dailyOne: "Изучи один урок", dailyTwo: "Пройди один тест",
    dailyThree: "Изучи два разных предмета",
    name: "Имя ученика", saveName: "Сохранить имя",
    namePlaceholder: "Введи своё имя", student: "Ученик",
    noTasks: "Все задания выполнены!", locked: "Пока закрыто",
    unlocked: "Получено", points: "баллов",
    search: "Поиск предмета...", all: "Все",
    homeTitle: "Добро пожаловать в BILIM KG",
    streak: "Дней обучения", today: "Сегодня",
    startLesson: "Перейти к уроку", question: "Вопрос",
    answer: "Выбери правильный ответ", finishLesson: "Урок завершён",
    welcomeBack: "Рады видеть тебя снова!"
  },
  kg: {
    home: "Башкы бет", subjects: "Предметтер", tasks: "Тапшырмалар",
    achievements: "Жетишкендиктер", favorites: "Тандалгандар",
    profile: "Менин кабинетым", stats: "Статистика",
    welcome: "Бүгүн оку — келечегиңди түз!",
    subtitle: "Сенин BILIM KG билим берүү платформаң",
    start: "Окууну баштоо", continue: "Улантуу",
    chooseSubject: "Предметти танда", allSubjects: "Бардык предметтер",
    topics: "Сабактын темалары", lesson: "Сабак", test: "Билимди текшерүү",
    explanation: "Түшүндүрмө", example: "Мисал", practice: "Өзүң аракет кыл",
    check: "Жоопту текшер", next: "Кийинки суроо",
    finish: "Тестти бүтүрүү", correct: "Туура!",
    wrong: "Кайра аракет кыл!", result: "Тесттин жыйынтыгы",
    back: "Артка", xp: "XP упайлары", level: "Деңгээл",
    completed: "Өтүлгөн сабактар", daily: "Бүгүнкү тапшырмалар",
    dailyText: "Тапшырмаларды аткарып XP топто",
    achievementsTitle: "Сенин жетишкендиктериң",
    favoritesTitle: "Тандалган сабактар",
    noFavorites: "Азырынча тандалган сабактар жок",
    notifications: "Билдирүүлөр", noNotifications: "Азырынча билдирүүлөр жок",
    statistics: "Сенин статистикаң", progress: "Окуу жетишкендиги",
    subjectsCount: "Предметтер", lessonsCount: "Өтүлгөн сабактар",
    testsCount: "Аяктаган тесттер", accuracy: "Туура жооптор",
    save: "Тандалгандарга кошуу", saved: "Тандалгандарда",
    remove: "Өчүрүү", open: "Ачуу",
    dailyOne: "Бир сабакты оку", dailyTwo: "Бир тесттен өт",
    dailyThree: "Эки башка предметти оку",
    name: "Окуучунун аты", saveName: "Атын сактоо",
    namePlaceholder: "Атыңды жаз", student: "Окуучу",
    noTasks: "Бардык тапшырмалар аткарылды!", locked: "Азырынча жабык",
    unlocked: "Алынды", points: "упай",
    search: "Предметти издөө...", all: "Баары",
    homeTitle: "BILIM KG платформасына кош келиңиз",
    streak: "Окуган күндөр", today: "Бүгүн",
    startLesson: "Сабакка өтүү", question: "Суроо",
    answer: "Туура жоопту танда", finishLesson: "Сабак аяктады",
    welcomeBack: "Сени кайра көргөнүбүзгө кубанычтабыз!"
  }
};
const topicInfo = {
  "Звуки и буквы": ["Звук мы произносим и слышим, а букву видим и пишем. Буквы образуют алфавит. Звуки бывают гласными и согласными.", "Например, в слове «мама» четыре буквы и четыре звука."],
  "Части речи": ["Части речи — это группы слов, которые различаются по значению и грамматическим признакам. Например, существительные называют предметы, глаголы обозначают действия, а прилагательные описывают признаки.", "В предложении «Красивый цветок растёт» слово «цветок» — существительное, «красивый» — прилагательное."],
  "Имя существительное": ["Имя существительное — самостоятельная часть речи, которая обозначает предмет и отвечает на вопросы «кто?» или «что?». Существительные бывают одушевлёнными и неодушевлёнными.", "Кто? — ученик. Что? — книга."],
  "Имя прилагательное": ["Имя прилагательное обозначает признак предмета и отвечает на вопросы «какой?», «какая?», «какое?», «какие?». Оно помогает точнее описывать предметы.", "Красивый цветок, высокая гора, интересная книга."],
  "Глагол": ["Глагол — часть речи, которая обозначает действие или состояние и отвечает на вопросы «что делать?» и «что сделать?».", "Читать, рисовать, учиться, построить."],
  "Предложение": ["Предложение — это одно или несколько слов, которые выражают законченную мысль. В конце ставится точка, вопросительный или восклицательный знак.", "«Наступила весна.» — повествовательное предложение."],
  "Натуральные числа": ["Натуральные числа используются для счёта предметов: 1, 2, 3, 4 и так далее. Они помогают определять количество и порядок.", "После числа 8 идёт число 9."],
  "Сложение": ["Сложение — математическое действие, при котором числа объединяются. Числа, которые складывают, называются слагаемыми, а результат — суммой.", "7 + 5 = 12."],
  "Вычитание": ["Вычитание показывает, сколько останется, если из одного числа убрать другое. Первое число называется уменьшаемым, второе — вычитаемым.", "15 − 6 = 9."],
  "Умножение": ["Умножение — это краткая запись сложения одинаковых слагаемых. Результат называется произведением.", "3 × 4 = 12, потому что 4 + 4 + 4 = 12."],
  "Деление": ["Деление помогает разделить число на равные части или узнать, сколько раз одно число содержится в другом.", "20 : 4 = 5."],
  "Дроби": ["Дробь показывает часть целого. Число сверху называется числителем, а снизу — знаменателем.", "1/2 означает одну из двух равных частей."],
  "Уравнения": ["Уравнение — это равенство, содержащее неизвестное число. Чтобы решить его, нужно найти значение неизвестного.", "x + 5 = 12. Значит, x = 7."],
  "Функции": ["Функция показывает зависимость одной величины от другой. Каждому допустимому значению аргумента соответствует значение функции.", "Если y = 2x, то при x = 3 получаем y = 6."],
  "Клетка": ["Клетка — основная структурная и функциональная единица живых организмов. В ней происходят процессы, необходимые для жизни.", "У растительной клетки есть клеточная стенка и хлоропласты."],
  "Фотосинтез": ["Фотосинтез — процесс, при котором зелёные растения используют энергию света, воду и углекислый газ для образования органических веществ и выделения кислорода.", "Для фотосинтеза растению нужны свет, вода и углекислый газ."],
  "Атомы и молекулы": ["Атом — мельчайшая частица химического элемента, сохраняющая его свойства. Молекула состоит из двух или более связанных атомов.", "Молекула воды H₂O состоит из двух атомов водорода и одного атома кислорода."],
  "Алгоритмы": ["Алгоритм — точная последовательность действий для решения задачи. Хороший алгоритм понятен, конечен и приводит к результату.", "Рецепт приготовления блюда можно представить как алгоритм."],
  "HTML и CSS": ["HTML задаёт структуру веб-страницы: заголовки, абзацы, изображения и ссылки. CSS отвечает за внешний вид: цвета, размеры, расположение и анимации.", "Тег h1 создаёт заголовок, а CSS-свойство color меняет цвет текста."],
  "Планета Земля": ["Земля — третья планета от Солнца. На её поверхности есть материки, океаны, горы, равнины и условия для существования жизни.", "Большая часть поверхности Земли покрыта водой."]
};

function getTopicContent(topic, subject, lang) {
  const isKg = lang === "kg";
  const known = topicInfo[topic];

  if (known) {
    return {
      explanation: known[0],
      example: known[1]
    };
  }

  const subjectNames = {
    history: isKg ? "тарыхый окуяларды" : "исторические события",
    geography: isKg ? "Жердин табиятын жана аймактарын" : "природу и территории Земли",
    biology: isKg ? "тирүү организмдерди" : "живые организмы",
    physics: isKg ? "физикалык кубулуштарды" : "физические явления",
    chemistry: isKg ? "заттарды жана алардын өзгөрүшүн" : "вещества и их превращения",
    english: isKg ? "англис тилинин сөздөрүн жана грамматикасын" : "английские слова и грамматику",
    geometry: isKg ? "геометриялык фигураларды" : "геометрические фигуры",
    algebra: isKg ? "математикалык туюнтмаларды жана мыйзам ченемдүүлүктөрдү" : "математические выражения и закономерности",
    literature: isKg ? "адабий чыгармаларды" : "литературные произведения",
    world: isKg ? "адамды жана айлана-чөйрөнү" : "человека и окружающий мир",
    art: isKg ? "сүрөт искусствосун" : "изобразительное искусство",
    music: isKg ? "музыкалык чыгармаларды" : "музыкальные произведения",
    informatics: isKg ? "маалымат жана компьютердик технологияларды" : "информацию и компьютерные технологии",
    kyrgyz: isKg ? "кыргыз тилинин эрежелерин" : "правила кыргызского языка",
    russian: isKg ? "орус тилинин эрежелерин" : "правила русского языка",
    math: isKg ? "математикалык түшүнүктөрдү" : "математические понятия"
  };

  const description = subjectNames[subject.id] || (isKg ? "жаңы түшүнүктөрдү" : "новые понятия");

  return {
    explanation: isKg
      ? `«${topic}» темасы ${description} үйрөнүүгө жардам берет. Бул темада негизги түшүнүктөрдү, алардын өзгөчөлүктөрүн жана колдонулушун карайбыз. Теманы жакшы түшүнүү үчүн аны мисалдар менен байланыштыр.`
      : `Тема «${topic}» помогает изучить ${description}. Здесь важно понять основные понятия, их особенности и способы применения. Рассматривай тему вместе с примерами, чтобы лучше усвоить материал.`,
    example: isKg
      ? `Мисал: «${topic}» темасына байланыштуу түшүнүктөрдү күнүмдүк жашоодо кездештирүүгө болот. Өзүң дагы бир мисал ойлоп тап.`
      : `Пример: понятия из темы «${topic}» можно встретить в повседневной жизни. Попробуй самостоятельно придумать ещё один пример.`
  };
}

const achievementsData = [
  { id: "first", icon: "🌟", ru: "Первый шаг", kg: "Биринчи кадам", ruDesc: "Пройди первый урок", kgDesc: "Биринчи сабакты өт", condition: 1 },
  { id: "five", icon: "📚", ru: "Книголюб", kg: "Билим сүйүүчү", ruDesc: "Пройди 5 уроков", kgDesc: "5 сабакты өт", condition: 5 },
  { id: "ten", icon: "🏅", ru: "Старательный", kg: "Аракетчил", ruDesc: "Пройди 10 уроков", kgDesc: "10 сабакты өт", condition: 10 },
  { id: "twenty", icon: "🏆", ru: "Мастер знаний", kg: "Билим устаты", ruDesc: "Пройди 20 уроков", kgDesc: "20 сабакты өт", condition: 20 },
  { id: "xp100", icon: "💎", ru: "Первые 100 XP", kg: "Алгачкы 100 XP", ruDesc: "Набери 100 XP", kgDesc: "100 XP топто", condition: 100, type: "xp" },
  { id: "test", icon: "🧠", ru: "Знаток тестов", kg: "Тест билгичи", ruDesc: "Заверши первый тест", kgDesc: "Биринчи тестти бүтүр", condition: 1, type: "tests" }
];

const todayKey = new Date().toLocaleDateString("en-CA");

function read(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("bilim-lang") || "ru");
  const [theme, setTheme] = useState(() => localStorage.getItem("bilim-theme") || "dark");
  const [page, setPage] = useState("home");
  const [grade, setGrade] = useState(() => {
    const value = Number(read("bilim-grade", 8));
    return Number.isInteger(value) && value >= 1 && value <= 12 ? value : 8;
  });
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [topicIndex, setTopicIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [xp, setXp] = useState(() => read("bilim-xp", 0));
  const [completed, setCompleted] = useState(() => {
    const data = read("bilim-completed", []);
    return Array.isArray(data) ? data : [];
  });
  const [testsDone, setTestsDone] = useState(() => {
    const value = Number(read("bilim-tests", 0));
    return Number.isFinite(value) ? value : 0;
  });
  const [testTotals, setTestTotals] = useState(() => {
    const value = read("bilim-test-totals", { correct: 0, total: 0 });
    return value && typeof value === "object" ? value : { correct: 0, total: 0 };
  });
  const [calendarDate, setCalendarDate] = useState(new Date().toISOString().slice(0, 10));
  const [calendarNote, setCalendarNote] = useState("");
  const [calendarItems, setCalendarItems] = useState(() => {
    const value = read("bilim-calendar", []);
    return Array.isArray(value) ? value : [];
  });
  const [flashIndex, setFlashIndex] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);
  const [dictionarySearch, setDictionarySearch] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const data = read("bilim-favorites", []);
    return Array.isArray(data) ? data : [];
  });
  const [name, setName] = useState(() => localStorage.getItem("bilim-name") || "");
  const [nameInput, setNameInput] = useState(name);
  const [notifications, setNotifications] = useState(() => {
    const data = read("bilim-notifications", []);
    return Array.isArray(data) ? data : [];
  });
  const [dailyDone, setDailyDone] = useState(() => {
    const data = read("bilim-daily-" + todayKey, []);
    return Array.isArray(data) ? data : [];
  });
  const [dailySubjectIds, setDailySubjectIds] = useState(() => {
    const data = read("bilim-daily-subjects-" + todayKey, []);
    return Array.isArray(data) ? data : [];
  });
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [testResult, setTestResult] = useState(null);
  const [lessonRead, setLessonRead] = useState(false);

  // Новые данные: серия занятий, заметки и расписание
  const [studyDates, setStudyDates] = useState(() => {
    const value = read("bilim-study-dates", []);
    return Array.isArray(value) ? value : [];
  });
  const [notes, setNotes] = useState(() => {
    const value = read("bilim-notes", []);
    return Array.isArray(value) ? value : [];
  });
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [scheduleItems, setScheduleItems] = useState(() => {
    const value = read("bilim-schedule", []);
    return Array.isArray(value) ? value : [];
  });
  const [scheduleDay, setScheduleDay] = useState("Понедельник");
  const [scheduleTime, setScheduleTime] = useState("08:00");
  const [scheduleSubject, setScheduleSubject] = useState("");

  const t = translations[lang];
  const isKg = lang === "kg";

  useEffect(() => localStorage.setItem("bilim-lang", lang), [lang]);
  useEffect(() => localStorage.setItem("bilim-theme", theme), [theme]);
  useEffect(() => localStorage.setItem("bilim-xp", JSON.stringify(xp)), [xp]);
  useEffect(() => localStorage.setItem("bilim-completed", JSON.stringify(completed)), [completed]);
  useEffect(() => localStorage.setItem("bilim-tests", JSON.stringify(testsDone)), [testsDone]);
  useEffect(() => localStorage.setItem("bilim-test-totals", JSON.stringify(testTotals)), [testTotals]);
  useEffect(() => localStorage.setItem("bilim-calendar", JSON.stringify(calendarItems)), [calendarItems]);
  useEffect(() => localStorage.setItem("bilim-favorites", JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem("bilim-grade", JSON.stringify(grade)), [grade]);
  useEffect(() => localStorage.setItem("bilim-notifications", JSON.stringify(notifications)), [notifications]);
  useEffect(() => localStorage.setItem("bilim-daily-" + todayKey, JSON.stringify(dailyDone)), [dailyDone]);
  useEffect(() => localStorage.setItem("bilim-daily-subjects-" + todayKey, JSON.stringify(dailySubjectIds)), [dailySubjectIds]);
  useEffect(() => localStorage.setItem("bilim-name", name), [name]);
  useEffect(() => localStorage.setItem("bilim-study-dates", JSON.stringify(studyDates)), [studyDates]);
  useEffect(() => localStorage.setItem("bilim-notes", JSON.stringify(notes)), [notes]);
  useEffect(() => localStorage.setItem("bilim-schedule", JSON.stringify(scheduleItems)), [scheduleItems]);

  const currentSubject = subjects.find(s => s.id === selectedSubject);
  const currentTopic = currentSubject?.topics[topicIndex];
  const currentContent = currentSubject && currentTopic
    ? getTopicContent(currentTopic, currentSubject, lang)
    : null;

  const lessonKey = currentSubject ? `${currentSubject.id}-${topicIndex}` : "";
  const isFavorite = favorites.includes(lessonKey);
  const completedCount = completed.length;
  const level = Math.floor(xp / 100) + 1;
  const levelProgress = xp % 100;
  const markStudyDay = () => {
    setStudyDates(old => old.includes(todayKey) ? old : [...old, todayKey]);
  };
  const streakCount = (() => {
    const dates = new Set(studyDates);
    let count = 0;
    const cursor = new Date();
    // Если сегодня ещё не занимались, серия считается от вчерашнего дня.
    if (!dates.has(todayKey)) cursor.setDate(cursor.getDate() - 1);
    while (dates.has(cursor.toLocaleDateString("en-CA"))) {
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return count;
  })();

  const filteredSubjects = useMemo(() => subjects.filter(subject => {
    const title = isKg ? subject.kg : subject.ru;
    return title.toLowerCase().includes(search.toLowerCase());
  }), [search, isKg]);

  const dailyTasks = [
    { id: "lesson", title: t.dailyOne, reward: 20, done: dailyDone.includes("lesson") },
    { id: "test", title: t.dailyTwo, reward: 30, done: dailyDone.includes("test") },
    { id: "subjects", title: t.dailyThree, reward: 25, done: dailyDone.includes("subjects") }
  ];

  const addNotification = message => {
    setNotifications(old => [
      { id: Date.now(), message, date: new Date().toLocaleDateString() },
      ...old
    ].slice(0, 20));
  };

  const completeDaily = id => {
    if (dailyDone.includes(id)) return;
    markStudyDay();
    const task = dailyTasks.find(item => item.id === id);
    setDailyDone(old => [...old, id]);
    setXp(old => old + task.reward);
    addNotification(isKg ? `Тапшырма аткарылды! +${task.reward} XP` : `Задание выполнено! +${task.reward} XP`);
  };

  const openSubject = subject => {
    setSelectedSubject(subject.id);
    setPage("topics");
    setSearch("");
  };

  const openLesson = index => {
    setTopicIndex(index);
    setLessonRead(false);
    setPage("lesson");
  };

  const toggleFavorite = () => {
    if (!currentSubject) return;
    if (isFavorite) {
      setFavorites(old => old.filter(item => item !== lessonKey));
    } else {
      setFavorites(old => [...old, lessonKey]);
    }
  };
    const finishLesson = () => {
    if (!currentSubject) return;
    markStudyDay();
    if (!completed.includes(lessonKey)) {
      setCompleted(old => [...old, lessonKey]);
      setXp(old => old + 15);
      addNotification(isKg ? "Сабак ийгиликтүү аяктады! +15 XP" : "Урок успешно завершён! +15 XP");
    }
    setLessonRead(true);
    completeDaily("lesson");
    if (currentSubject && !dailySubjectIds.includes(currentSubject.id)) {
      const nextSubjects = [...dailySubjectIds, currentSubject.id];
      setDailySubjectIds(nextSubjects);
      if (nextSubjects.length >= 2) completeDaily("subjects");
    }
  };

  const questions = currentSubject && currentTopic ? [
    {
      question: isKg ? `«${currentTopic}» темасы эмнени үйрөтөт?` : `Что изучает тема «${currentTopic}»?`,
      options: isKg
        ? ["Негизги түшүнүктөрдү жана алардын колдонулушун", "Тамак жасоону", "Спорттук оюндарды", "Музыканы гана"]
        : ["Основные понятия и их применение", "Приготовление еды", "Спортивные игры", "Только музыку"],
      correct: 0
    },
    {
      question: isKg ? "Теманы жакшы түшүнүү үчүн эмне кылуу керек?" : "Что помогает лучше понять тему?",
      options: isKg
        ? ["Мисалдарды карап, көнүгүү аткаруу", "Сабакты окубай коюу", "Жоопту туш келди тандоо", "Теманы унутуу"]
        : ["Разбирать примеры и выполнять упражнения", "Не читать урок", "Выбирать ответы случайно", "Забыть тему"],
      correct: 0
    },
    {
      question: isKg ? "Билимди бекемдөөнүн жакшы жолу кайсы?" : "Как лучше закрепить знания?",
      options: isKg
        ? ["Кайталоо жана практика", "Окууну токтотуу", "Көнүгүүлөрдү аткарбоо", "Теманы өткөрүп жиберүү"]
        : ["Повторение и практика", "Прекратить учиться", "Не выполнять упражнения", "Пропустить тему"],
      correct: 0
    }
  ] : [];

  const startTest = () => {
    setAnswers({});
    setQuestionIndex(0);
    setTestResult(null);
    setPage("test");
  };

  const selectAnswer = answer => {
    setAnswers(old => ({ ...old, [questionIndex]: answer }));
  };

  const finishTest = () => {
    markStudyDay();
    const score = questions.reduce((total, q, index) =>
      total + (answers[index] === q.correct ? 1 : 0), 0);
    setTestResult(score);
    setTestTotals(old => ({ correct: old.correct + score, total: old.total + questions.length }));
    setTestsDone(old => old + 1);
    setXp(old => old + score * 10 + 10);
    completeDaily("test");
    addNotification(isKg ? `Тест аяктады! Натыйжа: ${score}/${questions.length}` : `Тест завершён! Результат: ${score}/${questions.length}`);
    setPage("result");
  };

  const selectGrade = value => {
    setGrade(value);
    setPage("subjects");
  };

  const goHome = () => setPage("home");

  const renderHeader = () => (
    <header className="topbar">
      <button className="brand" onClick={goHome}>
        <span className="brand-logo">B</span>
        <span>BILIM <b>KG</b><small>EDUCATION PLATFORM</small></span>
      </button>

      <nav className="navigation">
        <button className={page === "home" ? "nav-active" : ""} onClick={goHome}>{t.home}</button>
        <button className={page === "subjects" || page === "topics" ? "nav-active" : ""} onClick={() => setPage("subjects")}>{t.subjects}</button>
        <button className={page === "grades" ? "nav-active" : ""} onClick={() => setPage("grades")}>{isKg ? "Класс" : "Класс"}</button>
        <button className={page === "tasks" ? "nav-active" : ""} onClick={() => setPage("tasks")}>{t.tasks}</button>
        <button className={page === "achievements" ? "nav-active" : ""} onClick={() => setPage("achievements")}>{t.achievements}</button>
      </nav>

      <div className="header-right">
        <button className="icon-button" title={t.notifications} onClick={() => setPage("notifications")}>
          🔔
          {notifications.length > 0 && <i>{notifications.length}</i>}
        </button>
        <button className="language-button" onClick={() => setLang(lang === "ru" ? "kg" : "ru")}>
          {lang === "ru" ? "🇷🇺 RU" : "🇰🇬 KG"}
        </button>

        <button
          className="theme-toggle"
          onClick={() => setTheme(current => current === "dark" ? "light" : "dark")}
          title={theme === "dark" ? (isKg ? "Жарык темага өтүү" : "Включить светлую тему") : (isKg ? "Караңгы темага өтүү" : "Включить тёмную тему")}
          aria-label="Переключить тему"
        >
          <span>{theme === "dark" ? "☀️" : "🌙"}</span>
          <b>{theme === "dark" ? (isKg ? "Жарык" : "Светлая") : (isKg ? "Караңгы" : "Тёмная")}</b>
        </button>

        <button className="profile-mini" onClick={() => setPage("profile")}>
          <span>👤</span>
          <b>{name || t.student}</b>
        </button>
      </div>
    </header>
  );

  const renderSidebar = () => (
    <aside className="sidebar">
      <div className="side-label">MENU</div>
      <button className={page === "home" ? "side-active" : ""} onClick={goHome}>🏠 {t.home}</button>
      <button className={page === "subjects" || page === "topics" ? "side-active" : ""} onClick={() => setPage("subjects")}>📚 {t.subjects}</button>
      <button className={page === "grades" ? "side-active" : ""} onClick={() => setPage("grades")}>🎓 {isKg ? "Классты тандоо" : "Выбрать класс"}</button>
      <button className={page === "tasks" ? "side-active" : ""} onClick={() => setPage("tasks")}>🎯 {t.tasks}</button>
      <button className={page === "achievements" ? "side-active" : ""} onClick={() => setPage("achievements")}>🏆 {t.achievements}</button>
      <button className={page === "rewards" ? "side-active" : ""} onClick={() => setPage("rewards")}>🎁 {isKg ? "Сыйлыктар" : "Центр наград"}</button>
      <button className={page === "favorites" ? "side-active" : ""} onClick={() => setPage("favorites")}>❤️ {t.favorites}</button>
      <button className={page === "stats" ? "side-active" : ""} onClick={() => setPage("stats")}>📊 {t.stats}</button>
      <button className={page === "calendar" ? "side-active" : ""} onClick={() => setPage("calendar")}>🗓️ {isKg ? "Календарь" : "Календарь"}</button>
      <button className={page === "timetable" ? "side-active" : ""} onClick={() => setPage("timetable")}>🕒 {isKg ? "Сабак жадыбалы" : "Расписание"}</button>
      <button className={page === "notes" ? "side-active" : ""} onClick={() => setPage("notes")}>📝 {isKg ? "Жеке жазуулар" : "Мои заметки"}</button>
      <button className={page === "flashcards" ? "side-active" : ""} onClick={() => setPage("flashcards")}>🃏 {isKg ? "Карточкалар" : "Карточки"}</button>
      <button className={page === "library" ? "side-active" : ""} onClick={() => setPage("library")}>📚 {isKg ? "Китепкана" : "Библиотека"}</button>
      <button className={page === "dictionary" ? "side-active" : ""} onClick={() => setPage("dictionary")}>🔤 {isKg ? "Сөздүк" : "Словарь"}</button>
      <button className={page === "leaderboard" ? "side-active" : ""} onClick={() => setPage("leaderboard")}>🏅 {isKg ? "Рейтинг" : "Рейтинг"}</button>
      <button className={page === "certificate" ? "side-active" : ""} onClick={() => setPage("certificate")}>🎓 {isKg ? "Сертификат" : "Сертификат"}</button>
      <button className={page === "profile" ? "side-active" : ""} onClick={() => setPage("profile")}>👤 {t.profile}</button>

      <div className="sidebar-bottom">
        <div className="sidebar-level">
          <div className="level-icon">⚡</div>
          <b>{t.level} {level}</b>
          <small>{xp} XP</small>
          <div className="progress-track"><span style={{ width: `${levelProgress}%` }} /></div>
        </div>
        <div className="sidebar-brand">BILIM KG © 2026</div>
      </div>
    </aside>
  );

  const renderHome = () => (
    <>
      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow">✨ BILIM KG PLATFORM</span>
          <h1>{name ? `${isKg ? "Кош келдиң" : "Привет"}, ${name}!` : t.welcome}</h1>
          <p>{t.subtitle}</p>
          <button className="primary-button" onClick={() => setPage("subjects")}>
            {t.start} <span>→</span>
          </button>
          <div className="hero-note">🚀 {isKg ? "Билим — сенин келечегиң!" : "Знания — твоя суперсила!"}</div>
        </div>
        <div className="hero-art">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-book">📚</div>
          <span className="float-icon float-one">✦</span>
          <span className="float-icon float-two">✧</span>
          <span className="float-icon float-three">🎓</span>
        </div>
      </section>

      <section className="grade-strip">
        <div className="grade-strip-info">
          <span className="eyebrow">{isKg ? "ОКУУ КЛАССЫ" : "ТВОЙ УЧЕБНЫЙ КЛАСС"}</span>
          <b>{grade} {isKg ? "- класс" : "класс"}</b>
          <small>{isKg ? "Классты каалаган убакта өзгөртө аласың" : "Класс можно изменить в любой момент"}</small>
        </div>
        <div className="grade-strip-actions">
          <button className="secondary-button" onClick={() => setPage("grades")}>🎓 {isKg ? "Классты тандоо" : "Выбрать класс"} →</button>
          <button className="primary-button" onClick={() => setPage("subjects")}>📚 {isKg ? "Бардык предметтер" : "Все предметы"} →</button>
        </div>
      </section>
      <section className="stats-grid">
        <Stat icon="⚡" value={xp} label={t.xp} />
        <Stat icon="📖" value={completedCount} label={t.completed} />
        <Stat icon="🧠" value={testsDone} label={t.testsCount} />
        <Stat icon="🏆" value={level} label={t.level} />
      </section>

      <section className="streak-banner">
        <div className="streak-flame">🔥</div>
        <div>
          <b>{streakCount} {isKg ? "күн катары менен окуу" : "дней подряд в обучении"}</b>
          <span>{isKg ? "Сабакты бүтүрүп, окуу серияңды улант!" : "Заверши урок или тест сегодня, чтобы продолжить серию!"}</span>
        </div>
        <button className="secondary-button" onClick={() => setPage("stats")}>{isKg ? "Статистика" : "Моя статистика"} →</button>
      </section>

      <div className="section-heading">
        <div><span className="eyebrow">{t.today}</span><h2>{t.daily}</h2></div>
        <button className="text-button" onClick={() => setPage("tasks")}>{t.open} →</button>
      </div>

      <div className="daily-preview">
        {dailyTasks.map(task => (
          <div className={`daily-card ${task.done ? "daily-complete" : ""}`} key={task.id}>
            <div className="daily-check">{task.done ? "✓" : "○"}</div>
            <div><b>{task.title}</b><small>+{task.reward} XP</small></div>
            <button disabled={task.done} onClick={() => {
              if (task.id === "lesson") setPage("subjects");
              else if (task.id === "test") setPage("subjects");
              else setPage("subjects");
            }}>{task.done ? "✓" : t.open}</button>
          </div>
        ))}
      </div>

      <div className="section-heading">
        <div><span className="eyebrow">LEARN MORE</span><h2>{t.allSubjects}</h2></div>
        <button className="text-button" onClick={() => setPage("subjects")}>{t.open} →</button>
      </div>

      <div className="subject-grid">
        {subjects.map(subject => (
          <SubjectCard key={subject.id} subject={subject} lang={lang} onClick={() => openSubject(subject)} completed={completed.filter(x => x.startsWith(subject.id + "-")).length} />
        ))}
      </div>
    </>
  );

  const renderSubjects = () => (
    <>
      <PageTitle eyebrow="BILIM KG / LEARNING" title={t.chooseSubject} description={t.subtitle} />
      <div className="toolbar">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.search} />
        <span className="count-label">{filteredSubjects.length} / {subjects.length}</span>
      </div>
      <div className="subject-grid">
        {filteredSubjects.map(subject => (
          <SubjectCard key={subject.id} subject={subject} lang={lang} onClick={() => openSubject(subject)} completed={completed.filter(x => x.startsWith(subject.id + "-")).length} />
        ))}
      </div>
    </>
  );

  const renderTopics = () => (
    <>
      <button className="back-button" onClick={() => setPage("subjects")}>← {t.back}</button>
      <PageTitle eyebrow={`${t.grade} ${grade} / BILIM KG`} title={isKg ? currentSubject?.kg : currentSubject?.ru} description={t.topics} />
      <div className="topic-grid">
        {currentSubject?.topics.map((topic, index) => {
          const key = `${currentSubject.id}-${index}`;
          const done = completed.includes(key);
          return (
            <button className="topic-card" key={key} onClick={() => openLesson(index)}>
              <div className="topic-number">{String(index + 1).padStart(2, "0")}</div>
              <div className="topic-info">
                <b>{topic}</b>
                <small>{done ? "✓ " + t.completed : t.lesson}</small>
              </div>
              <span className="topic-arrow">↗</span>
            </button>
          );
        })}
      </div>
    </>
  );

  const renderLesson = () => (
    <>
      <button className="back-button" onClick={() => setPage("topics")}>← {t.back}</button>
      <PageTitle eyebrow={`${currentSubject?.icon} ${isKg ? currentSubject?.kg : currentSubject?.ru}`} title={currentTopic} description={`${t.grade} ${grade} · ${t.lesson}`} />
      <div className="lesson-layout">
        <article className="lesson-panel">
          <div className="lesson-banner">📘 <span>{t.explanation}</span></div>
          <h2>{currentTopic}</h2>
          <p>{currentContent?.explanation}</p>
          <div className="example-box">
            <b>💡 {t.example}</b>
            <p>{currentContent?.example}</p>
          </div>
          <div className="lesson-actions">
            <button className="secondary-button" onClick={toggleFavorite}>
              {isFavorite ? "❤️ " + t.saved : "🤍 " + t.save}
            </button>
            <button className="primary-button" onClick={finishLesson}>
              {lessonRead ? "✓ " + t.finishLesson : t.finishLesson}
            </button>
          </div>
          <button className="primary-button test-start-button" onClick={startTest}>🧠 {t.test} →</button>
        </article>
      </div>
    </>
  );

  const renderTest = () => {
    const question = questions[questionIndex];
    if (!question) return null;
    return (
      <>
        <button className="back-button" onClick={() => setPage("lesson")}>← {t.back}</button>
        <PageTitle eyebrow={`${t.test} / ${currentTopic}`} title={`${t.question} ${questionIndex + 1}/${questions.length}`} description={t.answer} />
        <div className="test-panel">
          <div className="test-progress"><span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>
          <h2>{question.question}</h2>
          <div className="answer-list">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`answer-option ${answers[questionIndex] === index ? "answer-selected" : ""}`}
                onClick={() => selectAnswer(index)}
              >
                <span>{String.fromCharCode(65 + index)}</span>
                {option}
              </button>
            ))}
          </div>
          <div className="test-footer">
            <small>{questionIndex + 1} / {questions.length}</small>
            {questionIndex < questions.length - 1 ? (
              <button className="primary-button" disabled={answers[questionIndex] === undefined} onClick={() => setQuestionIndex(old => old + 1)}>{t.next} →</button>
            ) : (
              <button className="primary-button" disabled={answers[questionIndex] === undefined} onClick={finishTest}>{t.finish} ✓</button>
            )}
          </div>
        </div>
      </>
    );
  };

  const renderResult = () => (
    <>
      <PageTitle eyebrow="BILIM KG / RESULT" title={t.result} description={currentTopic} />
      <div className="result-panel">
        <div className="result-icon">{testResult === questions.length ? "🏆" : "🎯"}</div>
        <h2>{testResult} / {questions.length}</h2>
        <p>{testResult === questions.length ? (isKg ? "Мыкты! Бардык жооптор туура!" : "Отлично! Все ответы правильные!") : (isKg ? "Жакшы аракет! Дагы машык." : "Хорошая попытка! Продолжай тренироваться.")}</p>
        <div className="result-actions">
          <button className="secondary-button" onClick={startTest}>{isKg ? "Кайра өтүү" : "Пройти ещё раз"}</button>
          <button className="primary-button" onClick={() => setPage("topics")}>{t.back}</button>
        </div>
      </div>
    </>
  );
    const renderTasks = () => (
    <>
      <PageTitle eyebrow="DAILY CHALLENGE" title={t.daily} description={t.dailyText} />
      <div className="task-list">
        {dailyTasks.map((task, index) => (
          <div className="task-card" key={task.id}>
            <div className="task-icon">{["📖", "🧠", "🌟"][index]}</div>
            <div className="task-content"><b>{task.title}</b><small>+{task.reward} XP</small></div>
            <div className={`task-status ${task.done ? "done" : ""}`}>{task.done ? "✓" : "○"}</div>
            {!task.done && <button className="small-button" onClick={() => {
              if (task.id === "lesson") setPage("subjects");
              if (task.id === "test") setPage("subjects");
              if (task.id === "subjects") setPage("subjects");
            }}>{t.open}</button>}
          </div>
        ))}
      </div>
      <div className="daily-progress">
        <h3>{isKg ? "Бүгүнкү жетишкендик" : "Прогресс за сегодня"}</h3>
        <div className="progress-track"><span style={{ width: `${dailyDone.length / 3 * 100}%` }} /></div>
        <p>{dailyDone.length} / 3 {isKg ? "тапшырма аткарылды" : "задания выполнено"}</p>
      </div>
    </>
  );

  const renderAchievements = () => (
    <>
      <PageTitle eyebrow="YOUR AWARDS" title={t.achievementsTitle} description={isKg ? "Жаңы жетишкендиктерге жет!" : "Открывай новые награды за обучение!"} />
      <div className="achievement-grid">
        {achievementsData.map(item => {
          const value = item.type === "xp" ? xp : item.type === "tests" ? testsDone : completedCount;
          const unlocked = value >= item.condition;
          return (
            <div className={`achievement-card ${unlocked ? "achievement-unlocked" : "achievement-locked"}`} key={item.id}>
              <div className="achievement-icon">{item.icon}</div>
              <h3>{isKg ? item.kg : item.ru}</h3>
              <p>{isKg ? item.kgDesc : item.ruDesc}</p>
              <div className="achievement-bottom">
                <span>{unlocked ? "✓ " + t.unlocked : `${value}/${item.condition}`}</span>
                <div className="mini-progress"><span style={{ width: `${Math.min(100, value / item.condition * 100)}%` }} /></div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  const renderFavorites = () => {
    const saved = favorites.map(key => {
      const [id, index] = key.split("-");
      const subject = subjects.find(s => s.id === id);
      return subject ? { subject, index: Number(index), key } : null;
    }).filter(Boolean);

    return (
      <>
        <PageTitle eyebrow="SAVED LESSONS" title={t.favoritesTitle} description={isKg ? "Сакталган сабактарың ушул жерде" : "Все сохранённые темы находятся здесь"} />
        {saved.length === 0 ? <Empty icon="♡" text={t.noFavorites} /> : (
          <div className="topic-grid">
            {saved.map(item => (
              <div className="favorite-card" key={item.key}>
                <div className="favorite-icon">{item.subject.icon}</div>
                <div><b>{item.subject.topics[item.index]}</b><small>{isKg ? item.subject.kg : item.subject.ru}</small></div>
                <button onClick={() => { setSelectedSubject(item.subject.id); openLesson(item.index); }}>{t.open} →</button>
                <button className="remove-fav" onClick={() => setFavorites(old => old.filter(x => x !== item.key))}>×</button>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const renderStats = () => {
    const accuracy = testTotals.total ? Math.round((testTotals.correct / testTotals.total) * 100) : 0;
    const subjectStats = subjects.map(subject => ({
      ...subject,
      count: completed.filter(key => key.startsWith(subject.id + "-")).length
    })).filter(subject => subject.count > 0);

    return (
      <>
        <PageTitle eyebrow="YOUR PROGRESS" title={t.statistics} description={t.progress} />
        <div className="stats-grid stats-page-grid">
          <Stat icon="⚡" value={xp} label={t.xp} />
          <Stat icon="📚" value={completedCount} label={t.lessonsCount} />
          <Stat icon="🧠" value={testsDone} label={t.testsCount} />
          <Stat icon="🎯" value={`${accuracy}%`} label={t.accuracy} />
        </div>
        <div className="analytics-panel">
          <h2>{t.progress}</h2>
          <div className="weekly-activity">
            <div className="weekly-activity-heading"><h3>{isKg ? "Акыркы 7 күндөгү активдүүлүк" : "Активность за последние 7 дней"}</h3><span>🔥 {streakCount}</span></div>
            <div className="weekly-bars">
              {Array.from({ length: 7 }, (_, index) => {
                const date = new Date();
                date.setDate(date.getDate() - (6 - index));
                const key = date.toLocaleDateString("en-CA");
                const active = studyDates.includes(key);
                return <div className="weekly-bar-column" key={key}><div className={`weekly-bar ${active ? "weekly-bar-active" : ""}`} style={{ height: active ? "100%" : "12%" }} /><small>{date.toLocaleDateString(isKg ? "ky-KG" : "ru-RU", { weekday: "short" })}</small></div>;
              })}
            </div>
            <p className="weekly-caption">{isKg ? "Ар бир сабак же тест окуу күнүн белгилейт." : "Завершённый урок или тест отмечает учебный день."}</p>
          </div>
          <div className="analytics-level">
            <div><span>{t.level} {level}</span><b>{xp} XP</b></div>
            <div className="progress-track"><span style={{ width: `${levelProgress}%` }} /></div>
            <small>{100 - levelProgress} XP {isKg ? "кийинки деңгээлге чейин" : "до следующего уровня"}</small>
          </div>
          <h3>{isKg ? "Предметтер боюнча прогресс" : "Прогресс по предметам"}</h3>
          {subjectStats.length === 0 ? <Empty icon="📊" text={isKg ? "Азырынча маалымат жок" : "Пока нет данных для статистики"} /> :
            subjectStats.map(subject => (
              <div className="subject-progress" key={subject.id}>
                <span>{subject.icon} {isKg ? subject.kg : subject.ru}</span>
                <b>{subject.count}/6</b>
                <div className="progress-track"><span style={{ width: `${subject.count / 6 * 100}%` }} /></div>
              </div>
            ))
          }
        </div>
      </>
    );
  };

  const renderProfile = () => (
    <>
      <PageTitle eyebrow="PERSONAL ACCOUNT" title={t.profile} description={t.welcomeBack} />
      <div className="profile-layout">
        <div className="profile-card">
          <div className="profile-avatar">
            {name ? name.trim().slice(0, 1).toUpperCase() : "👤"}
          </div>
          <h2>{name || t.student}</h2>
          <span>{t.level} {level}</span>
          <div className="profile-xp">⚡ {xp} XP</div>
          <div className="progress-track"><span style={{ width: `${levelProgress}%` }} /></div>
          <p>{completedCount} {t.completed}</p>
        </div>
        <div className="profile-settings">
          <h2>{isKg ? "Профилди өзгөртүү" : "Настройки профиля"}</h2>
          <label>{t.name}</label>
          <input value={nameInput} onChange={e => setNameInput(e.target.value)} placeholder={t.namePlaceholder} />
          <button className="primary-button" onClick={() => {
            setName(nameInput.trim());
            addNotification(isKg ? "Профиль жаңыртылды" : "Профиль обновлён");
          }}>{t.saveName}</button>
          <div className="profile-details">
            <div><span>{t.grade}</span><b>{grade}</b></div>
            <div><span>{t.xp}</span><b>{xp}</b></div>
            <div><span>{t.completed}</span><b>{completedCount}</b></div>
          </div>
        </div>
      </div>
    </>
  );

  const renderNotifications = () => (
    <>
      <PageTitle eyebrow="ACTIVITY CENTER" title={t.notifications} description={isKg ? "Сенин акыркы жаңылыктарың" : "Твои последние события"} />
      {notifications.length === 0 ? <Empty icon="🔔" text={t.noNotifications} /> : (
        <div className="notification-list">
          {notifications.map(item => (
            <div className="notification-card" key={item.id}>
              <span>✨</span><div><b>{item.message}</b><small>{item.date}</small></div>
            </div>
          ))}
          <button className="secondary-button" onClick={() => setNotifications([])}>{isKg ? "Баарын тазалоо" : "Очистить уведомления"}</button>
        </div>
      )}
    </>
  );

  const flashcards = subjects.flatMap(subject => subject.topics.map(topic => ({
    front: topic,
    back: getTopicContent(topic, subject, lang).explanation,
    subject: isKg ? subject.kg : subject.ru
  })));

  const dictionary = [
    ["Билим", "Знание", "Knowledge"], ["Китеп", "Книга", "Book"], ["Мектеп", "Школа", "School"],
    ["Достук", "Дружба", "Friendship"], ["Табият", "Природа", "Nature"], ["Суу", "Вода", "Water"],
    ["Үй-бүлө", "Семья", "Family"], ["Мугалим", "Учитель", "Teacher"], ["Окуучу", "Ученик", "Student"],
    ["Ден соолук", "Здоровье", "Health"], ["Күн", "Солнце / день", "Sun / day"], ["Жер", "Земля", "Earth"]
  ];

  const renderGrades = () => (
    <>
      <PageTitle eyebrow="PERSONAL LEARNING" title={isKg ? "Классыңды танда" : "Выбери свой класс"} description={isKg ? "Окуу материалдарын классыңа ылайыкташтыр." : "Выбери класс от 1 до 12."} />
      <div className="grade-grid">
        {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
          <button key={n} className={`grade-option ${grade === n ? "grade-selected" : ""}`} onClick={() => selectGrade(n)}>
            <span>{String(n).padStart(2, "0")}</span>
            <b>{n} {isKg ? "класс" : "класс"}</b>
            <small>{grade === n ? (isKg ? "Тандалган" : "Выбран") : (isKg ? "Тандоо" : "Выбрать")}</small>
          </button>
        ))}
      </div>
    </>
  );

  const renderCalendar = () => (
    <>
      <PageTitle eyebrow="STUDY PLANNER" title="Календарь обучения" description="Планируй домашние задания и учебные цели." />
      <div className="tool-panel calendar-panel">
        <label>Дата</label>
        <input type="date" value={calendarDate} onChange={e => setCalendarDate(e.target.value)} />
        <label>Задание или план</label>
        <textarea value={calendarNote} onChange={e => setCalendarNote(e.target.value)} placeholder="Например: решить упражнения по математике" />
        <button className="primary-button" disabled={!calendarNote.trim()} onClick={() => {
          setCalendarItems(old => [{ id: Date.now(), date: calendarDate, text: calendarNote.trim() }, ...old]);
          setCalendarNote("");
        }}>＋ Добавить в календарь</button>
      </div>
      <div className="calendar-list">
        {calendarItems.length ? calendarItems.slice().sort((a, b) => a.date.localeCompare(b.date)).map(item => (
          <div className="calendar-item" key={item.id}>
            <b>{item.date}</b><span>{item.text}</span>
            <button onClick={() => setCalendarItems(old => old.filter(x => x.id !== item.id))}>×</button>
          </div>
        )) : <Empty icon="🗓️" text="Пока нет запланированных заданий" />}
      </div>
    </>
  );

  const renderNotes = () => (
    <>
      <PageTitle eyebrow="PERSONAL WORKSPACE" title={isKg ? "Менин жазууларым" : "Мои заметки"} description={isKg ? "Маанилүү ойлорду жана сабактардын конспекттерин сакта." : "Сохраняй важные мысли, формулы и краткие конспекты."} />
      <div className="tool-panel notes-editor">
        <h3>{editingNote ? (isKg ? "Жазууну өзгөртүү" : "Редактировать заметку") : (isKg ? "Жаңы жазуу" : "Новая заметка")}</h3>
        <input value={noteTitle} onChange={e => setNoteTitle(e.target.value)} placeholder={isKg ? "Жазуунун аталышы" : "Название заметки"} />
        <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder={isKg ? "Бул жерге жаз..." : "Напиши здесь свою заметку..."} rows="5" />
        <div className="notes-actions">
          <button className="primary-button" disabled={!noteTitle.trim() || !noteText.trim()} onClick={() => {
            if (editingNote) {
              setNotes(old => old.map(item => item.id === editingNote ? { ...item, title: noteTitle.trim(), text: noteText.trim(), updated: new Date().toLocaleDateString() } : item));
            } else {
              setNotes(old => [{ id: Date.now(), title: noteTitle.trim(), text: noteText.trim(), updated: new Date().toLocaleDateString() }, ...old]);
            }
            setNoteTitle("");
            setNoteText("");
            setEditingNote(null);
          }}>{editingNote ? (isKg ? "Сактоо" : "Сохранить изменения") : (isKg ? "＋ Кошуу" : "＋ Сохранить заметку")}</button>
          {editingNote && <button className="secondary-button" onClick={() => { setEditingNote(null); setNoteTitle(""); setNoteText(""); }}>{isKg ? "Жокко чыгаруу" : "Отмена"}</button>}
        </div>
      </div>
      <div className="notes-grid">
        {notes.length === 0 ? <Empty icon="📝" text={isKg ? "Азырынча жазуулар жок" : "Пока заметок нет. Создай первую заметку выше."} /> :
          notes.map(item => (
            <article className="note-card" key={item.id}>
              <div className="note-card-top"><span>📝</span><small>{item.updated}</small></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="note-card-actions">
                <button className="small-button" onClick={() => { setEditingNote(item.id); setNoteTitle(item.title); setNoteText(item.text); window.scrollTo({ top: 0, behavior: "smooth" }); }}>{isKg ? "Өзгөртүү" : "Изменить"}</button>
                <button className="small-button danger-button" onClick={() => { setNotes(old => old.filter(note => note.id !== item.id)); if (editingNote === item.id) { setEditingNote(null); setNoteTitle(""); setNoteText(""); } }}>{isKg ? "Өчүрүү" : "Удалить"}</button>
              </div>
            </article>
          ))
        }
      </div>
    </>
  );

  const renderTimetable = () => {
    const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    const dayNames = isKg ? ["Дүйшөмбү", "Шейшемби", "Шаршемби", "Бейшемби", "Жума", "Ишемби", "Жекшемби"] : days;
    return (
      <>
        <PageTitle eyebrow="WEEKLY PLANNER" title={isKg ? "Сабактардын жадыбалы" : "Расписание занятий"} description={isKg ? "Өзүңдүн жумалык окуу планыӊды түз." : "Составь удобное расписание уроков и занятий на неделю."} />
        <div className="tool-panel timetable-form">
          <h3>{isKg ? "Жаңы сабак кошуу" : "Добавить занятие"}</h3>
          <div className="timetable-fields">
            <label>{isKg ? "Күн" : "День"}
              <select value={scheduleDay} onChange={e => setScheduleDay(e.target.value)}>{days.map((day, index) => <option key={day} value={day}>{dayNames[index]}</option>)}</select>
            </label>
            <label>{isKg ? "Убакыт" : "Время"}
              <input type="time" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} />
            </label>
            <label>{isKg ? "Предмет же сабак" : "Предмет или занятие"}
              <input value={scheduleSubject} onChange={e => setScheduleSubject(e.target.value)} placeholder={isKg ? "Математика" : "Например, математика"} />
            </label>
          </div>
          <button className="primary-button" disabled={!scheduleSubject.trim()} onClick={() => { setScheduleItems(old => [...old, { id: Date.now(), day: scheduleDay, time: scheduleTime, subject: scheduleSubject.trim() }].sort((x, y) => days.indexOf(x.day) - days.indexOf(y.day) || x.time.localeCompare(y.time))); setScheduleSubject(""); }}>{isKg ? "＋ Кошуу" : "＋ Добавить в расписание"}</button>
        </div>
        <div className="timetable-grid">
          {days.map((day, index) => {
            const items = scheduleItems.filter(item => item.day === day).sort((x, y) => x.time.localeCompare(y.time));
            return <section className="timetable-day" key={day}>
              <h3>{dayNames[index]}</h3>
              {items.length === 0 ? <p className="timetable-empty">{isKg ? "Сабак жок" : "Пока свободно"}</p> : items.map(item => (
                <div className="timetable-entry" key={item.id}>
                  <b>{item.time}</b><span>{item.subject}</span>
                  <button aria-label="Удалить занятие" onClick={() => setScheduleItems(old => old.filter(x => x.id !== item.id))}>×</button>
                </div>
              ))}
            </section>;
          })}
        </div>
      </>
    );
  };

  const renderRewards = () => (
    <>
      <PageTitle eyebrow="REWARD CENTER" title={isKg ? "Сыйлыктар борбору" : "Центр наград"} description={isKg ? "Окуу аркылуу жаңы жетишкендиктерди ач." : "Следи за достижениями и открывай новые награды за учёбу."} />
      <div className="reward-summary">
        <div><span>⚡</span><b>{xp} XP</b><small>{isKg ? "Жалпы упайлар" : "Всего баллов"}</small></div>
        <div><span>🏅</span><b>{achievementsData.filter(item => (item.type === "xp" ? xp : item.type === "tests" ? testsDone : completedCount) >= item.condition).length}/{achievementsData.length}</b><small>{isKg ? "Алынган сыйлыктар" : "Открыто наград"}</small></div>
        <div><span>🔥</span><b>{streakCount}</b><small>{isKg ? "Күн катары менен" : "Дней серии"}</small></div>
      </div>
      <div className="achievement-grid">
        {achievementsData.map(item => {
          const value = item.type === "xp" ? xp : item.type === "tests" ? testsDone : completedCount;
          const unlocked = value >= item.condition;
          return <div className={`achievement-card ${unlocked ? "achievement-unlocked" : "achievement-locked"}`} key={item.id}>
            <div className="achievement-icon">{item.icon}</div>
            <h3>{isKg ? item.kg : item.ru}</h3>
            <p>{isKg ? item.kgDesc : item.ruDesc}</p>
            <div className="achievement-bottom"><span>{unlocked ? (isKg ? "✓ Алынды" : "✓ Получено") : `${value}/${item.condition}`}</span><div className="mini-progress"><span style={{ width: `${Math.min(100, value / item.condition * 100)}%` }} /></div></div>
          </div>;
        })}
      </div>
      <div className="reward-certificate-link">
        <div><b>🎓 {isKg ? "Окуу сертификаты" : "Сертификат об обучении"}</b><span>{isKg ? "Жыйынтыгың менен сертификат түз." : "Создай сертификат со своими результатами."}</span></div>
        <button className="primary-button" onClick={() => setPage("certificate")}>{isKg ? "Ачуу" : "Открыть сертификат"} →</button>
      </div>
    </>
  );

  const renderFlashcards = () => {
    const card = flashcards[flashIndex % flashcards.length];
    return (
      <>
        <PageTitle eyebrow="MEMORY TRAINING" title="Карточки для запоминания" description="Нажми на карточку, чтобы увидеть объяснение." />
        <div className="flash-wrap">
          <button className="flashcard" onClick={() => setFlashFlipped(v => !v)}>
            <small>{card.subject}</small>
            <strong>{flashFlipped ? card.back : card.front}</strong>
            <span>{flashFlipped ? "Объяснение" : "Нажми, чтобы перевернуть"}</span>
          </button>
          <div className="flash-controls">
            <button className="secondary-button" onClick={() => {
              setFlashIndex(v => (v - 1 + flashcards.length) % flashcards.length);
              setFlashFlipped(false);
            }}>← Назад</button>
            <b>{flashIndex + 1} / {flashcards.length}</b>
            <button className="primary-button" onClick={() => {
              setFlashIndex(v => (v + 1) % flashcards.length);
              setFlashFlipped(false);
            }}>Следующая →</button>
          </div>
        </div>
      </>
    );
  };

  const renderLibrary = () => (
    <>
      <PageTitle eyebrow="DIGITAL LIBRARY" title="Электронная библиотека" description="Учебные материалы по всем предметам." />
      <div className="library-grid">
        {subjects.map(subject => (
          <button className="library-card" key={subject.id} onClick={() => openSubject(subject)}>
            <span>{subject.icon}</span>
            <b>{isKg ? subject.kg : subject.ru}</b>
            <small>{subject.topics.length} тем · Открыть материалы →</small>
          </button>
        ))}
      </div>
    </>
  );

  const renderDictionary = () => (
    <>
      <PageTitle eyebrow="LANGUAGE TOOL" title="Словарь RU / KG / EN" description="Ищи слова и повторяй переводы на трёх языках." />
      <div className="toolbar">
        <input value={dictionarySearch} onChange={e => setDictionarySearch(e.target.value)} placeholder="Поиск слова..." />
      </div>
      <div className="dictionary-grid">
        {dictionary.filter(row => row.join(" ").toLowerCase().includes(dictionarySearch.toLowerCase())).map((row, i) => (
          <div className="dictionary-card" key={i}>
            <b>{row[0]}</b><span>{row[1]}</span><small>{row[2]}</small>
          </div>
        ))}
      </div>
    </>
  );

  const renderLeaderboard = () => (
    <>
      <PageTitle eyebrow="YOUR PROGRESS" title="Учебный рейтинг" description="Твои личные достижения на этом устройстве." />
      <div className="leader-card">
        <div className="leader-medal">🏆</div>
        <div>
          <small>ТВОЙ РЕЗУЛЬТАТ</small>
          <h2>{name || t.student}</h2>
          <p>{xp} XP · {completedCount} уроков · {testsDone} тестов</p>
        </div>
        <strong>#1</strong>
      </div>
      <div className="tool-panel">
        <h3>Как зарабатывать баллы?</h3>
        <p>+15 XP — за завершённый урок · +10 XP за каждый правильный ответ · бонус за ежедневные задания.</p>
      </div>
      <div className="competition-panel">
        <div className="competition-icon">🚀</div>
        <div className="competition-copy">
          <span>{isKg ? "ЖЕКЕ ЧЕЛЛЕНЖ" : "ЛИЧНЫЙ ЧЕЛЛЕНДЖ"}</span>
          <h3>{isKg ? "Апталык максат" : "Недельная цель"}</h3>
          <p>{isKg ? "Жеке максат: 300 XP топтоо." : "Личная цель — набрать 300 XP."}</p>
          <div className="progress-track"><span style={{ width: `${Math.min(100, xp / 300 * 100)}%` }} /></div>
          <small>{Math.min(xp, 300)} / 300 XP</small>
        </div>
      </div>
      <p className="local-ranking-note">{isKg ? "Бул рейтинг ушул браузердеги жеке жыйынтыгыңды көрсөтөт. Башка окуучулар менен онлайн рейтинг үчүн сервер керек." : "Сейчас рейтинг показывает только твой результат в этом браузере. Для общего онлайн-соревнования между учениками понадобится сервер и аккаунты."}</p>
    </>
  );

  const renderCertificate = () => (
    <>
      <PageTitle eyebrow="BILIM KG AWARD" title="Сертификат обучения" description="Сформируй сертификат со своими результатами и распечатай его." />
      <div className="certificate">
        <div className="certificate-inner">
          <span>✦ BILIM KG ✦</span>
          <h1>СЕРТИФИКАТ</h1>
          <p>Настоящий сертификат выдан</p>
          <h2>{name || t.student}</h2>
          <p>ученику {grade} класса</p>
          <div className="certificate-line"></div>
          <b>{completedCount} уроков пройдено · {xp} XP</b>
          <small>BILIM KG · 2026</small>
        </div>
      </div>
      <button className="primary-button print-button" onClick={() => window.print()}>🖨️ Печать / сохранить PDF</button>
    </>
  );

  return (
    <div className={`app-shell theme-${theme}`} data-theme={theme}>
      {renderHeader()}
      <div className="app-body">
        {renderSidebar()}
        <main className="main-content">
          {page === "home" && renderHome()}
          {page === "grades" && renderGrades()}
          {page === "calendar" && renderCalendar()}
          {page === "timetable" && renderTimetable()}
          {page === "notes" && renderNotes()}
          {page === "rewards" && renderRewards()}
          {page === "flashcards" && renderFlashcards()}
          {page === "library" && renderLibrary()}
          {page === "dictionary" && renderDictionary()}
          {page === "leaderboard" && renderLeaderboard()}
          {page === "certificate" && renderCertificate()}
          {page === "subjects" && renderSubjects()}
          {page === "topics" && renderTopics()}
          {page === "lesson" && renderLesson()}
          {page === "test" && renderTest()}
          {page === "result" && renderResult()}
          {page === "tasks" && renderTasks()}
          {page === "achievements" && renderAchievements()}
          {page === "favorites" && renderFavorites()}
          {page === "stats" && renderStats()}
          {page === "profile" && renderProfile()}
          {page === "notifications" && renderNotifications()}
          <footer className="footer">© 2026 BILIM KG · {isKg ? "Билим менен келечекке!" : "Учись с удовольствием!"}</footer>
        </main>
      </div>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div><b>{value}</b><span>{label}</span></div>
    </div>
  );
}

function PageTitle({ eyebrow, title, description }) {
  return (
    <div className="page-title">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

function SubjectCard({ subject, lang, onClick, completed }) {
  return (
    <button className="subject-card" onClick={onClick}>
      <div className="subject-card-top">
        <span className="subject-icon">{subject.icon}</span>
        <span className="subject-arrow">↗</span>
      </div>
      <b>{lang === "kg" ? subject.kg : subject.ru}</b>
      <div className="subject-card-bottom">
        <span>{completed}/6 {lang === "kg" ? "сабак" : "уроков"}</span>
        <div className="mini-progress"><span style={{ width: `${completed / 6 * 100}%` }} /></div>
      </div>
    </button>
  );
}

function Empty({ icon, text }) {
  return <div className="empty-state"><span>{icon}</span><p>{text}</p></div>;
}

export default App;3
