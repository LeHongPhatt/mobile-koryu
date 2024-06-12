import {useNotify} from 'hooks';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_COLOR_DATA,
  GET_DATA_STACKING_PLAN,
  GET_IMAGES_STACKING_DETAIL,
  GET_LIST_BLOCK,
  GET_LIST_FLOOR,
  GET_LIST_PROJECT,
  GET_LIST_WING,
  GET_STACKING_DETAIL,
} from 'services/actionsStackingPlan';
import * as PlanActions from 'store/plans';
import {PlanSelector} from 'store/plans';
import {IPlanImageParams, IPlansParams} from 'types/plans';
import {DEFAULT_START} from 'utils/typo_constants';
import {DEFAULT_LIMIT} from './../utils/typo_constants';

export const usePlan = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {danger} = useNotify();

  const loading = useSelector(PlanSelector.getLoading);
  const planDetail = useSelector(PlanSelector.getPlanDetail);
  const imageList = useSelector(PlanSelector.getImageList);
  const listProject = useSelector(PlanSelector.getListProject);
  const listBlock = useSelector(PlanSelector.getListBlock);
  const listWing = useSelector(PlanSelector.getListWing);
  const listFloor = useSelector(PlanSelector.getListFloor);
  const colorData = useSelector(PlanSelector.getColorData);
  const stackingPlan = useSelector(PlanSelector.getStackingData);

  const onGetImageList = useCallback(
    (prms: IPlanImageParams) => {
      try {
        const params = {
          ...GET_IMAGES_STACKING_DETAIL,
          data: [Object.assign(GET_IMAGES_STACKING_DETAIL.data[0], prms)],
        };
        dispatch(PlanActions.getImagesDetailRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetPlanDetail = useCallback(
    (prms: IPlansParams) => {
      try {
        const params = {
          ...GET_STACKING_DETAIL,
          data: [Object.assign(GET_STACKING_DETAIL.data[0], prms)],
        };
        dispatch(
          PlanActions.getPlanDetailRequest(params, res => {
            if (res.success) {
              onGetImageList({
                project: prms?.project,
                pptgroup: res?.data[0]?.pptgroup,
                property: res?.data[0]?.property,
                start: DEFAULT_START,
                limit: DEFAULT_LIMIT,
              });
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

  const onGetProjectList = useCallback(
    (prms: IPlansParams) => {
      try {
        const params = {
          ...GET_LIST_PROJECT,
          data: [Object.assign(GET_LIST_PROJECT.data[0], prms)],
        };
        dispatch(PlanActions.getListProjectRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetBlockList = useCallback(
    (prms: IPlansParams) => {
      try {
        const params = {
          ...GET_LIST_BLOCK,
          data: [Object.assign(GET_LIST_BLOCK.data[0], prms)],
        };
        dispatch(PlanActions.getListBlockRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetListWing = useCallback(
    (prms: IPlansParams) => {
      try {
        const params = {
          ...GET_LIST_WING,
          data: [Object.assign(GET_LIST_WING.data[0], prms)],
        };
        dispatch(PlanActions.getListWingRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetListFloor = useCallback(
    (prms: IPlansParams) => {
      try {
        const params = {
          ...GET_LIST_FLOOR,
          data: [Object.assign(GET_LIST_FLOOR.data[0], prms)],
        };
        dispatch(PlanActions.getListFloorRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetColorData = useCallback(
    (prms: IPlansParams) => {
      try {
        const params = {
          ...GET_COLOR_DATA,
          data: [Object.assign(GET_COLOR_DATA.data[0], prms)],
        };
        dispatch(PlanActions.getColorDataRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetStackingData = useCallback(
    (prms: IPlansParams) => {
      try {
        const params = {
          ...GET_DATA_STACKING_PLAN,
          data: [Object.assign(GET_DATA_STACKING_PLAN.data[0], prms)],
        };
        dispatch(PlanActions.getDataStackingRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  return {
    loading,
    planDetail,
    imageList,
    listProject,
    listBlock,
    listFloor,
    listWing,
    colorData,
    stackingPlan,
    onGetPlanDetail,
    onGetProjectList,
    onGetBlockList,
    onGetListWing,
    onGetListFloor,
    onGetStackingData,
    onGetColorData,
    onGetImageList,
  };
};
