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
    {
      quiz:
        'class DiscountCalculator(\n' +
        '    private val loyaltyService: LoyaltyService\n' +
        ') {\n' +
        '    fun calculate(total: Double, cardNumber: String?): Double {\n' +
        '        // TODO: реализовать логику расчёта скидки\n' +
        '    }\n' +
        '}\n',
      result:
        'class DiscountCalculator(\n' +
        '    private val loyaltyService: LoyaltyService\n' +
        ') {\n' +
        '    fun calculate(total: Double, cardNumber: String?): Double {\n' +
        '        if (cardNumber == null) return total\n' +
        '        val discount = loyaltyService.getDiscount(cardNumber)\n' +
        '        val safeDiscount = min(discount, 0.3)\n' +
        '        val result = total * (1 - safeDiscount)\n' +
        '        return max(0.0, "%.2f".format(result).toDouble())\n' +
        '    }\n' +
        '}\n',
      params: [
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'if (total == 0.0) return 0.0',
            },
            {
              id: 'B',
              value: 'B',
              text: 'if (cardNumber == null) return total',
              correct: true,
            },
            {
              id: 'C',
              value: 'C',
              text: 'if (cardNumber != null) return total',
            },
          ],
          description: '1. Проверяем наличие карты',
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
              text: 'val discount = loyaltyService.getDiscount(cardNumber)',
              correct: true,
            },
            {
              id: 'B',
              value: 'B',
              text: 'val discount = 0.3',
            },
            {
              id: 'C',
              value: 'C',
              text: 'val discount = Random.nextDouble()',
            },
          ],
          description: '2. Получаем процент скидки',
          code: <span>{'        if (cardNumber == null) return total'}</span>,
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'val safeDiscount = discount',
            },
            {
              id: 'B',
              value: 'B',
              text: 'val safeDiscount = max(discount, 0.3)',
            },
            {
              id: 'C',
              value: 'C',
              text: 'val safeDiscount = min(discount, 0.3)',
              correct: true,
            },
          ],
          description: '3. Ограничиваем скидку максимум 30%',
          code: (
            <span>{`        if (cardNumber == null) return total
        val discount = loyaltyService.getDiscount(cardNumber)
`}</span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'val result = total * (1 - safeDiscount)',
              correct: true,
            },
            {
              id: 'B',
              value: 'B',
              text: 'val result = total - safeDiscount',
            },
            {
              id: 'C',
              value: 'C',
              text: 'val result = safeDiscount * 100',
            },
          ],
          description: '4. Применяем скидку к заказу',
          code: (
            <span>{`if (cardNumber == null) return total
        val discount = loyaltyService.getDiscount(cardNumber)
        val safeDiscount = min(discount, 0.3)
`}</span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'return result',
            },
            {
              id: 'B',
              value: 'B',
              text: 'return max(0.0, "%.2f".format(result).toDouble())',
              correct: true,
            },
            {
              id: 'C',
              value: 'C',
              text: 'return -abs(result)',
            },
          ],
          description: '5. Корректируем и округляем итог',
          code: (
            <span>{`        if (cardNumber == null) return total
        val discount = loyaltyService.getDiscount(cardNumber)
        val safeDiscount = min(discount, 0.3)
        val result = total * (1 - safeDiscount)
`}</span>
          ),
        },
      ],
    },
    {
      quiz: `class StoreFinder(
    private val stockService: StockService,
    private val geoService: GeoService
) {
    fun findNearest(productId: String, userLocation: Location): Store? {
`,
      result:
        'class StoreFinder(\n' +
        '    private val stockService: StockService,\n' +
        '    private val geoService: GeoService\n' +
        ') {\n' +
        '    fun findNearest(productId: String, userLocation: Location): Store? {\n' +
        '        val stores = stockService.storesWithProduct(productId)\n' +
        '        if (stores.isEmpty()) return null\n' +
        '        val storesWithDistance = stores.map { it to geoService.distance(userLocation, it.location) }\n' +
        '        val nearest = storesWithDistance.minWithOrNull(\n' +
        '            compareBy<Pair<Store, Double>> { it.second }.thenByDescending { it.first.stock }\n' +
        '        )\n' +
        '        return nearest?.first\n' +
        '    }\n' +
        '}\n',
      params: [
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'val stores = stockService.storesWithProduct(productId)',
              correct: true,
            },
            {
              id: 'B',
              value: 'B',
              text: 'val stores = emptyList<Store>()',
            },
            {
              id: 'C',
              value: 'C',
              text: 'val stores = geoService.allStores()',
            },
          ],
          description: '1. Получаем список всех магазинов с остатками',
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
              text: 'if (stores.isEmpty()) return null',
              correct: true,
            },
            {
              id: 'B',
              value: 'B',
              text: 'if (stores.size < 100) return null',
            },
            {
              id: 'C',
              value: 'C',
              text: 'if (stores.size > 0) return null',
            },
          ],
          description: '2. Проверяем, что список не пуст',
          code: (
            <span>
              {'        val stores = stockService.storesWithProduct(productId)'}
            </span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'val storesWithDistance = stores.map { it to Random.nextDouble() }',
            },
            {
              id: 'B',
              value: 'B',
              text: 'val storesWithDistance = stores',
            },
            {
              id: 'C',
              value: 'C',
              text: 'val storesWithDistance = stores.map { it to geoService.distance(userLocation, it.location) }',
              correct: true,
            },
          ],
          description: '3. Считаем расстояние от пользователя',
          code: (
            <span>
              {'        val stores = stockService.storesWithProduct(productId)\n' +
                '        if (stores.isEmpty()) return null\n'}
            </span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'val nearest = storesWithDistance.first()',
            },
            {
              id: 'B',
              value: 'B',
              text:
                'val nearest = storesWithDistance.minWithOrNull(\n' +
                '       compareBy<Pair<Store, Double>> { it.second }.thenByDescending { it.first.stock })\n',
              correct: true,
            },
            {
              id: 'C',
              value: 'C',
              text: 'val nearest = storesWithDistance.last()',
            },
          ],
          description:
            '4. Выбираем ближайший магазин, при равенстве — с большим остатком',
          code: (
            <span>
              {'        val stores = stockService.storesWithProduct(productId)\n' +
                '        if (stores.isEmpty()) return null\n' +
                '        val storesWithDistance = stores.map { it to geoService.distance(userLocation, it.location) }\n'}
            </span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'return nearest?.first',
              correct: true,
            },
            {
              id: 'B',
              value: 'B',
              text: 'return null',
            },
            {
              id: 'C',
              value: 'C',
              text: 'return Store()',
            },
          ],
          description: '5. Возвращаем магазин',
          code: (
            <span>
              {'        val stores = stockService.storesWithProduct(productId)\n' +
                '        if (stores.isEmpty()) return null\n' +
                '        val storesWithDistance = stores.map { it to geoService.distance(userLocation, it.location) }\n' +
                '        val nearest = storesWithDistance.minWithOrNull(\n' +
                '            compareBy<Pair<Store, Double>> { it.second }.thenByDescending { it.first.stock }\n' +
                '        )\n'}
            </span>
          ),
        },
      ],
    },
  ],
}
