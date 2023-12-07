const BASE_URL = 'http://localhost:5000';



export const LOGIN_URL = BASE_URL + '/api/users/login';

export const ADMIN_REGISTER_URL = BASE_URL + '/api/users/admin/register';

export const MOD_REGISTER_URL = BASE_URL + '/api/users/mod/register';

export const USER_REGISTER_URL = BASE_URL + '/api/users/user/register';

export const USER_VERIFY_EMAIL_URL = BASE_URL + '/api/users/user/verify/';

export const USER_MANUAL_REGISTER_URL = BASE_URL + '/api/users/user/manual-register';

export const GET_USER_INFO_URL = BASE_URL + '/api/users/info/';

export const GET_PENDING_USER_URL = BASE_URL + '/api/users/user/pending/';

export const GET_REGISTERED_USER_URL = BASE_URL + '/api/users/user/registered/';

export const GET_REGISTERED_USER_BY_ID_URL = BASE_URL + '/api/users/user/registered/';

export const SEARCH_PENDING_USER_URL = BASE_URL + '/api/users/user/pending/';

export const APPROVE_PENDING_USER_URL = BASE_URL + '/api/users/user/pending/approve';

export const REJECT_PENDING_USER_URL = BASE_URL + '/api/users/user/pending/reject/';

export const DELETE_REGISTERED_USER_URL = BASE_URL + '/api/users/user/registered/delete/';

export const USER_UPLOAD_OR = BASE_URL + '/api/uploads/ORdoc';

export const USER_UPLOAD_CR = BASE_URL + '/api/uploads/CRdoc';

export const USER_UPLOAD_STUDYLOAD = BASE_URL + '/api/uploads/StudyLoad';

export const USER_UPLOAD_IDDOC = BASE_URL + '/api/uploads/IDdoc';

export const USER_UPLOAD_PAYMENT = BASE_URL + '/api/uploads/Payment';

export const USER_FEEDBACK = BASE_URL + '/api/misc/feedback';

export const GET_RECENT_USER_FEEDBACK = BASE_URL + '/api/misc/recent/feedback';

export const GET_ALL_USER_FEEDBACK = BASE_URL + '/api/misc/all/feedback';

export const DELETE_USER_FEEDBACK = BASE_URL + '/api/misc/delete/feedback/';