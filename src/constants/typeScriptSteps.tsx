import styles from '../scss/quiz.module.scss'
import type { RecordStep } from './steps.tsx'

export const typeScriptSteps: RecordStep = [
  {
    userStory:
      'Как покупатель Лемана ПРО, я хочу узнать, в какой день мне смогут доставить заказ, чтобы понимать, когда я реально получу товары.',
    businessRules:
      'Магазин принимает заказы до 18:00 (cut-off).Если заказ оформлен позже — доставка возможна только на следующий день.\n' +
      'Сборка заказа занимает до 2 часов.\n' +
      'Магазин не работает в воскресенье.\n' +
      'Если предполагаемая дата доставки — нерабочий день, переносим на следующий рабочий день.\n' +
      'Слоты доставки доступны только на ближайшие 3 дня с момента готовности заказа.\n',
    number: 'TS-001',
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
        description: '4. Проверяем, не выпадает ли доставка на нерабочий день',
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
    userStory:
      'Как покупатель Лемана ПРО, я хочу, чтобы при оплате мой заказ автоматически учитывал скидку по карте лояльности, чтобы видеть итоговую сумму сразу в корзине.',
    businessRules:
      'Если карта клиента не указана — скидка не применяется.\n' +
      'Если карта указана — процент скидки получаем из сервиса лояльности.\n' +
      'Скидка не может быть больше 30%.\n' +
      'Итоговая сумма не должна стать меньше 0 рублей.\n' +
      'Итог округляется до двух знаков после запятой.\n',
    number: 'TS-002',
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
    userStory:
      'Как покупатель Лемана ПРО, я хочу увидеть ближайший магазин, где есть нужный мне товар в наличии, чтобы быстро понять, куда поехать за покупкой.',
    businessRules:
      'Найти все магазины, где товар есть в наличии.\n' +
      'Для каждого магазина рассчитать расстояние до пользователя.\n' +
      'Магазины без товара исключить.\n' +
      'При равном расстоянии выбрать магазин с большим остатком.\n' +
      'Если товар отсутствует во всех магазинах — вернуть null/undefined.\n',
    number: 'TS-003',
    quiz:
      "import { Injectable } from '@nestjs/common';\n" +
      '\n' +
      '@Injectable()\n' +
      'export class StoreFinderService {\n' +
      '  constructor(\n' +
      '    private readonly stock: StockService, \n' +
      '    private readonly geo: GeoService,     \n' +
      '  ) {}\n' +
      '\n' +
      '  findNearest(productId: string, user: Location): Store | null {\n',
    result:
      "import { Injectable } from '@nestjs/common';\n" +
      '\n' +
      '@Injectable()\n' +
      'export class StoreFinderService {\n' +
      '  constructor(\n' +
      '    private readonly stock: StockService,\n' +
      '    private readonly geo: GeoService,\n' +
      '  ) {}\n' +
      '\n' +
      '  findNearest(productId: string, user: Location): Store | null {\n' +
      '    const stores = this.stock.storesWithProduct(productId);\n' +
      '    if (!stores.length) return null;\n' +
      '\n' +
      '    const pairs = stores.map(store => ({ store, distance: this.geo.distance(user, store.location) }));\n' +
      '    const nearest = pairs.reduce((best, pair) => {\n' +
      '      if (!best) return pair;\n' +
      '      if (pair.distance < best.distance || (pair.distance === best.distance && pair.store.stock > best.store.stock)) return pair;\n' +
      '      return best;\n' +
      '     }, null as { store: Store; distance: number } | null);\n' +
      '    return nearest?.store ?? null;\n' +
      '  }\n' +
      '}\n',
    params: [
      {
        answers: [
          {
            id: 'A',
            value: 'A',
            text: 'const stores = this.stock.storesWithProduct(productId);',
            correct: true,
          },
          {
            id: 'B',
            value: 'B',
            text: 'const stores: Store[] = [];',
          },
          {
            id: 'C',
            value: 'C',
            text: 'const stores = [];',
          },
        ],
        description: '1. Получаем список всех магазинов с остатками',
        code: (
          <>
            <span className={styles.comment}>
              {'    // TODO: реализовать бизнес-логику'}
            </span>
            <span>{'    return null;'}</span>
          </>
        ),
      },
      {
        answers: [
          {
            id: 'A',
            value: 'A',
            text: 'if (!stores.length) return null;',
            correct: true,
          },
          {
            id: 'B',
            value: 'B',
            text: 'if (stores.length < 100) return null;',
          },
          {
            id: 'C',
            value: 'C',
            text: 'if (stores.length) return null;',
          },
        ],
        description: '2. Проверяем, что список не пуст',
        code: (
          <span>
            {'    const stores = this.stock.storesWithProduct(productId);'}
          </span>
        ),
      },
      {
        answers: [
          {
            id: 'A',
            value: 'A',
            text: 'const pairs = stores.map(store => ({ store, distance: Math.random() }));',
          },
          {
            id: 'B',
            value: 'B',
            text: 'const pairs = stores;',
          },

          {
            id: 'C',
            value: 'C',
            text: 'const pairs = stores.map(store => ({ store, distance: this.geo.distance(user, store.location) }));',
            correct: true,
          },
        ],
        description: '3. Считаем расстояние от пользователя',
        code: (
          <span>
            {'    const stores = this.stock.storesWithProduct(productId);\n' +
              '    if (!stores.length) return null;\n'}
          </span>
        ),
      },
      {
        answers: [
          {
            id: 'A',
            value: 'A',
            text: 'const nearest = pairs[0];',
          },
          {
            id: 'B',
            value: 'B',
            text:
              'const nearest = pairs.reduce((best, pair) => {\n' +
              '  if (!best) return pair;\n' +
              '  if (pair.distance < best.distance || (pair.distance === best.distance && pair.store.stock > best.store.stock)) return pair;\n' +
              '  return best;\n' +
              '}, null as { store: Store; distance: number } | null);\n',
            correct: true,
          },
          {
            id: 'C',
            value: 'C',
            text: 'const nearest = pairs[pairs.length - 1];',
          },
        ],
        description:
          '4. Выбираем ближайший магазин, при равенстве — с большим остатком',
        code: (
          <span>
            {'    const stores = this.stock.storesWithProduct(productId);\n' +
              '    if (!stores.length) return null;\n' +
              '\n' +
              '    const pairs = stores.map(store => ({ store, distance: this.geo.distance(user, store.location) }));\n'}
          </span>
        ),
      },
      {
        answers: [
          {
            id: 'A',
            value: 'A',
            text: 'return nearest?.store ?? null;',
            correct: true,
          },
          {
            id: 'B',
            value: 'B',
            text: 'return null;',
          },
          {
            id: 'C',
            value: 'C',
            text: "return { id: '', location: {lat:0,lng:0}, stock: 0 };",
          },
        ],
        description: '5. Возвращаем магазин',
        code: (
          <span>
            {'    const stores = this.stock.storesWithProduct(productId);\n' +
              '    if (!stores.length) return null;\n' +
              '\n' +
              '    const pairs = stores.map(store => ({ store, distance: this.geo.distance(user, store.location) }));\n' +
              '    const nearest = pairs.reduce((best, pair) => {\n' +
              '      if (!best) return pair;\n' +
              '      if (pair.distance < best.distance || (pair.distance === best.distance && pair.store.stock > best.store.stock)) return pair;\n' +
              '      return best;\n' +
              '     }, null as { store: Store; distance: number } | null);\n'}
          </span>
        ),
      },
    ],
  },
]
