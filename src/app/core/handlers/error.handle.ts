// export async function handleError<T>(fn: () => Promise<T>) : Promise<[Error | undefined, T | any]> {
//   try {
//     const value = await fn();
//     return [undefined, value];
//   }
//   catch (e)
//   {
//     return [e instanceof Error ? e : new Error("Something went wrong"), undefined];
//   }
// }

export async function handleError<T>(fn: () => Promise<T>, defaultValue: T): Promise<[Error | undefined, T]> {
  try {
    const value = await fn();
    return [undefined, value];
  } catch (e) {
    return [e instanceof Error ? e : new Error("Something went wrong"), defaultValue];
  }
}
