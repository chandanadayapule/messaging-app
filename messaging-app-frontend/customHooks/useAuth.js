import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const useAuth = (props) => {
	const { currentUser } = useSelector(mapState);
	const navigate = useHistory();

	// console.log({ isEditPage, isOfferingPage });
	useEffect(() => {
		if (currentUser === {}) {
			return navigate.push("/login");
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);

	return currentUser;
};

export default useAuth;
