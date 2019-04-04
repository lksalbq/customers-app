import { toast } from "react-toastify";
import { ERROR_MESSAGE } from "../../constants";

export function onActionToast(message, options, type) {
	options = { ...options, toastId: message };
	toast[type](message, options);
}

/**
 * Error helper
 */
export function errorHelper(CONST, error) {
	let title = "";
	if (Array.isArray(error) && error[0] !== undefined) {
		title = error[0].title;
	} else {
		title = error;
	}
	onActionToast(title, {}, ERROR_MESSAGE);
	return {
		type: CONST
	};
}
