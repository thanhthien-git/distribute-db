export function getDbByClass<T>(mslop: string, repoL1: T, repoL2: T): T {
  if (mslop === 'L1') return repoL1;
  if (mslop === 'L2') return repoL2;
  throw new Error('Mã lớp không hợp lệ');
}