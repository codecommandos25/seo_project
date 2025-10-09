import { faker } from '@faker-js/faker'
import { onPageAnalysis } from './schema'

// Assuming your schema is in a separate file

export const onPagesAnalysis: onPageAnalysis[] = Array.from(
  { length: 20 },
  () => {
    // Generate 1-5 keywords
    const keywords = Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      () => faker.word.sample()
    )

    // Generate 0-5 h2 tags
    const h2Tags = Array.from(
      { length: faker.number.int({ min: 0, max: 5 }) },
      () => faker.lorem.sentence(3)
    )

    return {
      id: faker.string.uuid(),
      url: faker.internet.url(),
      title: faker.lorem.sentence(5),
      description:
        faker.helpers.maybe(() => faker.lorem.sentence(10), {
          probability: 0.9,
        }) || null,
      imageCount: faker.number.int({ min: 0, max: 15 }),
      h1:
        faker.helpers.maybe(() => faker.lorem.sentence(4), {
          probability: 0.95,
        }) || null,
      h2Tags,
      contentLength: faker.number.int({ min: 200, max: 5000 }),
      internalLinks: faker.number.int({ min: 0, max: 30 }),
      externalLinks: faker.number.int({ min: 0, max: 20 }),
      keywords,
      hasCanonical: faker.datatype.boolean({ probability: 0.8 }),
      hasSchema: faker.datatype.boolean({ probability: 0.7 }),
    }
  }
)
