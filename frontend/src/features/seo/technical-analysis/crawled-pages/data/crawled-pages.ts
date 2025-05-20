import { faker } from '@faker-js/faker'

export const crawledPages = Array.from({ length: 20 }, () => {
  return {
    id: faker.string.uuid(),
    pageUrl: faker.internet.url(),
    pageTitle: faker.lorem.sentence(5),
    metaDescription: faker.helpers.maybe(() => faker.lorem.sentence(10), { probability: 1 }),
    httpStatusCode: faker.helpers.arrayElement([200, 301, 302, 404, 500]),
    pageLoadTime: faker.number.int({ min: 500, max: 8000 }),
    structuredDataItems: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
      type: faker.helpers.arrayElement(['Product', 'Article', 'BreadcrumbList', 'WebPage', 'Organization']),
      properties: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        url: faker.internet.url(),
      }
    })),
    incomingInternalLinks: faker.number.int({ min: 0, max: 100 }),
    outgoingInternalLinks: faker.number.int({ min: 0, max: 50 }),
    outgoingExternalLinks: faker.number.int({ min: 0, max: 30 }),
    hreflangUsage: faker.helpers.maybe(() => Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => ({
      lang: faker.helpers.arrayElement(['en-us', 'fr', 'de', 'es', 'ja']),
      url: faker.internet.url(),
    })), { probability: 0.6 }),
    canonicalUrl: faker.helpers.maybe(() => faker.internet.url(), { probability: 0.8 }),
    lastCrawled: faker.date.recent({ days: 30 }),
  }
})

export default crawledPages
