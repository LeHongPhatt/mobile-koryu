/**
 * Basic Setting Variables Define
 */
export const BaseSetting = {
  name: 'custvc',
  displayName: 'CUSTAVICO',
  appVersion: '1.0.2',
  // domain: 'test.tavicosoft.com',
  domain: 'erpapi-dev.tavicosoft.com',
  protocol: 'https',
  defaultLanguage: 'VN',
  SECKEY: '',
  TOKEN: 'DBBF5C78-138B-416B-A37C-7C95C6B8D413',
  languageSupport: ['EN', 'VN'],
};

export const endPoints = {
  baseUri: BaseSetting.protocol + '://' + BaseSetting.domain,
  connect: '/api/directrouter/index',
  capcha: 'captcha/getimage',
};
