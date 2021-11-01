import expressLoader from './express';

export default async ({ expressApp }): Promise<void> => {
  await expressLoader({ app: expressApp });
  console.log('Express Intialized');
};

// export default async ({ expressApp }): Promise<void> => {
//   return { init: ()=>{}};
//   await expressLoader({ app: expressApp });
//   console.log('Express Intialized');
// };
