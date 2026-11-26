import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ExamPrep.css";

const examSubjects = {
  9: [
    {
      id: "algebra",
      title: "Алгебра",
      icon: "📐",
      type: "Письменная работа",
      description: "Уравнения, функции, выражения и задачи.",
      questions: [
        {
          q: "Решите уравнение: 3x + 5 = 20",
          options: ["3", "5", "7", "10"],
          answer: 1,
          explanation: "3x = 20 − 5 = 15, поэтому x = 5."
        },
        {
          q: "Чему равно значение выражения 2² + 3²?",
          options: ["10", "12", "13", "25"],
          answer: 2,
          explanation: "2² + 3² = 4 + 9 = 13."
        },
        {
          q: "Найдите корни уравнения x² − 9 = 0.",
          options: ["3", "−3", "−3 и 3", "9 и −9"],
          answer: 2,
          explanation: "x² = 9, значит x = −3 или x = 3."
        }
      ]
    },
    {
      id: "native",
      title: "Родной язык",
      icon: "📚",
      type: "Изложение и сочинение",
      description: "Подготовка к письменной работе и грамотному изложению мыслей.",
      writing: {
        title: "Тема для сочинения",
        prompt: "Почему важно беречь родной язык?",
        tips: [
          "Вступление: объясните, что для вас означает родной язык.",
          "Основная часть: приведите два аргумента и примеры.",
          "Заключение: сформулируйте собственный вывод.",
          "Проверьте орфографию, пунктуацию и структуру текста."
        ]
      }
    },
    {
      id: "state-language",
      title: "Государственный язык",
      icon: "🇰🇬",
      type: "Языковая подготовка",
      description: "Тренировка чтения, грамматики и понимания текста.",
      questions: [
        {
          q: "Как переводится кыргызское слово «мектеп»?",
          options: ["Дом", "Школа", "Книга", "Друг"],
          answer: 1,
          explanation: "«Мектеп» означает «школа»."
        },
        {
          q: "Выберите правильное написание.",
          options: ["Кыргызстан", "Кыргизстан", "Кыргыстанн", "Кыргызыстан"],
          answer: 0,
          explanation: "Правильное написание — Кыргызстан."
        },
        {
          q: "Какое слово обозначает действие?",
          options: ["Китеп", "Жакшы", "Окуйт", "Кызыл"],
          answer: 2,
          explanation: "«Окуйт» — глагол, обозначающий действие."
        }
      ]
    },
    {
      id: "history",
      title: "История Кыргызстана",
      icon: "🏛️",
      type: "Устный экзамен",
      description: "Исторические события, личности и устные ответы.",
      oral: [
        "Расскажите об образовании Кыргызского государства.",
        "Какое значение имел эпос «Манас» для кыргызского народа?",
        "Расскажите о важных этапах истории Кыргызстана.",
        "Назовите известных исторических деятелей Кыргызстана."
      ]
    }
  ],
  11: [
    {
      id: "algebra",
      title: "Алгебра",
      icon: "📐",
      type: "Письменная комплексная работа",
      description: "Функции, уравнения, неравенства и математические задачи.",
      questions: [
        {
          q: "Найдите производную функции f(x) = x².",
          options: ["x", "2x", "x³", "2"],
          answer: 1,
          explanation: "По правилу степени производная x² равна 2x."
        },
        {
          q: "Решите уравнение 2x − 7 = 9.",
          options: ["6", "7", "8", "9"],
          answer: 2,
          explanation: "2x = 16, следовательно x = 8."
        },
        {
          q: "Чему равен sin 30°?",
          options: ["0", "1", "1/2", "√3/2"],
          answer: 2,
          explanation: "sin 30° = 1/2."
        },
        {
          q: "Найдите значение log₂ 8.",
          options: ["2", "3", "4", "8"],
          answer: 1,
          explanation: "2³ = 8, поэтому log₂ 8 = 3."
        }
      ]
    },
    {
      id: "native",
      title: "Родной язык и литература",
      icon: "📚",
      type: "Письменная работа",
      description: "Сочинение, анализ текста, грамотность и аргументация.",
      writing: {
        title: "Тема для сочинения",
        prompt: "Как образование влияет на будущее человека?",
        tips: [
          "Сформулируйте главную мысль.",
          "Подкрепите её примерами из жизни или литературы.",
          "Свяжите абзацы логическими переходами.",
          "Завершите работу самостоятельным выводом."
        ]
      }
    },
    {
      id: "state-language",
      title: "Государственный язык",
      icon: "🇰🇬",
      type: "Языковая подготовка",
      description: "Грамматика, чтение, понимание текста и письменная речь.",
      questions: [
        {
          q: "Как переводится слово «билим»?",
          options: ["Дружба", "Знание", "Природа", "История"],
          answer: 1,
          explanation: "«Билим» означает «знание»."
        },
        {
          q: "Как называется часть речи, обозначающая действие?",
          options: ["Зат атооч", "Сын атооч", "Этиш", "Сан атооч"],
          answer: 2,
          explanation: "Этиш — глагол."
        },
        {
          q: "Выберите слово со значением «книга».",
          options: ["Китеп", "Дептер", "Калем", "Мектеп"],
          answer: 0,
          explanation: "Китеп — книга."
        }
      ]
    },
    {
      id: "history",
      title: "История Кыргызстана",
      icon: "🏛️",
      type: "Устный экзамен",
      description: "Подготовка к устным вопросам по истории.",
      oral: [
        "Расскажите об основных этапах истории кыргызского народа.",
        "Какую роль сыграл эпос «Манас» в сохранении культуры?",
        "Расскажите об истории образования Кыргызской Республики.",
        "Какие исторические события повлияли на развитие независимого Кыргызстана?",
        "Назовите известных государственных и общественных деятелей Кыргызстана."
      ]
    }
  ]
};

