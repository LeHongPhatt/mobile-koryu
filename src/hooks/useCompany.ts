import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  CONTACT_PARAMS,
  GET_CURRENT_COMPANY,
  GET_TOTURIALS,
} from 'services/actionsCompany';
import * as CompanyActions from 'store/company';
import {CompanySelectors} from 'store/company';

export const useCompany = () => {
  const dispatch = useDispatch();
  const loading = useSelector(CompanySelectors.getAttrByKey('loading'));
  const company = useSelector(CompanySelectors.getAttrByKey('company'));
  const tutorials = useSelector(CompanySelectors.getAttrByKey('tutorials'));
  const contact = useSelector(CompanySelectors.getAttrByKey('contact'));

  const onGetCurrentCompany = useCallback(() => {
    return dispatch(CompanyActions.getCompanyRequest(GET_CURRENT_COMPANY));
  }, [dispatch]);

  const onGetToturials = useCallback(
    (formData?: any) => {
      const params = {
        ...GET_TOTURIALS,
        data: [
          {
            ...GET_TOTURIALS.data[0],
            searchString: formData?.searchString, // item
          },
        ],
      };
      return dispatch(CompanyActions.getQANRequest(params));
    },
    [dispatch],
  );

  const onGetContactGeneral = useCallback(() => {
    return dispatch(CompanyActions.getContactRequest(CONTACT_PARAMS));
  }, [dispatch]);

  return {
    loading,
    company,
    tutorials,
    contact,
    onGetCurrentCompany,
    onGetToturials,
    onGetContactGeneral,
  };
};
