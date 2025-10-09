import { faker } from '@faker-js/faker'

export const backlinks = Array.from({ length: 20 }, () => {
  const linkTypes = ['follow', 'nofollow', 'sponsored', 'ugc']
  const externalLinks = faker.number.int({ min: 5, max: 200 })
  const internalLinks = faker.number.int({ min: 1, max: 100 })
  const firstSeen = faker.date.past()

  return {
    id: faker.string.uuid(),
    sourcePageTitle: faker.lorem.sentence(
      faker.number.int({ min: 3, max: 10 })
    ),
    sourceUrl: faker.internet.url(),
    targetUrl: faker.internet.url(),
    anchorText: faker.lorem.words(faker.number.int({ min: 1, max: 5 })),
    externalLinks,
    internalLinks,
    linkType: faker.helpers.arrayElement(linkTypes),
    domainAuthority: faker.number.float({
      min: 0,
      max: 100,
      fractionDigits: 1,
    }),
    pageAuthority: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
    firstSeen,
    lastSeen: faker.date.between({ from: firstSeen, to: new Date() }),
    statusCode: faker.helpers.maybe(() =>
      faker.helpers.arrayElement([200, 301, 302, 404, 500])
    ),
    isLive: faker.helpers.maybe(() => faker.datatype.boolean(), {
      probability: 0.8,
    }),
  }
})

export default backlinks
