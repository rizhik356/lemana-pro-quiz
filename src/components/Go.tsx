import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../scss/quiz.module.scss'
import type { Answer } from './Kotlin.tsx'
import { steps } from '../constants/steps.tsx'
import axios from 'axios'

const Go = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [result, setResult] = useState<string>('description')
  const navigate = useNavigate()
  const [currentQuiz] = useState<number>(
    Math.floor(Math.random() * steps.go.length),
  )

  const handleAnswerChange = (answer: Answer) => {
    setSelectedAnswer(answer)
  }

  const handlePost = async () => {
    await axios.post('http://82.202.169.113/params', {
      id: 1,
      parentId: 1,
      params: { power: false },
    })
    return
  }

  const handleSubmit = () => {
    if (selectedAnswer?.correct) {
      if (currentStep === steps.go[currentQuiz].params.length - 1) {
        setResult('win')
        return handlePost()
      }
      setSelectedAnswer(null)
      setCurrentStep(currentStep + 1)
      return
    }
    setResult('lose')
  }

  if (result === 'win') {
    return (
      <div className={styles.win}>
        <h1>{`Поздравляю!\nВы победили`}</h1>
        <div className={styles.code}>
          <div className={styles.terminalButtons}>
            <span></span>
          </div>
          <span className={styles.quiz}>{steps.go[currentQuiz].result}</span>
        </div>
        <button className={'btn'} onClick={() => navigate('/')}>
          На главную
        </button>
      </div>
    )
  }
  if (result === 'lose') {
    return (
      <div className={`${styles.win} ${styles.full}`}>
        <h1>Вы проиграли</h1>
        <button className={'btn'} onClick={() => navigate('/')}>
          На главную
        </button>
      </div>
    )
  }
  if (result === 'description') {
    return (
      <div className={styles.jiraContainer}>
        <div className={styles.jiraTask}>
          <div className={styles.taskHeader}>
            <div className={styles.taskId}>{steps.go[currentQuiz].number}</div>
            <div className={styles.taskType}>Story</div>
          </div>

          <h1 className={styles.taskTitle}>
            Реализация системы оценки доставки заказов
          </h1>

          <div className={styles.taskMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Status:</span>
              <span className={styles.metaValue}>To Do</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Assignee:</span>
              <span className={styles.metaValue}>Developer</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Reporter:</span>
              <span className={styles.metaValue}>Product Owner</span>
            </div>
          </div>

          <div className={styles.descriptionSection}>
            <h3>📖 Description</h3>
            <div className={styles.descriptionContent}>
              <p>{steps.go[currentQuiz].userStory}</p>
            </div>
          </div>

          <div className={styles.acceptanceSection}>
            <h3>✅ Acceptance Criteria</h3>
            <div className={styles.criteriaList}>
              {steps.go[currentQuiz].businessRules.split('\n').map((item) => {
                return item ? (
                  <div className={styles.criterion}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span>{item}</span>
                  </div>
                ) : null
              })}
            </div>
          </div>

          <div className={styles.taskActions}>
            <button
              className={styles.startBtn}
              onClick={() => {
                setResult('default')
              }}
            >
              Start Implementation
            </button>
          </div>
        </div>
      </div>
    )
  }
  return (
    result === 'default' && (
      <div className={styles.container}>
        <div className={styles.code}>
          <div className={styles.terminalButtons}>
            <span></span>
          </div>
          <span className={styles.quiz}>{steps.go[currentQuiz].quiz}</span>
          {steps.go[currentQuiz].params[currentStep].code}
          <span className={styles.footer}>{`
}`}</span>
        </div>
        <div className={styles.answer_container}>
          <h2>{steps.go[currentQuiz].params[currentStep].description}</h2>
          <div className={styles.radio_container}>
            <div className={styles.radio}>
              {steps.go[currentQuiz].params[currentStep].answers.map(
                (answer) => (
                  <div key={answer.id} className={styles.item}>
                    <input
                      type="radio"
                      name="kotlin-question"
                      value={answer.value}
                      checked={selectedAnswer?.value === answer.value}
                      onChange={() => handleAnswerChange(answer)}
                      className={styles.radio_input}
                    />
                    <span className={styles.answerText}>{answer.text}</span>
                  </div>
                ),
              )}
            </div>
          </div>
          <div className={styles.btn_container}>
            <button onClick={handleSubmit} className={'btn'}>
              Ответить
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default Go
