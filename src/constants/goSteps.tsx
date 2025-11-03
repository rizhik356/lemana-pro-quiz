import styles from '../scss/quiz.module.scss'
import type { RecordStep } from './steps.tsx'

export const goSteps: RecordStep = [
  {
    userStory:
      'Как покупатель Лемана ПРО, я хочу узнать, в какой день мне смогут доставить заказ, чтобы понимать, когда я реально получу товары.',
    businessRules:
      'Магазин принимает заказы до 18:00 (cut-off).Если заказ оформлен позже — доставка возможна только на следующий день.\n' +
      'Сборка заказа занимает до 2 часов.\n' +
      'Магазин не работает в воскресенье.\n' +
      'Если предполагаемая дата доставки — нерабочий день, переносим на следующий рабочий день.\n' +
      'Слоты доставки доступны только на ближайшие 3 дня с момента готовности заказа.\n',
    number: 'GO-001',
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
        description: '4. Проверяем, не выпадает ли доставка на нерабочий день',
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
    userStory:
      'Как покупатель Лемана ПРО, я хочу, чтобы при оплате мой заказ автоматически учитывал скидку по карте лояльности, чтобы видеть итоговую сумму сразу в корзине.',
    businessRules:
      'Если карта клиента не указана — скидка не применяется.\n' +
      'Если карта указана — процент скидки получаем из сервиса лояльности.\n' +
      'Скидка не может быть больше 30%.\n' +
      'Итоговая сумма не должна стать меньше 0 рублей.\n' +
      'Итог округляется до двух знаков после запятой.\n',
    number: 'GO-002',
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
    userStory:
      'Как покупатель Лемана ПРО, я хочу увидеть ближайший магазин, где есть нужный мне товар в наличии, чтобы быстро понять, куда поехать за покупкой.',
    businessRules:
      'Найти все магазины, где товар есть в наличии.\n' +
      'Для каждого магазина рассчитать расстояние до пользователя.\n' +
      'Магазины без товара исключить.\n' +
      'При равном расстоянии выбрать магазин с большим остатком.\n' +
      'Если товар отсутствует во всех магазинах — вернуть null/undefined.\n',
    number: 'GO-003',
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
]
