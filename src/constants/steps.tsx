import type { Answer } from '../components/Kotlin.tsx'
import type { ReactNode } from 'react'
import { kotlinSteps } from './kotlinSteps.tsx'
import { goSteps } from './goSteps.tsx'
import { typeScriptSteps } from './typeScriptSteps.tsx'

export type StepParams = {
  answers: Answer[]
  description: string
  code: ReactNode
}

export type RecordStep = Array<{
  quiz: string
  params: Array<StepParams>
  result: string
  userStory: string
  businessRules: string
  number: string
}>

export type Step = Record<'kotlin' | 'go' | 'typescript', RecordStep>

export const steps: Step = {
  kotlin: kotlinSteps,
  go: goSteps,
  typescript: typeScriptSteps,
}
