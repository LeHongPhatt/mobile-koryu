import {useNotify} from 'hooks';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_ALL_MEMBER,
  GET_ATTACH_FILE,
  GET_CONTRACT_LIST,
  GET_GIFT_DISCOUNT,
  GET_PAYMENT_CONTRACT,
  GET_RESERVATION,
} from 'services/actionsContract';
import * as ContractActions from 'store/contract';
import {ContractSelector} from 'store/contract';
import {IContractParams, IPaymentParams} from 'types';

export const useContract = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {danger} = useNotify();

  const loading = useSelector(ContractSelector.getLoading);
  const contractList = useSelector(ContractSelector.getContract);
  const reservationList = useSelector(ContractSelector.getReservation);
  const payments = useSelector(ContractSelector.getPaymentContract);
  const paymentHistories = useSelector(ContractSelector.getPaymentHistories);
  const gitfs = useSelector(ContractSelector.getGiftDiscount);
  const attachedFile = useSelector(ContractSelector.getAttachedFile);
  const allMembers = useSelector(ContractSelector.getAllMember);

  const onGetContractList = useCallback(
    (contractP: IContractParams) => {
      try {
        const params = {
          ...GET_CONTRACT_LIST,
          data: [Object.assign(GET_CONTRACT_LIST.data[0], contractP)],
        };
        dispatch(ContractActions.getContractRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetReservation = useCallback(
    (contractP: IContractParams) => {
      try {
        const params = {
          ...GET_RESERVATION,
          data: [Object.assign(GET_RESERVATION.data[0], contractP)],
        };
        dispatch(ContractActions.getReservationRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetPayment = useCallback(
    (param: IPaymentParams) => {
      try {
        const params = {
          ...GET_PAYMENT_CONTRACT,
          data: [Object.assign(GET_PAYMENT_CONTRACT.data[0], param)],
        };
        dispatch(ContractActions.getPaymentContractRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetGiftDiscount = useCallback(
    (param: IPaymentParams) => {
      try {
        const params = {
          ...GET_GIFT_DISCOUNT,
          data: [param],
        };
        dispatch(ContractActions.getGiftDiscountRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetAttachFile = useCallback(
    (param: IPaymentParams) => {
      try {
        const params = {
          ...GET_ATTACH_FILE,
          data: [param],
        };
        dispatch(ContractActions.getAttachFileRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetAllMember = useCallback(
    (param: IPaymentParams) => {
      try {
        const params = {
          ...GET_ALL_MEMBER,
          data: [param],
        };
        dispatch(ContractActions.getAllMemberRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  return {
    loading,
    contractList,
    reservationList,
    payments,
    paymentHistories,
    gitfs,
    attachedFile,
    allMembers,
    onGetContractList,
    onGetReservation,
    onGetPayment,
    onGetGiftDiscount,
    onGetAttachFile,
    onGetAllMember,
  };
};
