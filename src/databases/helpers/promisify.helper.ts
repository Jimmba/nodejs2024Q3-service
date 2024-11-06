export const promisify = <T>(data: T): Promise<T> => {
  return new Promise((res) => res(data));
};
