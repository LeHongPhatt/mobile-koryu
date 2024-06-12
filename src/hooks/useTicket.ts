import {useNotify} from 'hooks';
import {NavigationService, Routes} from 'navigation';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import RNFS from 'react-native-fs';
import {useDispatch, useSelector} from 'react-redux';
import {
  ADD_COMMENT,
  ADD_LINK_ATTACHMENT,
  ADD_LINK_BY_URL,
  ATTACH_FILE,
  CANCEL_SUPPORT_TICKET,
  CLOSE_SUPPORT_TICKET,
  CREATE_SUPPORT_TICKET,
  DEL_ATTACH_FILE,
  DEL_COMMENT,
  GET_ATTACH_FILE,
  GET_CAT_DETAIL,
  GET_DATA_COMBO,
  GET_DATA_GROUP,
  GET_DATA_TYPE,
  GET_HISTORY_TICKET,
  GET_LIST_SUPPORT_TICKET,
} from 'services/actionsSupportTicket';
import * as TicketActions from 'store/ticket';
import {TicketSelectors} from 'store/ticket';
import {
  IDataSuportItem,
  IFileParams,
  IFormSupportTicker,
  IParamsAddLink,
  ITicketParams,
} from 'types';
import {EnumTicketStatus, EnumYesNo} from 'utils/enum';
import {sleep} from 'utils/functions';
import {getFileExtension} from 'utils/libs';
import {useAuth} from './useAuth';

