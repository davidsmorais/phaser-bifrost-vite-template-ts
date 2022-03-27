import bignumber from "bignumber.js";

export const formatNumber = (number: number, decimals?: number): string => {
  return new bignumber(number).toPrecision(decimals || 2);
};
