// import { Expose, Transform } from 'class-transformer';
// import { Types } from 'mongoose';
//
// export class BookAnalyticsSerializer {
//   @Expose()
//   @Transform(({ obj }) => {
//     const value = obj._id ?? obj.id;
//     if (typeof value === 'string') return value;
//     if (value instanceof Types.ObjectId) return value.toString();
//     return undefined;
//   })
//   id: string;
//
//   @Expose()
//   bookId: string;
//
//   @Expose()
//   views: number;
//
//   @Expose()
//   likes: number;
//
//   @Expose()
//   createdAt: Date;
//
//   @Expose()
//   updatedAt: Date;
// }
