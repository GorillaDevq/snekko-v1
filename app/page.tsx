"use client";

import { FormEvent, useState } from "react";

type Question = {
  id: "product" | "capacity" | "power";
  label: string;
  hint: string;
  options: string[];
};

const questions: Question[] = [
  {
    id: "product",
    label: "Что планируете выпускать?",
    hint: "От продукта зависит тип машины и набор сменных узлов.",
    options: ["Пельмени и вареники", "Мясные полуфабрикаты", "Нужен комплект цеха"],
  },
  {
    id: "capacity",
    label: "Какой объём нужен за смену?",
    hint: "Подберём производительность без переплаты за лишнюю мощность.",
    options: ["До 300 кг", "300–800 кг", "Больше 800 кг", "Пока не знаю"],
  },
  {
    id: "power",
    label: "Какое питание доступно в помещении?",
    hint: "Проверим совместимость оборудования до поставки.",
    options: ["220 В", "380 В", "Есть оба варианта", "Помещение ещё выбираю"],
  },
];

const categories = [
  {
    number: "01",
    title: "Пельмени и вареники",
    description: "Формовка, тесто и фарш — единым комплектом под нужный вес изделия.",
    tags: ["JGL-120 / 135", "тестомесы", "фаршемешалки"],
  },
  {
    number: "02",
    title: "Мясопереработка",
    description: "Подготовка сырья для стабильной текстуры и повторяемой рецептуры.",
    tags: ["волчки", "куттеры", "мешалки"],
  },
  {
    number: "03",
    title: "Холод и упаковка",
    description: "Сохранить качество после формовки и подготовить продукт к продаже.",
    tags: ["шоковая заморозка", "вакуум", "лёд"],
  },
];

