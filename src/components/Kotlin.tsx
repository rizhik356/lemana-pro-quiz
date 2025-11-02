import styles from '../scss/quiz.module.scss'
import { useState } from 'react'
import { steps } from '../constants/steps.tsx'
import { useNavigate } from 'react-router-dom'

export type Answer = { id: string; value: string; text: string; correct?: true }

const Kotlin = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [result, setResult] = useState<string>('default')
  const navigate = useNavigate()
  const [currentQuiz] = useState<number>(
    Math.floor(Math.random() * steps.kotlin.length),
  )

  const handleAnswerChange = (answer: Answer) => {
    setSelectedAnswer(answer)
  }

  const handleSubmit = () => {
    if (selectedAnswer?.correct) {
      if (currentStep === steps.kotlin[currentQuiz].params.length - 1) {
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
          <span className={styles.quiz}>
            {steps.kotlin[currentQuiz].result}
          </span>
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
          <span className={styles.quiz}>{steps.kotlin[currentQuiz].quiz}</span>
          {steps.kotlin[currentQuiz].params[currentStep].code}
          <span className={styles.footer}>{`    }
}`}</span>
        </div>
        <div className={styles.answer_container}>
          <h2>{steps.kotlin[currentQuiz].params[currentStep].description}</h2>
          <div className={styles.radio_container}>
            <div className={styles.radio}>
              {steps.kotlin[currentQuiz].params[currentStep].answers.map(
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

export default Kotlin
