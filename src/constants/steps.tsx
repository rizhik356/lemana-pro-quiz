import type { Answer } from '../components/Kotlin.tsx'
import styles from '../scss/quiz.module.scss'
import type { ReactNode } from 'react'

export type StepParams = {
  answers: Answer[]
  description: string
  code: ReactNode
}

export type Step = Record<
  'kotlin',
  Array<{ quiz: string; params: Array<StepParams>; result: string }>
>

export const steps: Step = {
  kotlin: [
    {
      quiz:
        'class DeliveryEstimator(\n' +
        '    private val storeCalendar: StoreCalendar,\n' +
        '    private val pickingRules: PickingRules,\n' +
        '    private val clock: Clock\n' +
        ') {\n' +
        '    fun estimate(): LocalDate {\n',
      result: `class DeliveryEstimator(
    private val storeCalendar: StoreCalendar,
    private val pickingRules: PickingRules,
    private val clock: Clock
) {
    fun estimate(): LocalDate {
        val now = LocalDateTime.now(clock)
        val startDate = if (now.toLocalTime().isAfter(LocalTime.of(18, 0)))
            now.plusDays(1).toLocalDate() else now.toLocalDate()
        val pickingDuration = pickingRules.estimatePickingDuration()
        val readyTime = now.plus(pickingDuration)
        var deliveryDate = readyTime.toLocalDate()
        while (!storeCalendar.isWorking(deliveryDate)) {
            deliveryDate = deliveryDate.plusDays(1)
        }
        if (deliveryDate.isAfter(startDate.plusDays(3))) {
            throw BusinessException("NO_DELIVERY_SLOTS")
        }
        return deliveryDate
    }
}
`,
      params: [
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'val now = LocalDateTime.now(clock)',
              correct: true,
            },
            { id: 'B', value: 'B', text: 'val now = LocalDate.now(clock)' },
            { id: 'C', value: 'C', text: 'val now = LocalTime.now(clock)' },
          ],
          description: '1. Определяем текущее время оформления заказа',
          code: (
            <span className={styles.comment}>
              {' // TODO: реализовать бизнес-логику'}
            </span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'val startDate = LocalDate.now(clock).minusDays(1)',
            },
            { id: 'B', value: 'B', text: 'val startDate = now.toLocalDate()' },
            {
              id: 'C',
              value: 'C',
              text:
                'val startDate = if (now.toLocalTime().isAfter(LocalTime.of(18, 0)))\n' +
                '   now.plusDays(1).toLocalDate() else now.toLocalDate()',
              correct: true,
            },
          ],
          description: '2. Проверяем, оформлен ли заказ после cut-off',
          code: <span>{'        val now = LocalDateTime.now(clock)'}</span>,
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text:
                'val pickingDuration = pickingRules.estimatePickingDuration()\n' +
                '   val readyTime = now.plus(pickingDuration)',
              correct: true,
            },
            { id: 'B', value: 'B', text: 'val readyTime = now.plusHours(2)' },
            {
              id: 'C',
              value: 'C',
              text: 'val readyTime = now',
            },
          ],
          description: '3. Рассчитываем время сборки (до 2 часов)',
          code: (
            <span>
              {`        val now = LocalDateTime.now(clock)
        val startDate = if (now.toLocalTime().isAfter(LocalTime.of(18, 0)))
            now.plusDays(1).toLocalDate() else now.toLocalDate()
`}
            </span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'val deliveryDate = readyTime.toLocalDate()',
            },
            {
              id: 'B',
              value: 'B',
              text:
                'var deliveryDate = readyTime.toLocalDate()\n' +
                '   while (!storeCalendar.isWorking(deliveryDate))\n' +
                '       deliveryDate = deliveryDate.plusDays(1)\n',
              correct: true,
            },
            {
              id: 'C',
              value: 'C',
              text: 'val deliveryDate = readyTime.toLocalDate().minusDays(1)',
            },
          ],
          description:
            '4. Проверяем, не выпадает ли доставка на нерабочий день',
          code: (
            <span>{`        val now = LocalDateTime.now(clock)
        val startDate = if (now.toLocalTime().isAfter(LocalTime.of(18, 0)))
            now.plusDays(1).toLocalDate() else now.toLocalDate()
        val pickingDuration = pickingRules.estimatePickingDuration()
        val readyTime = now.plus(pickingDuration)
`}</span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text:
                'if (deliveryDate.isAfter(startDate.plusDays(3)))\n' +
                '       throw BusinessException("NO_DELIVERY_SLOTS")\n' +
                '   return deliveryDate\n',
              correct: true,
            },
            {
              id: 'B',
              value: 'B',
              text: 'return startDate.plusDays(7)',
            },
            {
              id: 'C',
              value: 'C',
              text: 'return LocalDate.MIN',
            },
          ],
          description: '5. Проверяем ограничение по слотам (3 дня вперёд)',
          code: (
            <span>{`        val now = LocalDateTime.now(clock)
        val startDate = if (now.toLocalTime().isAfter(LocalTime.of(18, 0)))
            now.plusDays(1).toLocalDate() else now.toLocalDate()
        val pickingDuration = pickingRules.estimatePickingDuration()
        val readyTime = now.plus(pickingDuration)
        var deliveryDate = readyTime.toLocalDate()
        while (!storeCalendar.isWorking(deliveryDate)) {
            deliveryDate = deliveryDate.plusDays(1)
        }
`}</span>
          ),
        },
      ],
    },
  ],
}