const process = [
  ["Разбираем задачу", "Продукт, рецептура, кг за смену, помещение и срок запуска."],
  ["Проверяем решение", "Сверяем питание, габариты, опции и тестируем на вашем сырье."],
  ["Фиксируем смету", "Модель, обязательные опции, логистика и запуск — до договора."],
  ["Привозим и запускаем", "Пусконаладка, настройка продукта и обучение оператора."],
  ["Остаёмся на связи", "Матрицы, ножи, решётки, запчасти и помощь после запуска."],
] as const;

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<Question["id"], string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const question = questions[step];
  const isContactStep = step === questions.length;

  function chooseAnswer(id: Question["id"], value: string) {
    setAnswers((current) => ({ ...current, [id]: value }));
    setStep((current) => current + 1);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function startSelection() {
    document.querySelector("#selection")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Snekko — на главную">
          <span className="header-brand-word" aria-hidden="true">
            Snek<span>k</span>o
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#equipment">Оборудование</a>
          <a href="#service">Сервис</a>
          <a href="#process">Как работаем</a>
        </nav>
        <button className="header-cta" type="button" onClick={startSelection}>
          Подобрать оборудование
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Оборудование для малых пищевых производств</p>
          <h1>Запускаем цех.<br /><em>Не просто привозим станок.</em></h1>
          <p className="hero-lead">
            Подберём оборудование под ваш продукт, помещение и объём. Проверим,
            привезём, настроим и обучим оператора.
          </p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={startSelection}>
              Получить подбор <span aria-hidden="true">↗</span>
            </button>
            <a className="button button-text" href="#equipment">
              Смотреть направления <span aria-hidden="true">↓</span>
            </a>
          </div>
          <ul className="hero-proof" aria-label="Что входит в работу">
            <li><span>01</span> Тест на вашем продукте</li>
            <li><span>02</span> Пусконаладка</li>
            <li><span>03</span> Обучение оператора</li>
          </ul>
        </div>

        <div className="machine-stage" aria-label="Пример подбора пельменного оборудования">
          <div className="stage-topline">
            <span>SNEKKO / SELECTION 01</span>
            <span className="live-mark"><i /> ПОДБОР</span>
          </div>
          <div className="machine-visual" aria-hidden="true">
            <div className="machine-shadow" />
            <div className="hopper hopper-left" />
            <div className="hopper hopper-right" />
            <div className="machine-body">
              <div className="control-panel"><b /> <b /> <b /></div>
              <div className="service-door" />
              <div className="output-unit"><span /><span /><span /></div>
              <div className="wheel wheel-one" />
              <div className="wheel wheel-two" />
            </div>
          </div>
          <div className="spec spec-one"><strong>100–120</strong><small>кг / час</small></div>
          <div className="spec spec-two"><strong>7–30</strong><small>грамм / изделие</small></div>
          <div className="stage-caption">
            <div><span>JGL-135</span><strong>Пельменная линия</strong></div>
            <p>Формовка + подготовка теста и фарша</p>
          </div>
        </div>
      </section>

      <div className="signal-strip" aria-label="Ключевые параметры подбора">
        <span>ПРОДУКТ</span><i />
        <span>ПРОИЗВОДИТЕЛЬНОСТЬ</span><i />
        <span>ПОМЕЩЕНИЕ</span><i />
        <span>ЗАПУСК</span>
      </div>

      <section className="section problem-section" id="service">
        <div className="section-heading">
          <p className="eyebrow"><span /> Сначала задача, потом модель</p>
          <h2>Оборудование должно работать<br />в вашем цехе. <em>Не на картинке.</em></h2>
        </div>
        <div className="problem-grid">
          <article>
            <span className="card-index">A / 01</span>
            <h3>Под продукт</h3>
            <p>Учитываем рецептуру, вес изделия, толщину теста и нужные матрицы.</p>
            <div className="card-line"><i /><span>точная конфигурация</span></div>
          </article>
          <article>
            <span className="card-index">A / 02</span>
            <h3>Под помещение</h3>
            <p>Проверяем 220/380 В, воду, слив, габариты и путь заноса до поставки.</p>
            <div className="card-line"><i /><span>без сюрпризов на монтаже</span></div>
          </article>
          <article>
            <span className="card-index">A / 03</span>
            <h3>Под запуск</h3>
            <p>Настраиваем машину на продукте и обучаем команду стабильной работе.</p>
            <div className="card-line"><i /><span>производство с первого дня</span></div>
          </article>
        </div>
      </section>

      <section className="section equipment-section" id="equipment">
        <div className="section-heading horizontal-heading">
          <div>
            <p className="eyebrow light"><span /> Направления</p>
            <h2>Собираем решение<br />вокруг продукта</h2>
          </div>
          <p>От одной ходовой машины до связанного комплекта малого цеха.</p>
        </div>
        <div className="category-list">
          {categories.map((category) => (
            <article className="category-row" key={category.number}>
              <span className="category-number">{category.number}</span>
              <div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
              <ul>
                {category.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <button type="button" onClick={startSelection} aria-label={`Подобрать: ${category.title}`}>↗</button>
            </article>
          ))}
        </div>
      </section>

      <section className="section process-section" id="process">
        <div className="process-intro">
          <p className="eyebrow"><span /> От заявки до выпуска</p>
          <h2>Один ответственный<br />за весь запуск</h2>
          <p>
            Вы видите модель, полную смету и требования к помещению до того,
            как оборудование отправится в путь.
          </p>
        </div>
        <ol className="process-list">
          {process.map(([title, description], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="selection-section" id="selection">
        <div className="selection-copy">
          <p className="eyebrow"><span /> Подбор за 3 минуты</p>
          <h2>Начнём не с модели.<br /><em>Начнём с вашей задачи.</em></h2>
          <p>
            После заявки подготовим 2–3 подходящих варианта с требованиями
            к помещению и составом запуска.
          </p>
          <div className="selection-result">
            <span>На выходе</span>
            <ul>
              <li>Подходящие модели</li>
              <li>Обязательные опции</li>
              <li>План следующего шага</li>
            </ul>
          </div>
        </div>

        <div className="quiz-card">
          {!submitted ? (
            <>
              <div className="quiz-progress">
                <span>{isContactStep ? "Контакты" : `Вопрос ${step + 1} из ${questions.length}`}</span>
                <div>{[0, 1, 2, 3].map((item) => <i className={item <= step ? "active" : ""} key={item} />)}</div>
              </div>
              {!isContactStep && question ? (
                <div className="question-panel" key={question.id}>
                  <h3>{question.label}</h3>
                  <p>{question.hint}</p>
                  <div className="option-grid">
                    {question.options.map((option) => (
                      <button type="button" key={option} onClick={() => chooseAnswer(question.id, option)}>
                        <span>{option}</span><i>↗</i>
                      </button>
                    ))}
                  </div>
                  {step > 0 && <button className="back-button" type="button" onClick={() => setStep((current) => current - 1)}>← Назад</button>}
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <h3>Куда отправить подбор?</h3>
                  <p>Оставьте контакт — свяжемся, чтобы уточнить продукт и сроки.</p>
                  <label>Как к вам обращаться<input name="name" required placeholder="Имя" autoComplete="name" /></label>
                  <label>Телефон<input name="phone" required type="tel" placeholder="+7 999 000-00-00" autoComplete="tel" /></label>
                  <button className="button form-submit" type="submit">Получить подбор <span>↗</span></button>
                  <small>Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</small>
                  <button className="back-button" type="button" onClick={() => setStep(questions.length - 1)}>← Назад</button>
                </form>
              )}
            </>
          ) : (
            <div className="success-state">
              <span>✓</span>
              <p>Прототип заявки готов</p>
              <h3>Ответы собраны.<br />Осталось подключить канал отправки.</h3>
              <button type="button" onClick={() => { setSubmitted(false); setStep(0); setAnswers({}); }}>Пройти ещё раз</button>
              <small>{Object.values(answers).filter(Boolean).join(" · ")}</small>
            </div>
          )}
        </div>
      </section>

      <section className="section faq-section">
        <div>
          <p className="eyebrow"><span /> Коротко о важном</p>
          <h2>До покупки<br />должно быть понятно всё</h2>
        </div>
        <div className="faq-list">
          <details><summary>Можно проверить машину на нашем сырье?<span>+</span></summary><p>Да, для ходовых моделей закладываем тест продукта до финального решения. Условия фиксируются в предложении.</p></details>
          <details><summary>Что нужно подготовить в помещении?<span>+</span></summary><p>Проверяем питание, воду, слив, вентиляцию, габариты и путь заноса. Вы получите список требований вместе с подбором.</p></details>
          <details><summary>Пусконаладка и обучение входят в поставку?<span>+</span></summary><p>Состав запуска указывается отдельно по каждой модели: настройка, тестовый выпуск и обучение оператора.</p></details>
          <details><summary>Что будет, если понадобится другая форма изделия?<span>+</span></summary><p>Подберём совместимую матрицу под форму и вес, а также заранее покажем стоимость сменного узла.</p></details>
        </div>
      </section>

      <footer>
        <div className="footer-brand">Snek<span>k</span>o</div>
        <p>Оборудование, которое запускает производство.</p>
        <button type="button" onClick={startSelection}>Обсудить задачу <span>↗</span></button>
        <small>© 2026 Snekko · Прототип лендинга</small>
      </footer>
    </main>
  );
}
