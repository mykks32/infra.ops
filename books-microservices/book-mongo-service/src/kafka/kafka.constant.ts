const Topics = [
  'book_created',
  'book_viewed',
  'book_liked',
  'book_unliked',
  'book_deleted',
] as const;

export type KafkaTopicName = (typeof Topics)[number];

export const KafkaTopic: Record<KafkaTopicName, string> = Topics.reduce(
  (acc, topic) => {
    acc[topic] = `${process.env.NODE_ENV}_${topic}`;
    return acc;
  },
  {} as Record<KafkaTopicName, string>,
);

export const KAFKA_CLIENT = 'KAFKA_CLIENT' as const;