export const useTicket = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {danger, success} = useNotify();
  const {user} = useAuth();

  const loading = useSelector(TicketSelectors.getLoading);
  const isOpen = useSelector(TicketSelectors.toggleModaleComment);
  const loadingComment = useSelector(TicketSelectors.getLoadingComment);

  const listDataType = useSelector(TicketSelectors.getDataTypeList);
  const listDataGroup = useSelector(TicketSelectors.getDataGroupList);
  const listCatDetail = useSelector(TicketSelectors.getCatDetailList);
  const listDataCom = useSelector(TicketSelectors.getDataComList);
  const supportList = useSelector(TicketSelectors.getSupportTicketList);
  const selectedTicket = useSelector(TicketSelectors.selectedItem);
  const attachFile = useSelector(TicketSelectors.getAttachFile);
  const histories = useSelector(TicketSelectors.getHistoryTicket);

  const onGetDataType = useCallback(() => {
    try {
      const params = {
        ...GET_DATA_TYPE,
        data: [Object.assign(GET_DATA_TYPE.data[0])],
      };
      dispatch(
        TicketActions.listDataType(params, res => {
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
  }, [dispatch, danger, t]);

  const onGetDataGroup = useCallback(
    (param: ITicketParams) => {
      try {
        const params = {
          ...GET_DATA_GROUP,
          data: [Object.assign(GET_DATA_GROUP.data[0], param)],
        };
        dispatch(
          TicketActions.listDataGroup(params, res => {
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

  const onGetCatDetail = useCallback(
    (param: ITicketParams) => {
      try {
        const params = {
          ...GET_CAT_DETAIL,
          data: [Object.assign(GET_CAT_DETAIL.data[0], param)],
        };
        dispatch(
          TicketActions.listCatDetail(params, res => {
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

  const onGetDataCombo = useCallback(() => {
    try {
      const params = {
        ...GET_DATA_COMBO,
        data: [Object.assign(GET_DATA_GROUP.data[0])],
      };
      dispatch(
        TicketActions.listDataCombo(params, res => {
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
  }, [dispatch, danger, t]);

  const onHandleFileAttach = useCallback(
    async (params: any) => {
      const {ticketid, linkto, files, callback} = params;
      for (const file of files) {
        const split = file.uri.split('/');
        const name = split.pop();
        const inbox = split.pop();
        const realPath = `file://${
          RNFS.TemporaryDirectoryPath
        }/${inbox}/${decodeURI(name)}`;

        ATTACH_FILE.data[0].referencekey1 = ticketid;
        ATTACH_FILE.data[0].linkto = linkto;
        RNFS.readFile(realPath, 'base64')
          .then((base64String: string) => {
            ATTACH_FILE.data[0].file.filename = file.name;
            ATTACH_FILE.data[0].file.filetype = getFileExtension(file.name);
            ATTACH_FILE.data[0].file.data = base64String;
            uploadAttachFile(
              ATTACH_FILE,
              {
                referencekey1: ticketid,
                linkto,
              },
              () => {
                if (file === files[files.length - 1]) {
                  callback?.();
                }
              },
            );
          })
          .catch(err => {
            console.log('ERROR MSG' + err.message, 'ERROR CODE' + err.code);
          });
        await sleep(500);
      }
    },
    [danger, dispatch, t],
  );

  const uploadAttachFile = useCallback(
    (formData: any, params: any, callback?: any) => {
      dispatch(
        TicketActions.attachFile(formData, res => {
          if (res.success) {
            addLink(params, {...res.data[0]});
            callback?.();
          } else {
            danger(t('error'), res?.message);
          }
        }),
      );
    },
    [dispatch, danger, t],
  );

  const addLink = useCallback(
    (param: IParamsAddLink, rs: any, callback?: () => void) => {
      const params = rs?.url ? ADD_LINK_BY_URL : ADD_LINK_ATTACHMENT;
      const formData = {
        ...params,
        data: [
          {
            ...params.data[0],
            ...rs,
            ...param,
          },
        ],
      };
      dispatch(
        TicketActions.addLinkFile(formData, res => {
          if (res.success) {
            callback?.();
          } else {
            danger(t('error'), res?.message);
          }
        }),
      );
    },
    [dispatch, danger, t],
  );
  const onCreateTicket = useCallback(
    async (formData: IFormSupportTicker) => {
      const params = {
        ...CREATE_SUPPORT_TICKET,
        data: [Object.assign(CREATE_SUPPORT_TICKET.data[0], formData)],
      };
      try {
        dispatch(
          TicketActions.createSupportTicket(params, res => {
            if (res.success) {
              const {ticketid} = res.data[0];
              let dataUpload = formData.dataFile;
              if (dataUpload) {
                onHandleFileAttach({
                  ticketid,
                  linkto: 'TCK',
                  files: dataUpload,
                  callback: () => {
                    onGetListSupportTicket({
                      customer: user?.prospect,
                    });
                    NavigationService.navigate(Routes.SupportTicket);
                  },
                });
                return false;
              }
              NavigationService.navigate(Routes.SupportTicket);
            } else {
              danger(t('error'), res?.message);
            }
          }),
        );
      } catch (error) {
        danger(t('error'), error.message);
      }
    },
    [danger, dispatch, t],
  );

  const onGetListSupportTicket = useCallback(
    (param?: ITicketParams) => {
      try {
        const params = {
          ...GET_LIST_SUPPORT_TICKET,
          data: [Object.assign(GET_LIST_SUPPORT_TICKET.data[0], param)],
        };
        dispatch(TicketActions.getSupportTicketList(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onCloseSupportTicket = useCallback(
    (param?: ITicketParams) => {
      try {
        const params = {
          ...CLOSE_SUPPORT_TICKET,
          data: [
            {
              ticketid: param,
            },
          ],
        };
        dispatch(
          TicketActions.closeSupportTicket(params, res => {
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

  const onCancelSupportTicket = useCallback(
    (param?: ITicketParams, callback?: () => void) => {
      try {
        const params = {
          ...CANCEL_SUPPORT_TICKET,
          data: [
            {
              ticketid: param,
              status: EnumTicketStatus.X,
              anal_tck3: EnumYesNo.Y,
            },
          ],
        };
        dispatch(
          TicketActions.cancelSupportTicket(params, res => {
            if (res.success) {
              success(t('label.notify'), res.message);
              callback && callback?.();
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

  const selectedSupportTicket = useCallback(
    (param?: IDataSuportItem) => {
      try {
        dispatch(TicketActions.selectedSupportTicket(param));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const toggleModal = useCallback(
    (param?: boolean) => {
      try {
        dispatch(TicketActions.toggleModalComment(param));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onAddComment = useCallback(
    (formData?: IFormSupportTicker) => {
      console.log('formData.onAddComment', formData);
      try {
        const params = {
          ...ADD_COMMENT,
          data: [formData],
        };
        dispatch(
          TicketActions.addCommentRequest(params, res => {
            if (res.success) {
              const dataUpload = formData?.dataFile;
              if (dataUpload) {
                // handle comment in ticket detail
                onHandleFileAttach({
                  ticketid: formData?.ticketid,
                  linkto: 'TCK',
                  files: dataUpload,
                  callback: () => {
                    onGetAttachFile({
                      linkto: 'TCK',
                      referencekey1: formData?.ticketid, //id,
                    });
                  },
                });
                return false;
              } else {
                toggleModal(false); // close modal comment on list
              }
              success(t('label.notify'), res.message);
              onGetHistories(formData?.ticketid);
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

  const onGetAttachFile = useCallback(
    (param?: IFileParams) => {
      console.log('param.onGetAttachFile', param);
      try {
        const params = {
          ...GET_ATTACH_FILE,
          data: [param],
        };
        dispatch(TicketActions.getAttachFileRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onDeleteAttachFile = useCallback(
    (param?: IFileParams) => {
      try {
        let paramTmp = {
          ...DEL_ATTACH_FILE.data[0],
          autonum: param,
        };
        const params = {
          ...DEL_ATTACH_FILE,
          data: [paramTmp],
        };
        dispatch(
          TicketActions.deleteFileRequest(params, res => {
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

  const onGetHistories = useCallback(
    (param?: string) => {
      try {
        let paramTmp = {
          ...GET_HISTORY_TICKET.data[0],
          ticketid: param,
        };
        const params = {
          ...GET_HISTORY_TICKET,
          data: [paramTmp],
        };
        dispatch(TicketActions.historyTicketRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onDeleteCommentLog = useCallback(
    (param?: string) => {
      try {
        const params = {
          ...DEL_COMMENT,
          data: [{logid: param}],
        };
        dispatch(
          TicketActions.delCommentRequest(params, res => {
            if (res.success) {
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

  return {
    loading,
    listDataType,
    listDataGroup,
    listCatDetail,
    listDataCom,
    supportList,
    selectedTicket,
    isOpen,
    loadingComment,
    attachFile,
    histories,
    onGetDataType,
    onGetDataGroup,
    onGetCatDetail,
    onGetDataCombo,
    onCreateTicket,
    onGetListSupportTicket,
    onCloseSupportTicket,
    onCancelSupportTicket,
    selectedSupportTicket,
    toggleModal,
    onAddComment,
    onGetAttachFile,
    onDeleteAttachFile,
    onGetHistories,
    onDeleteCommentLog,
    onHandleFileAttach,
  };
};
