import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  ADD_ANSWER,
  DEL_ANSWER,
  GET_SURVEY_ANSWER,
  GET_SURVEY_LIST,
  GET_SURVEY_QUESTION,
} from 'services/actionsSurvey';
import * as SurveyActions from 'store/survey';
import {SurveySelectors} from 'store/survey';
import {IListSurveyParams, ISurveyItem} from 'types';
import {useNotify} from 'hooks';

export const useSurvey = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {danger, success} = useNotify();

  const loading = useSelector(SurveySelectors.getLoading);
  const listSurvey = useSelector(SurveySelectors.getListSurvey);
  const listQUESurvey = useSelector(SurveySelectors.getQuestionSurvey);
  const listANSSurvey = useSelector(SurveySelectors.getAnswerSurvey);

  const onGetListSurvey = useCallback(
    (param: IListSurveyParams) => {
      try {
        const params = {
          ...GET_SURVEY_LIST,
          data: [Object.assign(GET_SURVEY_LIST.data[0], param)],
        };
        dispatch(
          SurveyActions.listSurveyRequest(params, res => {
            if (res.success) {
              success(t('label.notify'), res.message);
            } else {
              danger(t('error'), res?.message);
            }
          }),
        );
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetQuestionSurvey = useCallback(
    (param: IListSurveyParams) => {
      try {
        const params = {
          ...GET_SURVEY_QUESTION,
          data: [Object.assign(GET_SURVEY_QUESTION.data[0], param)],
        };
        dispatch(
          SurveyActions.questionSurveyRequest(params, res => {
            if (res.success) {
              success(t('label.notify'), res.message);
            } else {
              danger(t('error'), res?.message);
            }
          }),
        );
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetAnswerSurvey = useCallback(
    (param: IListSurveyParams) => {
      try {
        const params = {
          ...GET_SURVEY_ANSWER,
          data: [Object.assign(GET_SURVEY_ANSWER.data[0], param)],
        };
        dispatch(
          SurveyActions.answerSurveyRequest(params, res => {
            if (res.success) {
              success(t('label.notify'), res.message);
            } else {
              danger(t('error'), res?.message);
            }
          }),
        );
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onDelAnswerSurvey = useCallback(
    (param: IListSurveyParams, callback: (t: boolean) => {}) => {
      try {
        const params = {
          ...DEL_ANSWER,
          data: [Object.assign(DEL_ANSWER.data[0], param)],
        };
        dispatch(
          SurveyActions.delAnswerSurveyRequest(params, () => callback(true)),
        );
      } catch (error) {
        callback(true);
      }
    },
    [dispatch],
  );

  const onSubmitAnswerSurvey = useCallback(
    (data: ISurveyItem[], callback: (t: boolean) => {}) => {
      try {
        const params = {...ADD_ANSWER, data};
        dispatch(
          SurveyActions.submitAnswerSurveyRequest(params, () => callback(true)),
        );
      } catch (error) {
        callback(true);
      }
    },
    [dispatch],
  );

  return {
    loading,
    listSurvey,
    listQUESurvey,
    listANSSurvey,
    onGetListSurvey,
    onGetQuestionSurvey,
    onGetAnswerSurvey,
    onDelAnswerSurvey,
    onSubmitAnswerSurvey,
  };
};
