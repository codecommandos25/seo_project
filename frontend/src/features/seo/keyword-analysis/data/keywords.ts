import { faker } from '@faker-js/faker'

export const keywords = Array.from({ length: 20 }, () => {
  const position = faker.number.int({ min: 1, max: 100 })
  return {
    id: faker.string.uuid(),
    keyword: faker.word.words({ count: { min: 1, max: 5 } }),
    intent: faker.helpers.arrayElement([
      'informational',
      'navigational',
      'commercial',
      'transactional',
    ] as const),
    position,
    prevPosition: faker.helpers.maybe(() => faker.number.int({ min: 1, max: 100 })),
    traffic: faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
    trafficPercentage: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
    volume: faker.number.int({ min: 10, max: 50000 }),
    keywordDifficulty: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
    cpc: faker.number.float({ min: 0.1, max: 50, fractionDigits: 2 }),
    url: faker.internet.url(),
    lastUpdate: faker.date.recent(),
  }
})

export default keywords
