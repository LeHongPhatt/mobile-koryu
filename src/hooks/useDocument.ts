import {useNotify} from 'hooks';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_DATA_INTRO,
  GET_DOCUMENT_REQUEST,
  GET_IMAGE_LIST_REQUEST,
  PUBDOC_PREVIEW_FILE_ATTACH,
} from 'services/actionsDocuments';
import * as DocumentActions from 'store/document';
import {DocumentSelector} from 'store/document';
import {IDocumentParams} from 'types';

export const useDocument = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {danger} = useNotify();

  const loading = useSelector(DocumentSelector.getAttrByKey('loading'));
  const documents = useSelector(DocumentSelector.getAttrByKey('documents'));
  const imageList = useSelector(DocumentSelector.getAttrByKey('imageList'));
  const dataIntro = useSelector(DocumentSelector.getAttrByKey('dataIntro'));
  const pubDocFile = useSelector(DocumentSelector.getAttrByKey('pubDocFile'));

  const onGetDocumentList = useCallback(
    (prms: IDocumentParams) => {
      try {
        const params = {
          ...GET_DOCUMENT_REQUEST,
          data: [Object.assign(GET_DOCUMENT_REQUEST.data[0], prms)],
        };
        dispatch(DocumentActions.getDocumentRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetImageList = useCallback(
    (prms: IDocumentParams) => {
      try {
        const params = {
          ...GET_IMAGE_LIST_REQUEST,
          data: [Object.assign(GET_IMAGE_LIST_REQUEST.data[0], prms)],
        };
        dispatch(DocumentActions.getImageListRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, danger, t],
  );

  const onGetDataIntro = useCallback(() => {
    try {
      dispatch(DocumentActions.getDataIntroRequest(GET_DATA_INTRO));
    } catch (error) {
      danger(t('error'), error?.message);
    }
  }, [dispatch, danger, t]);

  const onPreviewWebviewFile = useCallback(
    async (formData: any) => {
      console.log('formData.onPreviewWebviewFile', formData);
      try {
        PUBDOC_PREVIEW_FILE_ATTACH.data[0].id = formData;

        dispatch(
          DocumentActions.onPreviewFileAttach(PUBDOC_PREVIEW_FILE_ATTACH),
        );
      } catch (error: any) {
        danger(t('error'), error?.message);
      }
    },
    [dispatch, t],
  );

  return {
    loading,
    documents,
    imageList,
    dataIntro,
    pubDocFile,
    onGetDocumentList,
    onGetImageList,
    onGetDataIntro,
    onPreviewWebviewFile,
  };
};
