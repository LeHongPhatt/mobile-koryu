import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {EnumYesNo} from './enum';

export const formatCurrentcy = (value: string) => {
  if (value) {
    return value?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

export const generateTotalRemain = (arr: any, type = 'payment') => {
  let total = 0;
  switch (type) {
    case 'payment': {
      arr.map((item: any) => (total = total + item?.remainamt));
      break;
    }
    case 'histories': {
      arr.map((item: any) => (total = total + item?.amount));
      break;
    }
  }
  return formatCurrentcy(total.toString());
};

export const generateTotalVale = (payment: any, paid: any) => {
  let totalPayment = 0;
  let totalPaid = 0;
  payment?.map((item: any) => (totalPayment = totalPayment + item?.remainamt));
  paid?.map((item: any) => (totalPaid = totalPaid + item?.amount));

  return formatCurrentcy((totalPayment + totalPaid).toString());
};

export const generateDateLate = (
  duedate: any,
  transaction_date = new Date(),
) => {
  let dateLate: any = 0;
  const date1: any = new Date(duedate);
  const date2: any = transaction_date;
  if (date1 < date2) {
    const diffTime = Math.abs(date1 - date2);
    dateLate = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  return dateLate;
};

export const getStoreByKey = async (k: string) => {
  try {
    let result = await AsyncStorage.getItem(k);
    return result;
  } catch (error) {}
};

export const setStoreByKey = async (k: string, val: any) => {
  try {
    let result = await AsyncStorage.setItem(k, `${JSON.stringify(val)}`);
    return result;
  } catch (error) {}
};

export const generateDataGroup = (data: any) => {
  return data?.reduce(function (r, a) {
    r[a.typename] = r[a.typename] || [];
    r[a.typename].push(a);
    return r;
  }, Object.create(null));
};

export const checkExistRole = (ops: string | any, index: number) => {
  if (!!index && ops) {
    return ops?.charAt(index) === EnumYesNo.Y;
  }
};

export const checkTimeEarlyHours = (time: string) => {
  const now = new Date();
  const TWO_HOUR = 2 * 60 * 60 * 1000;
  const expireTime = moment(time).valueOf();
  const nowEx = moment(now).valueOf();

  return expireTime - nowEx >= TWO_HOUR;
};

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const removeDuplicateByTwoKey = (arr: any, key1: string, key2: string) =>
  arr.filter(
    (v: any, i: number, a: any) =>
      a.findIndex((v2: any) => [key1, key2].every(k => v2[k] === v[k])) === i,
  );

export const getSizing = (size: number) => size;

export const getWidth = (width: number) => ({width});
