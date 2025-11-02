import Start from '../components/Start.tsx'
import Kotlin from '../components/Kotlin.tsx'
import Go from '../components/Go.tsx'
import TypeScript from '../components/TypeScript.tsx'

export const routes = [
  { element: <Start />, path: '/' },
  { element: <Kotlin />, path: '/kotlin' },
  { element: <Go />, path: '/go' },
  { element: <TypeScript />, path: 'type-script' },
]
