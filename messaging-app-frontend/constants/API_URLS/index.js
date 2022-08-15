const BASE_API_URL = "http://127.0.0.1:8000/api" //"https://chat.hivepath.io/api";
//  process.env.NEXT_PUBLIC_URL;

const API_URLS = {
	
	GET_TOKEN                 : `${BASE_API_URL}/auth/token/`,
	VERIFY_TOKEN              : `${BASE_API_URL}/token-verify/`,
	GET_ACCOUNTS              : `${BASE_API_URL}/account/`,
	GET_CONVERSATIONS         : `${BASE_API_URL}/conversations/`,	
	CREATE_CONVERSATIONS      : `${BASE_API_URL}/conversation/create`,
	DELETE_CONVERSATION       : `${BASE_API_URL}/conversation/delete`,
	GET_LAST_CONVERSATION_URL : `${BASE_API_URL}/last_conversation`,
};

export default API_URLS;
