import {useNotify} from 'hooks';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_DES_PROJECT,
  GET_GROUP_BDS,
  GET_GROUP_PROJECT,
  GET_IMAGE_PROJECT,
  GET_IMG_LIST,
  GET_STACKING_PLAN,
  GET_TIMELINE_PROJECT,
} from 'services/actionsProjects';
import * as ProjectActions from 'store/projectdetail';
import {ProjectDetailSelector} from 'store/projectdetail';
import {IImageParams, IParamStacking, IParamTimeline} from 'types';
import {IImageTimeLine} from './../types/projectDetail';

export const useProjectDetail = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {danger} = useNotify();

  const loading = useSelector(ProjectDetailSelector.getLoading);
  const imageList = useSelector(ProjectDetailSelector.getImageList);
  const detail = useSelector(ProjectDetailSelector.getDesProject);
  const group = useSelector(ProjectDetailSelector.getGroupProject);
  const groupBDS = useSelector(ProjectDetailSelector.getGroupBDS);
  const stackingPlan = useSelector(ProjectDetailSelector.getStackingPlan);
  const timeLine = useSelector(ProjectDetailSelector.getTimeLine);
  const timeLineImage = useSelector(ProjectDetailSelector.getTimeLineImage);

  const onGetImageList = useCallback(
    (prms: IImageParams) => {
      try {
        const params = {
          ...GET_IMAGE_PROJECT,
          data: [Object.assign(GET_IMAGE_PROJECT.data[0], prms)],
        };
        dispatch(ProjectActions.getImageListRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetDesProject = useCallback(
    (prms: IImageParams) => {
      try {
        const params = {
          ...GET_DES_PROJECT,
          data: [Object.assign(GET_DES_PROJECT.data[0], prms)],
        };
        dispatch(ProjectActions.getDesProjectRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetGroupProject = useCallback(
    (prms: IImageParams) => {
      try {
        const params = {
          ...GET_GROUP_PROJECT,
          data: [Object.assign(GET_GROUP_PROJECT.data[0], prms)],
        };
        dispatch(ProjectActions.getGroupProjectRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetGroupBDS = useCallback(
    (prms: IImageParams) => {
      try {
        const params = {
          ...GET_GROUP_BDS,
          data: [Object.assign(GET_GROUP_BDS.data[0], prms)],
        };
        dispatch(ProjectActions.getGroupBDSRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetStakingPlan = useCallback(
    (prms: IParamStacking) => {
      try {
        const params = {
          ...GET_STACKING_PLAN,
          data: [Object.assign(GET_STACKING_PLAN.data[0], prms)],
        };
        dispatch(ProjectActions.getStackingPlanRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetTimeLineProject = useCallback(
    (prms: IParamTimeline) => {
      try {
        const params = {
          ...GET_TIMELINE_PROJECT,
          data: [Object.assign(GET_TIMELINE_PROJECT.data[0], prms)],
        };
        dispatch(ProjectActions.getTimelineProjectRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetImageTimeLine = useCallback(
    (prms: IImageTimeLine) => {
      try {
        const params = {
          ...GET_IMG_LIST,
          data: [prms],
        };
        dispatch(ProjectActions.getImageTimeLineRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  return {
    loading,
    imageList,
    detail,
    group,
    groupBDS,
    stackingPlan,
    timeLine,
    timeLineImage,
    onGetImageList,
    onGetDesProject,
    onGetGroupProject,
    onGetGroupBDS,
    onGetStakingPlan,
    onGetTimeLineProject,
    onGetImageTimeLine,
  };
};
