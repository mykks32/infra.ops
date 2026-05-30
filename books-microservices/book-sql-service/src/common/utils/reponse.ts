import { ClassConstructor, plainToInstance } from 'class-transformer'

export function response<T>(cls: ClassConstructor<T>, plain: unknown): T {
  return plainToInstance(cls, plain, {
    strategy: 'excludeAll',
    exposeUnsetFields: false,
    excludeExtraneousValues: true,
  })
}
