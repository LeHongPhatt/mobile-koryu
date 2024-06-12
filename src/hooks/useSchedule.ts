import {NavigationService} from 'navigation';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ADD_SCHEDULE,
  DEL_SCHEDULE,
  FORM_SCHEDULE,
  GET_BOOK_TIME,
  GET_DETAIL,
  GET_SCHEDULE,
  GET_TYPE_CALENDAR,
  UPDATE_SCHEDULE,
  UPDATE_STATE_SCHEDULE,
} from 'services/actionsSchedule';
import * as ScheduleActions from 'store/schedule';
import {ScheduleSelectors} from 'store/schedule';
import {
  IBookTime,
  IformAddSchedule,
  IFormGetScheduleParams,
  IFormUpdateStateScheduleParams,
} from 'types';
import {EnumEmpConfirm} from 'utils/enum';
import {convertYMD} from 'utils/libs';

export const useSchedule = () => {
  const dispatch = useDispatch();
  const loading = useSelector(ScheduleSelectors.getLoading);
  const listSchedule = useSelector(ScheduleSelectors.getListSchedule);
  const oneSchedule = useSelector(ScheduleSelectors.getOneSchedule);
  const listTypeCalendar = useSelector(ScheduleSelectors.getListTypeCalendar);
  const bookingTimeList = useSelector(ScheduleSelectors.getBookingTimeList);

  const onGetBookingTime = useCallback(
    (formData: IBookTime) => {
      const params = {
        ...GET_BOOK_TIME,
        data: [formData],
      };
      return dispatch(ScheduleActions.getBookingTimeRequest(params));
    },
    [dispatch],
  );

  const onGetSchedule = useCallback(
    (formData: IFormGetScheduleParams) => {
      const params = {
        ...GET_SCHEDULE,
        data: [formData],
      };
      return dispatch(ScheduleActions.getScheduleRequest(params));
    },
    [dispatch],
  );

  const onGetOneSchedule = useCallback(
    (formData: IFormUpdateStateScheduleParams) => {
      const params = {
        ...GET_DETAIL,
        data: [formData],
      };
      return dispatch(ScheduleActions.getOneScheduleRequest(params));
    },
    [dispatch],
  );

  const onSubmitSchedule = useCallback(
    (formData: IformAddSchedule) => {
      formData.startdate = `${convertYMD(formData.date)} ${formData.startdate}`;
      formData.enddate = `${convertYMD(formData.date)} ${formData.enddate}`;
      const params = {
        ...ADD_SCHEDULE,
        data: [Object.assign(ADD_SCHEDULE.data[0], formData)],
      };
      return dispatch(
        ScheduleActions.addScheduleRequest(params, () => {
          onGetSchedule({
            ...FORM_SCHEDULE,
            customer: formData.prospect,
          });
          NavigationService.goBack();
        }),
      );
    },
    [dispatch],
  );

  const onUpdateSchedule = useCallback(
    (formData: IformAddSchedule) => {
      formData.startdate = `${convertYMD(formData.date)} ${formData.startdate}`;
      formData.enddate = `${convertYMD(formData.date)} ${formData.enddate}`;
      formData.empconfirm = EnumEmpConfirm.W;
      const params = {
        ...UPDATE_SCHEDULE,
        data: [Object.assign(UPDATE_SCHEDULE.data[0], formData)],
      };
      return dispatch(
        ScheduleActions.updateScheduleRequest(params, () => {
          onGetSchedule({
            ...FORM_SCHEDULE,
            customer: formData.prospect,
          });
          NavigationService.goBack();
        }),
      );
    },
    [dispatch],
  );

  const onUpdateStateSchedule = useCallback(
    (formData: IFormUpdateStateScheduleParams, callback: (r: any) => void) => {
      const params = {
        ...UPDATE_STATE_SCHEDULE,
        data: [formData],
      };
      return dispatch(
        ScheduleActions.updateStateScheduleRequest(params, res =>
          callback(res?.success),
        ),
      );
    },
    [dispatch],
  );

  const onDeleteSchedule = useCallback(
    (formData: IFormUpdateStateScheduleParams, callback?: (r: any) => void) => {
      const params = {
        ...DEL_SCHEDULE,
        data: [formData],
      };
      return dispatch(
        ScheduleActions.delScheduleRequest(params, () => {
          if (callback) {
            onGetSchedule({
              ...FORM_SCHEDULE,
              customer: `${formData.customer}`,
            });
            NavigationService.goBack();
          }
        }),
      );
    },
    [dispatch],
  );

  const onGetTypeCalendar = useCallback(() => {
    const params = {
      ...GET_TYPE_CALENDAR,
      // data: [formData],
    };
    return dispatch(ScheduleActions.getTypeCalendarRequest(params));
  }, [dispatch]);

  return {
    onGetSchedule,
    onGetOneSchedule,
    onUpdateStateSchedule,
    onDeleteSchedule,
    onGetTypeCalendar,
    onSubmitSchedule,
    onUpdateSchedule,
    onGetBookingTime,
    listTypeCalendar,
    loading,
    listSchedule,
    oneSchedule,
    bookingTimeList,
  };
};
