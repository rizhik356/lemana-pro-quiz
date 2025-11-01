import styles from '../scss/quiz.module.scss'
import { useMemo, useState } from 'react'
import { steps } from '../constants/steps.tsx'

export type Answer = { id: string; value: string; text: string; correct?: true }

const Kotlin = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [result, setResult] = useState<string>('default')
  const [currentQuiz] = useState<number>(
    Math.floor(Math.random() * steps.kotlin.length),
  )

  const handleAnswerChange = (answer: Answer) => {
    setSelectedAnswer(answer)
  }

  const handleSubmit = () => {
    if (selectedAnswer?.correct) {
      console.log(currentStep, steps.kotlin[currentQuiz].length)
      if (currentStep === steps.kotlin[currentQuiz].length - 1) {
        setResult('win')
        return
      }
      setSelectedAnswer(null)
      setCurrentStep(currentStep + 1)
    }
  }

  const currentStepData = useMemo(() => {
    return steps.kotlin[currentQuiz][currentStep]
  }, [currentStep])

  if (result === 'win') {
    return (
      <div className={styles.win}>
        <h1>{`Поздравляю!\nВы победили`}</h1>
      </div>
    )
  }
  return (
    result === 'default' && (
      <div className={styles.container}>
        <div className={styles.code}>
          <span>{`class DeliveryEstimator(
    private val storeCalendar: StoreCalendar,
    private val pickingRules: PickingRules,
    private val clock: Clock
) {
    fun estimate(): LocalDate {`}</span>
          {currentStepData.code}
          <span className={styles.footer}>{`    }
}`}</span>
        </div>
        <div className={styles.answer_container}>
          <h2>{currentStepData.description}</h2>
          <div className={styles.radio_container}>
            <div className={styles.radio}>
              {currentStepData.answers.map((answer) => (
                <div key={answer.id} className={styles.item}>
                  <input
                    type="radio"
                    name="kotlin-question"
                    value={answer.value}
                    checked={selectedAnswer?.value === answer.value}
                    onChange={() => handleAnswerChange(answer)}
                    className={styles.radio_input}
                  />
                  <span className={styles.answerText}>
                    <strong>{answer.value})</strong> {answer.text}
                  </span>
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

export default Kotlin
