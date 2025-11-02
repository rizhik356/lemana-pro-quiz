import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type RecordStep } from '../constants/steps.tsx'
import styles from '../scss/quiz.module.scss'
import type { Answer } from './Kotlin.tsx'

const Quiz = ({ steps }: { steps: RecordStep }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [result, setResult] = useState<string>('default')
  const navigate = useNavigate()
  const [currentQuiz] = useState<number>(
    Math.floor(Math.random() * steps.length),
  )

  const handleAnswerChange = (answer: Answer) => {
    setSelectedAnswer(answer)
  }

  const handleSubmit = () => {
    if (selectedAnswer?.correct) {
      if (currentStep === steps[currentQuiz].params.length - 1) {
        setResult('win')
        return
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
          <span className={styles.quiz}>{steps[currentQuiz].result}</span>
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
  return (
    result === 'default' && (
      <div className={styles.container}>
        <div className={styles.code}>
          <div className={styles.terminalButtons}>
            <span></span>
          </div>
          <span className={styles.quiz}>{steps[currentQuiz].quiz}</span>
          {steps[currentQuiz].params[currentStep].code}
          <span className={styles.footer}>{`    }
}`}</span>
        </div>
        <div className={styles.answer_container}>
          <h2>{steps[currentQuiz].params[currentStep].description}</h2>
          <div className={styles.radio_container}>
            <div className={styles.radio}>
              {steps[currentQuiz].params[currentStep].answers.map((answer) => (
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
              ))}
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

export default Quiz
