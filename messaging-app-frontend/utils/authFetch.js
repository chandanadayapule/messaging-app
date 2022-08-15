// This function is used for fetching data from authentication apis/ app apis
async function authFetch(url = "", data = {}, token = "", method = "POST") {
	// try {

	const requestInfo =
		token.length > 0
			? {
					method: method || "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Jwt ${token}`,
					},
					body: JSON.stringify(data),
			  }
			: {
					method: method || "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
			  };
	const response = await fetch(url, requestInfo);
	//.json()
	if (!response.ok) {
		const error =
			"Something went wrong! Make sure you are using the  right  credentials!";
		throw Error(error);
	}
	return response.json();
}

export default authFetch;