function getSubjects(track, grade) {
  const subjects = examSubjects[grade] || examSubjects[9];

  return subjects.map((subject) => {
    if (subject.id === "native") {
      return {
        ...subject,
        title: track === "kg"
          ? "Кыргыз тили жана адабияты"
          : "Русский язык и литература"
      };
    }

    if (subject.id === "state-language") {
      return {
        ...subject,
        title: track === "kg"
          ? "Орус тили"
          : "Кыргыз тили"
      };
    }

    return subject;
  });
}

export default function ExamPrep() {
  const { track = "ru", grade = "9" } = useParams();
  const gradeNumber = Number(grade);
  const subjects = getSubjects(track, gradeNumber);

  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const subject = subjects.find((item) => item.id === selected);
  const questions = subject?.questions || [];

  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );

  function startSubject(id) {
    setSelected(id);
    setAnswers({});
    setFinished(false);
    setShowAnswers(false);
  }

  function chooseAnswer(questionIndex, answerIndex) {
    if (finished) return;
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  }

  function finishTest() {
    setFinished(true);
    setShowAnswers(true);
  }

  function resetTest() {
    setAnswers({});
    setFinished(false);
    setShowAnswers(false);
  }

  return (
    <main className="exam-page">
      <div className="exam-container">
        <Link
          to={`/classes/${track}`}
          className="exam-back"
        >
          ← Назад к классам
        </Link>

        <section className="exam-hero">
          <div className="exam-hero-label">BILIM KG • EXAM PREPARATION</div>
          <div className="exam-hero-icon">🎓</div>
          <h1>Подготовка к экзаменам</h1>
          <p>
            {gradeNumber} класс ·
            {track === "kg" ? " Кыргызские классы" : " Русские классы"}
          </p>
          <div className="exam-hero-bottom">
            <span>📖 Учись</span>
            <span>✍️ Тренируйся</span>
            <span>🏆 Проверяй знания</span>
          </div>
        </section>

        {!subject && (
          <>
            <div className="exam-section-heading">
              <div>
                <h2>Экзаменационные предметы</h2>
                <p>Выбери предмет, чтобы начать подготовку</p>
              </div>
              <span className="exam-count">{subjects.length} предмета</span>
            </div>

            <div className="exam-subject-grid">
              {subjects.map((item, index) => (
                <button
                  className="exam-subject-card"
                  key={item.id}
                  onClick={() => startSubject(item.id)}
                >
                  <div className="exam-card-top">
                    <span className="exam-subject-icon">{item.icon}</span>
                    <span className="exam-card-number">
                      0{index + 1}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="exam-card-type">{item.type}</div>
                  <div className="exam-card-link">
                    Начать подготовку <span>→</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="exam-notice">
              <span>ℹ️</span>
              <p>
                Здесь размещены тренировочные материалы BILIM KG.
                Они не являются официальными экзаменационными билетами.
                Перечень и формат экзаменов необходимо сверять с актуальными
                документами Министерства просвещения.
              </p>
            </div>
          </>
        )}

        {subject && (
          <section className="exam-workspace">
            <button
              className="exam-back"
              onClick={() => {
                setSelected(null);
                resetTest();
              }}
            >
              ← Все экзаменационные предметы
            </button>

            <div className="exam-workspace-heading">
              <span>{subject.icon}</span>
              <div>
                <h2>{subject.title}</h2>
                <p>{subject.type}</p>
              </div>
            </div>

            {questions.length > 0 && (
              <div className="exam-test">
                <div className="exam-test-heading">
                  <div>
                    <h3>Тренировочный тест</h3>
                    <p>Выбери один правильный ответ</p>
                  </div>
                  <span className="exam-progress">
                    {Object.keys(answers).length}/{questions.length}
                  </span>
                </div>

                {questions.map((question, index) => (
                  <article className="exam-question" key={index}>
                    <div className="exam-question-number">
                      ВОПРОС {index + 1}
                    </div>
                    <h4>{question.q}</h4>

                    <div className="exam-options">
                      {question.options.map((option, optionIndex) => {
                        const isSelected = answers[index] === optionIndex;
                        const isCorrect = question.answer === optionIndex;

                        let className = "exam-option";
                        if (isSelected) className += " selected";
                        if (showAnswers && isCorrect) className += " correct";
                        if (showAnswers && isSelected && !isCorrect) {
                          className += " incorrect";
                        }

                        return (
                          <button
                            key={optionIndex}
                            className={className}
                            onClick={() => chooseAnswer(index, optionIndex)}
                            disabled={finished}
                          >
                            <span className="exam-option-letter">
                              {String.fromCharCode(65 + optionIndex)}
                            </span>
                            {option}
                            {showAnswers && isCorrect && <span>✓</span>}
                          </button>
                        );
                      })}
                    </div>

                    {showAnswers && (
                      <div className="exam-explanation">
                        <strong>Объяснение:</strong> {question.explanation}
                      </div>
                    )}
                  </article>
                ))}

                {!finished ? (
                  <button
                    className="exam-primary-button"
                    onClick={finishTest}
                    disabled={Object.keys(answers).length !== questions.length}
                  >
                    Завершить тест
                  </button>
                ) : (
                  <div className="exam-result">
                    <div className="exam-result-icon">
                      {score === questions.length ? "🏆" : "📘"}
                    </div>
                    <h3>Тест завершён!</h3>
                    <div className="exam-score">
                      {score} <span>/ {questions.length}</span>
                    </div>
                    <p>
                      Правильных ответов: {score} из {questions.length}
                    </p>
                    <button
                      className="exam-primary-button"
                      onClick={resetTest}
                    >
                      Пройти ещё раз
                    </button>
                  </div>
                )}
              </div>
            )}

            {subject.writing && (
              <div className="exam-writing">
                <div className="exam-writing-label">✍️ ПИСЬМЕННАЯ ПРАКТИКА</div>
                <h3>{subject.writing.title}</h3>
                <p className="exam-writing-prompt">
                  {subject.writing.prompt}
                </p>
                <h4>План подготовки</h4>
                <ul>
                  {subject.writing.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
                <label htmlFor="exam-essay">Твой черновик</label>
                <textarea
                  id="exam-essay"
                  placeholder="Начни писать своё сочинение здесь..."
                  rows={9}
                />
                <p className="exam-writing-note">
                  Черновик можно использовать для самостоятельной тренировки.
                  Автоматическая проверка сочинения пока не подключена.
                </p>
              </div>
            )}

            {subject.oral && (
              <div className="exam-oral">
                <div className="exam-writing-label">🎙️ УСТНАЯ ПРАКТИКА</div>
                <h3>Вопросы для подготовки</h3>
                <p>Попробуй ответить на каждый вопрос полным предложением.</p>
                {subject.oral.map((question, index) => (
                  <details className="exam-oral-question" key={index}>
                    <summary>
                      <span>Вопрос {index + 1}</span>
                      {question}
                    </summary>
                    <div>
                      Подготовь ответ: назови основные факты, объясни их
                      значение и приведи исторические примеры.
                    </div>
                  </details>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}