import { environment } from "src/environments/environment.development";
const BASE_URL = environment.baseUrl;



export const ADMIN_LOGIN_URL = BASE_URL + '/api/users/admin/login';

export const ADMIN_REGISTER_URL = BASE_URL + '/api/users/admin/register';

export const USER_REGISTER_URL = BASE_URL + '/api/users/user/register';

export const USER_UPLOAD_OR = BASE_URL + '/api/uploads/ORdoc';

export const USER_UPLOAD_CR = BASE_URL + '/api/uploads/CRdoc';

export const USER_UPLOAD_STUDYLOAD = BASE_URL + '/api/uploads/StudyLoad';

export const USER_UPLOAD_IDDOC = BASE_URL + '/api/uploads/IDdoc';

export const USER_UPLOAD_PAYMENT = BASE_URL + '/api/uploads/Payment';