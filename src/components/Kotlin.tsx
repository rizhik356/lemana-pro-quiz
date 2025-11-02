import { steps } from '../constants/steps.tsx'
import Quiz from './Quiz.tsx'

export type Answer = { id: string; value: string; text: string; correct?: true }

const Kotlin = () => {
  return <Quiz steps={steps.kotlin} />
}

export default Kotlin
