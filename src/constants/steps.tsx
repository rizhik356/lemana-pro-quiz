import type { Answer } from '../components/Kotlin.tsx'
import styles from '../scss/quiz.module.scss'
import type { ReactNode } from 'react'

export type StepParams = {
  answers: Answer[]
  description: string
  code: ReactNode
}

export type RecordStep = Array<{
  quiz: string
  params: Array<StepParams>
  result: string
}>

export type Step = Record<'kotlin' | 'go' | 'typescript', RecordStep>

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
            <span>{`        if (cardNumber == null) return total
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
              {'        // TODO: реализовать бизнес-логику'}
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
  go: [
    {
      quiz:
        'package delivery\n' +
        '\n' +
        'import "time"\n' +
        '\n' +
        'type Estimator struct {\n' +
        '    Calendar StoreCalendar  \n' +
        '    Rules    PickingRules\n' +
        '    Now      func() time.Time \n' +
        '}\n' +
        '\n' +
        'func (e *Estimator) Estimate() time.Time {\n',
      result:
        'package delivery\n' +
        '\n' +
        'import "time"\n' +
        '\n' +
        'type Estimator struct {\n' +
        '    Calendar StoreCalendar\n' +
        '    Rules    PickingRules\n' +
        '    Now      func() time.Time\n' +
        '}\n' +
        '\n' +
        'func (e *Estimator) Estimate() time.Time {\n' +
        '    now := e.Now()\n' +
        '    startDate := func() time.Time {\n' +
        '        cutoff := time.Date(now.Year(), now.Month(), now.Day(), 18, 0, 0, 0, now.Location())\n' +
        '        if now.After(cutoff){ return now.AddDate(0,0,1) }\n' +
        '        return now\n' +
        '    }().Truncate(24 * time.Hour)\n' +
        '    readyTime := now.Add(e.Rules.EstimatePickingDuration())\n' +
        '    deliveryDate := readyTime.Truncate(24 * time.Hour)\n' +
        '    for !e.Calendar.IsWorking(deliveryDate) { deliveryDate = deliveryDate.AddDate(0,0,1) }\n' +
        '    if deliveryDate.After(startDate.AddDate(0,0,3)) {\n' +
        '        panic("NO_DELIVERY_SLOTS")\n' +
        '    }\n' +
        '    return deliveryDate\n',
      params: [
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'now := e.Now()',
              correct: true,
            },
            { id: 'B', value: 'B', text: 'now := time.Now()' },
            { id: 'C', value: 'C', text: 'var now time.Time' },
          ],
          description: '1. Определяем текущее время оформления заказа',
          code: (
            <>
              <span className={styles.comment}>
                {'    // TODO: реализовать бизнес-логику'}
              </span>
              <span>{'    return time.Time{}'}</span>
            </>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'startDate := now.AddDate(0,0,-1)',
            },
            {
              id: 'B',
              value: 'B',
              text:
                'startDate := func() time.Time {\n' +
                '    cutoff := time.Date(now.Year(), now.Month(), now.Day(), 18, 0, 0, 0, now.Location())\n' +
                '    if now.After(cutoff) { return now.AddDate(0,0,1) }\n' +
                '    return now\n' +
                '    }().Truncate(24 * time.Hour)',
              correct: true,
            },
            { id: 'C', value: 'C', text: 'startDate := now' },
          ],
          description: '2. Проверяем, оформлен ли заказ после cut-off',
          code: <span>{'    now := e.Now()'}</span>,
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'readyTime := now.Add(e.Rules.EstimatePickingDuration())',
              correct: true,
            },
            {
              id: 'B',
              value: 'B',
              text: 'readyTime := now.Add(2 * time.Hour)',
            },
            {
              id: 'C',
              value: 'C',
              text: 'readyTime := now',
            },
          ],
          description: '3. Рассчитываем время сборки (до 2 часов)',
          code: (
            <span>
              {'    now := e.Now()\n' +
                '    startDate := func() time.Time {\n' +
                '        cutoff := time.Date(now.Year(), now.Month(), now.Day(), 18, 0, 0, 0, now.Location())\n' +
                '        if now.After(cutoff) { return now.AddDate(0,0,1) }\n' +
                '        return now\n' +
                '    }().Truncate(24 * time.Hour)'}
            </span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'deliveryDate := readyTime.AddDate(0,0,-1)',
            },
            {
              id: 'B',
              value: 'B',
              text:
                'deliveryDate := readyTime.Truncate(24 * time.Hour)\n' +
                'for !e.Calendar.IsWorking(deliveryDate) { deliveryDate = deliveryDate.AddDate(0,0,1) }\n',
              correct: true,
            },
            {
              id: 'C',
              value: 'C',
              text: 'deliveryDate := readyTime.Truncate(24 * time.Hour)',
            },
          ],
          description:
            '4. Проверяем, не выпадает ли доставка на нерабочий день',
          code: (
            <span>
              {'    now := e.Now()\n' +
                '    startDate := func() time.Time {\n' +
                '        cutoff := time.Date(now.Year(), now.Month(), now.Day(), 18, 0, 0, 0, now.Location())\n' +
                '        if now.After(cutoff) { return now.AddDate(0,0,1) }\n' +
                '        return now\n ' +
                '    }().Truncate(24 * time.Hour)\n' +
                '    readyTime := now.Add(e.Rules.EstimatePickingDuration())'}
            </span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text:
                'if deliveryDate.After(startDate.AddDate(0,0,3)) { panic("NO_DELIVERY_SLOTS") }\n' +
                'return deliveryDate\n',
              correct: true,
            },
            {
              id: 'B',
              value: 'B',
              text: 'return startDate.AddDate(0,0,7)',
            },
            {
              id: 'C',
              value: 'C',
              text: 'return time.Time{}',
            },
          ],
          description: '5. Проверяем ограничение по слотам (3 дня вперёд)',
          code: (
            <span>
              {'    now := e.Now()\n' +
                '    startDate := func() time.Time {\n' +
                '        cutoff := time.Date(now.Year(), now.Month(), now.Day(), 18, 0, 0, 0, now.Location())\n' +
                '        if now.After(cutoff){ return now.AddDate(0,0,1) }\n' +
                '        return now\n' +
                '    }().Truncate(24 * time.Hour)' +
                '    readyTime := now.Add(e.Rules.EstimatePickingDuration())' +
                '    deliveryDate := readyTime.Truncate(24 * time.Hour)\n' +
                '    for !e.Calendar.IsWorking(deliveryDate) { deliveryDate = deliveryDate.AddDate(0,0,1) }\n'}
            </span>
          ),
        },
      ],
    },
    {
      quiz:
        'package discount\n' +
        '\n' +
        'type Calculator struct {\n' +
        '    Loyalty LoyaltyService \n' +
        '}\n' +
        '\n' +
        'func (c *Calculator) Calculate(total float64, cardNumber *string) float64 {\n',
      result:
        'package discount\n' +
        '\n' +
        'import "math"\n' +
        '\n' +
        'type Calculator struct {\n' +
        '    Loyalty LoyaltyService\n' +
        '}\n' +
        '\n' +
        'func (c *Calculator) Calculate(total float64, cardNumber *string) float64 {\n' +
        '    if cardNumber == nil {\n' +
        '        return total\n' +
        '    }\n' +
        '    d := c.Loyalty.GetDiscount(*cardNumber)\n' +
        '    if d > 0.3 {\n' +
        '        d = 0.3\n' +
        '    }\n' +
        '    result := total * (1 - d)\n' +
        '    if result < 0 {\n' +
        '        result = 0\n' +
        '    }\n' +
        '    return math.Round(result*100) / 100\n' +
        '}\n',
      params: [
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'if total == 0 { return 0 }',
            },
            {
              id: 'B',
              value: 'B',
              text: 'if cardNumber == nil { return total }',
              correct: true,
            },
            {
              id: 'C',
              value: 'C',
              text: 'if cardNumber != nil { return total }',
            },
          ],
          description: '1. Проверяем наличие карты',
          code: (
            <>
              <span className={styles.comment}>
                {'    // TODO: реализовать бизнес-логику\n'}
              </span>
              <span>{'    return 0\n'}</span>
            </>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'd := c.Loyalty.GetDiscount(*cardNumber)',
              correct: true,
            },
            {
              id: 'B',
              value: 'B',
              text: 'd := 0.3',
            },
            {
              id: 'C',
              value: 'C',
              text: 'd := 1.0 - total',
            },
          ],
          description: '2. Получаем процент скидки',
          code: (
            <span>
              {'    if cardNumber == nil {\n' +
                '        return total\n' +
                '    }\n'}
            </span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'if d < 0.3 { d = 0.3 }',
            },
            {
              id: 'B',
              value: 'B',
              text: 'if d > 0.3 { d = 0.3 }',
              correct: true,
            },
            {
              id: 'C',
              value: 'C',
              text: 'if d == 0.3 { d = 0.3 }',
            },
          ],
          description: '3. Ограничиваем скидку максимум 30%',
          code: (
            <span>{`    if cardNumber == nil {
        return total
    }
    d := c.Loyalty.GetDiscount(*cardNumber)
`}</span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'result := total * (1 - d)',
              correct: true,
            },
            {
              id: 'B',
              value: 'B',
              text: 'result := total - d',
            },
            {
              id: 'C',
              value: 'C',
              text: 'result := d * 100',
            },
          ],
          description: '4. Применяем скидку к заказу',
          code: (
            <span>{`    if cardNumber == nil {
        return total
    }
    d := c.Loyalty.GetDiscount(*cardNumber)
    if d > 0.3 {
        d = 0.3
    }
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
              text: 'return -result',
            },
            {
              id: 'C',
              value: 'C',
              text: 'if result < 0 { result = 0 }; return math.Round(result*100)/100',
              correct: true,
            },
          ],
          description: '5. Корректируем и округляем итог',
          code: (
            <span>
              {'    if cardNumber == nil {\n' +
                '        return total\n' +
                '    }\n' +
                '    d := c.Loyalty.GetDiscount(*cardNumber)\n' +
                '    if d > 0.3 {\n' +
                '        d = 0.3\n' +
                '    }\n' +
                '    result := total * (1 - d)\n'}
            </span>
          ),
        },
      ],
    },
    {
      quiz:
        'package storefinder\n' +
        '\n' +
        'type Finder struct{\n' +
        '    Stock StockService \n' +
        '    Geo   GeoService   \n' +
        '}\n' +
        '\n' +
        'func (f *Finder) FindNearest(productId string, user Location) *Store {\n',
      result:
        'package storefinder\n' +
        '\n' +
        'type Finder struct{\n' +
        '    Stock StockService\n' +
        '    Geo   GeoService\n' +
        '}\n' +
        '\n' +
        'func (f *Finder) FindNearest(productId string, user Location) *Store {\n' +
        '    stores := f.Stock.StoresWithProduct(productId)\n' +
        '    if len(stores) == 0 {\n' +
        '        return nil\n' +
        '    }\n' +
        '    type pair struct{ Store Store; Distance float64 }\n' +
        '    pairs := make([]pair, 0, len(stores))\n' +
        '    for _, s := range stores {\n' +
        '        pairs = append(pairs, pair{Store: s, Distance: f.Geo.Distance(user, s.Location)})\n' +
        '    }\n' +
        '    best := pairs[0]\n' +
        '    for _, p := range pairs[1:] {\n' +
        '    if p.Distance < best.Distance || (p.Distance == best.Distance && p.Store.Stock > best.Store.Stock) {\n' +
        '            best = p\n' +
        '        }\n' +
        '    }\n' +
        '    s := best.Store\n' +
        '    return &s\n' +
        '}\n',
      params: [
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'stores := f.Stock.StoresWithProduct(productId)',
              correct: true,
            },
            {
              id: 'B',
              value: 'B',
              text: 'stores := []Store{}',
            },
            {
              id: 'C',
              value: 'C',
              text: 'stores := nil',
            },
          ],
          description: '1. Получаем список всех магазинов с остатками',
          code: (
            <>
              <span className={styles.comment}>
                {'    // TODO: реализовать бизнес-логику\n'}
              </span>
              <span>{'    return nil\n'}</span>
            </>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'if len(stores) < 100 { return nil }',
            },
            {
              id: 'B',
              value: 'B',
              text: 'if len(stores) == 0 { return nil }',
              correct: true,
            },
            {
              id: 'C',
              value: 'C',
              text: 'if len(stores) > 0 { return nil }',
            },
          ],
          description: '2. Проверяем, что список не пуст',
          code: (
            <span>{'    stores := f.Stock.StoresWithProduct(productId)'}</span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'pairs := stores',
            },
            {
              id: 'B',
              value: 'B',
              text: 'pairs := []pair{}',
            },
            {
              id: 'C',
              value: 'C',
              text:
                'type pair struct{ Store Store; Distance float64 }\n' +
                'pairs := make([]pair, 0, len(stores))\n' +
                'for _, s := range stores { pairs = append(pairs, pair{Store:s, Distance:f.Geo.Distance(user, s.Location)}) }\n',
              correct: true,
            },
          ],
          description: '3. Считаем расстояние от пользователя',
          code: (
            <span>
              {'    stores := f.Stock.StoresWithProduct(productId)\n' +
                '    if len(stores) == 0 {\n' +
                '        return nil\n' +
                '    }\n'}
            </span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text:
                'best := pairs[0]\n' +
                'for _, p := range pairs[1:] {\n' +
                '    if p.Distance < best.Distance || (p.Distance == best.Distance && p.Store.Stock > best.Store.Stock) { best = p }\n' +
                '}\n',
              correct: true,
            },
            {
              id: 'B',
              value: 'B',
              text: 'best := pairs[len(pairs)-1]',
            },
            {
              id: 'C',
              value: 'C',
              text: 'best := pairs[0]',
            },
          ],
          description:
            '4. Выбираем ближайший магазин, при равенстве — с большим остатком',
          code: (
            <span>
              {'    stores := f.Stock.StoresWithProduct(productId)\n' +
                '    if len(stores) == 0 {\n' +
                '        return nil\n' +
                '    }\n' +
                '    type pair struct{ Store Store; Distance float64 }\n' +
                '    pairs := make([]pair, 0, len(stores))\n' +
                '    for _, s := range stores {\n' +
                '        pairs = append(pairs, pair{Store: s, Distance: f.Geo.Distance(user, s.Location)})\n' +
                '    }\n'}
            </span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'return nil',
            },
            {
              id: 'B',
              value: 'B',
              text: 's := best.Store; return &s',
              correct: true,
            },
            {
              id: 'C',
              value: 'C',
              text: 'var s Store; return &s',
            },
          ],
          description: '5. Возвращаем магазин',
          code: (
            <span>
              {'    stores := f.Stock.StoresWithProduct(productId)\n' +
                '    if len(stores) == 0 {\n' +
                '        return nil\n' +
                '    }\n' +
                '    type pair struct{ Store Store; Distance float64 }\n' +
                '    pairs := make([]pair, 0, len(stores))\n' +
                '    for _, s := range stores {\n' +
                '        pairs = append(pairs, pair{Store: s, Distance: f.Geo.Distance(user, s.Location)})\n' +
                '    }\n' +
                '    best := pairs[0]\n' +
                '    for _, p := range pairs[1:] {\n' +
                '    if p.Distance < best.Distance || (p.Distance == best.Distance && p.Store.Stock > best.Store.Stock) {\n' +
                '            best = p\n' +
                '        }\n' +
                '    }\n'}
            </span>
          ),
        },
      ],
    },
  ],
  typescript: [
    {
      quiz:
        "import { Injectable } from '@nestjs/common';\n" +
        '\n' +
        '@Injectable()\n' +
        'export class DeliveryEstimatorService {\n' +
        '  constructor(\n' +
        '    private readonly calendar: StoreCalendar, \n' +
        '    private readonly rules: PickingRules,      \n' +
        '    private readonly clock: Clock,             \n' +
        '  ) {}\n' +
        '\n' +
        '  estimate(): Date {\n',
      result:
        "import { Injectable } from '@nestjs/common';\n" +
        '\n' +
        '@Injectable()\n' +
        'export class DeliveryEstimatorService {\n' +
        '  constructor(\n' +
        '    private readonly calendar: StoreCalendar,\n' +
        '    private readonly rules: PickingRules,\n' +
        '    private readonly clock: Clock,\n' +
        '  ) {}\n' +
        '\n' +
        '  estimate(): Date {\n' +
        '    const now = this.clock.now();\n' +
        '\n' +
        '    const cutoff = new Date(now); cutoff.setHours(18,0,0,0);\n' +
        '    const startDate = now > cutoff\n' +
        '      ? new Date(now.getFullYear(), now.getMonth(), now.getDate()+1)\n' +
        '      : new Date(now.getFullYear(), now.getMonth(), now.getDate());\n' +
        '\n' +
        '    const readyTime = new Date(now.getTime() + this.rules.estimatePickingDuration());\n' +
        '\n' +
        '    let deliveryDate = new Date(readyTime.getFullYear(), readyTime.getMonth(), readyTime.getDate());\n' +
        '    while (!this.calendar.isWorking(deliveryDate)) {\n' +
        '      deliveryDate = new Date(deliveryDate.getFullYear(), deliveryDate.getMonth(), deliveryDate.getDate()+1);\n' +
        '    }\n' +
        '\n' +
        '    const limit = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+3);\n' +
        '    if (deliveryDate.getTime() > limit.getTime()) {\n' +
        "      throw new Error('NO_DELIVERY_SLOTS');\n" +
        '    }\n' +
        '\n' +
        '    return deliveryDate;\n' +
        '  }\n' +
        '}\n',
      params: [
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'const now = this.clock.now();',
              correct: true,
            },
            { id: 'B', value: 'B', text: 'const now = new Date(0);' },
            { id: 'C', value: 'C', text: 'const now = new Date();' },
          ],
          description: '1. Определяем текущее время оформления заказа',
          code: (
            <>
              <span className={styles.comment}>
                {'    // TODO: реализовать бизнес-логику'}
              </span>
              <span>{'    return new Date(0);'}</span>
            </>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text:
                'const startDate = (() => {\n' +
                '  const cutoff = new Date(now); cutoff.setHours(18,0,0,0);\n' +
                '  return now > cutoff ? new Date(now.getFullYear(), now.getMonth(), now.getDate()+1) \n' +
                '                      : new Date(now.getFullYear(), now.getMonth(), now.getDate());\n' +
                '})();\n',
              correct: true,
            },
            { id: 'B', value: 'B', text: 'const startDate = now;' },
            {
              id: 'C',
              value: 'C',
              text: 'const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()-1);',
            },
          ],
          description: '2. Проверяем, оформлен ли заказ после cut-off',
          code: (
            <span>
              {'    const now = this.clock.now();\n' +
                '\n' +
                '    const cutoff = new Date(now); cutoff.setHours(18,0,0,0);\n'}
            </span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'const readyTime = new Date(now.getTime() + 2*60*60*1000);',
            },
            {
              id: 'B',
              value: 'B',
              text: 'const readyTime = new Date(this.clock.now().getTime() + this.rules.estimatePickingDuration());',
              correct: true,
            },
            {
              id: 'C',
              value: 'C',
              text: 'const readyTime = now;',
            },
          ],
          description: '3. Рассчитываем время сборки (до 2 часов)',
          code: (
            <span>
              {'    const now = this.clock.now();\n' +
                '\n' +
                '    const cutoff = new Date(now); cutoff.setHours(18,0,0,0);\n' +
                '    const startDate = now > cutoff\n' +
                '      ? new Date(now.getFullYear(), now.getMonth(), now.getDate()+1)\n' +
                '      : new Date(now.getFullYear(), now.getMonth(), now.getDate());\n'}
            </span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text:
                'let deliveryDate = new Date(readyTime.getFullYear(), readyTime.getMonth(), readyTime.getDate());\n' +
                'while(!this.calendar.isWorking(deliveryDate)) {\n' +
                '  deliveryDate = new Date(deliveryDate.getFullYear(), deliveryDate.getMonth(), deliveryDate.getDate()+1);\n' +
                '};\n',
              correct: true,
            },
            {
              id: 'B',
              value: 'B',
              text: 'const deliveryDate = readyTime;',
            },
            {
              id: 'C',
              value: 'C',
              text: 'const deliveryDate = new Date(readyTime.getFullYear(), readyTime.getMonth(), readyTime.getDate()-1);',
            },
          ],
          description:
            '4. Проверяем, не выпадает ли доставка на нерабочий день',
          code: (
            <span>
              {'    const now = this.clock.now();\n' +
                '\n' +
                '    const cutoff = new Date(now); cutoff.setHours(18,0,0,0);\n' +
                '    const startDate = now > cutoff\n' +
                '      ? new Date(now.getFullYear(), now.getMonth(), now.getDate()+1)\n' +
                '      : new Date(now.getFullYear(), now.getMonth(), now.getDate());\n' +
                '\n' +
                '    const readyTime = new Date(now.getTime() + this.rules.estimatePickingDuration());\n'}
            </span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+7);',
            },
            {
              id: 'B',
              value: 'B',
              text: 'return new Date(0);',
            },
            {
              id: 'C',
              value: 'C',
              text:
                'if (deliveryDate.getTime() > new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+3).getTime()) {\n' +
                "  throw new Error('NO_DELIVERY_SLOTS');\n" +
                '}\n' +
                'return deliveryDate;\n',
              correct: true,
            },
          ],
          description: '5. Проверяем ограничение по слотам (3 дня вперёд)',
          code: (
            <span>
              {'    const now = this.clock.now();\n' +
                '\n' +
                '    const cutoff = new Date(now); cutoff.setHours(18,0,0,0);\n' +
                '    const startDate = now > cutoff\n' +
                '      ? new Date(now.getFullYear(), now.getMonth(), now.getDate()+1)\n' +
                '      : new Date(now.getFullYear(), now.getMonth(), now.getDate());\n' +
                '\n' +
                '    const readyTime = new Date(now.getTime() + this.rules.estimatePickingDuration());\n' +
                '\n' +
                '    let deliveryDate = new Date(readyTime.getFullYear(), readyTime.getMonth(), readyTime.getDate());\n' +
                '    while (!this.calendar.isWorking(deliveryDate)) {\n' +
                '      deliveryDate = new Date(deliveryDate.getFullYear(), deliveryDate.getMonth(), deliveryDate.getDate()+1);\n' +
                '    }\n' +
                '\n' +
                '    const limit = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+3);\n'}
            </span>
          ),
        },
      ],
    },
    {
      quiz:
        "import { Injectable } from '@nestjs/common';\n" +
        '\n' +
        '@Injectable()\n' +
        'export class DiscountCalculatorService {\n' +
        '  constructor(private readonly loyalty: LoyaltyService) {} \n' +
        '\n' +
        '  calculate(total: number, cardNumber?: string): number {\n',
      result:
        "import { Injectable } from '@nestjs/common';\n" +
        '\n' +
        '@Injectable()\n' +
        'export class DiscountCalculatorService {\n' +
        '  constructor(private readonly loyalty: LoyaltyService) {}\n' +
        '\n' +
        '  calculate(total: number, cardNumber?: string): number {\n' +
        '    if (!cardNumber) return total;\n' +
        '\n' +
        '    const discount = this.loyalty.getDiscount(cardNumber);\n' +
        '    const safe = Math.min(discount, 0.3);\n' +
        '    const result = total * (1 - safe);\n' +
        '\n' +
        '    return Math.max(0, Math.round(result * 100) / 100);\n' +
        '  }\n' +
        '}\n',
      params: [
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'if (total === 0) return 0;',
            },
            {
              id: 'B',
              value: 'B',
              text: 'if (!cardNumber) return total;',
              correct: true,
            },
            {
              id: 'C',
              value: 'C',
              text: 'if (cardNumber) return total;',
            },
          ],
          description: '1. Проверяем наличие карты',
          code: (
            <>
              <span className={styles.comment}>
                {'    // TODO: реализовать бизнес-логику'}
              </span>
              <span>{'    return 0;'}</span>
            </>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'const discount = this.loyalty.getDiscount(cardNumber);',
              correct: true,
            },
            {
              id: 'B',
              value: 'B',
              text: 'const discount = 0.3;',
            },
            {
              id: 'C',
              value: 'C',
              text: 'const discount = Math.random();',
            },
          ],
          description: '2. Получаем процент скидки',
          code: <span>{'    if (!cardNumber) return total;'}</span>,
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'const safe = Math.max(discount, 0.3);',
            },
            {
              id: 'B',
              value: 'B',
              text: 'const safe = discount;',
            },
            {
              id: 'C',
              value: 'C',
              text: 'const safe = Math.min(discount, 0.3);',
              correct: true,
            },
          ],
          description: '3. Ограничиваем скидку максимум 30%',
          code: (
            <span>
              {'    if (!cardNumber) return total;\n' +
                '\n' +
                '    const discount = this.loyalty.getDiscount(cardNumber);\n'}
            </span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'const result = total - safe;',
            },
            {
              id: 'B',
              value: 'B',
              text: 'const result = total * (1 - safe);',
              correct: true,
            },
            {
              id: 'C',
              value: 'C',
              text: 'const result = safe * 100;',
            },
          ],
          description: '4. Применяем скидку к заказу',
          code: (
            <span>
              {'    if (!cardNumber) return total;\n' +
                '\n' +
                '    const discount = this.loyalty.getDiscount(cardNumber);\n' +
                '    const safe = Math.min(discount, 0.3);\n'}
            </span>
          ),
        },
        {
          answers: [
            {
              id: 'A',
              value: 'A',
              text: 'return result;',
            },
            {
              id: 'B',
              value: 'B',
              text: 'return Math.max(0, Math.round(result * 100) / 100);',
              correct: true,
            },
            {
              id: 'C',
              value: 'C',
              text: 'return -Math.abs(result);',
            },
          ],
          description: '5. Корректируем и округляем итог',
          code: (
            <span>
              {'    if (!cardNumber) return total;\n' +
                '\n' +
                '    const discount = this.loyalty.getDiscount(cardNumber);\n' +
                '    const safe = Math.min(discount, 0.3);\n' +
                '    const result = total * (1 - safe);\n'}
            </span>
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
              {'        // TODO: реализовать бизнес-логику'}
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
