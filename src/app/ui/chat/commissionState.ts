export const states = {
	idle: "IDLE",
	brief: "BRIEF",
	brief_reject: "BRIEF_REJECTED",
	proposal: "PROPOSAL",
	proposal_reject: "PROPOSAL_REJECTED",
	working: "WORKING",
	artwork_shipped: "ARTWORK_SHIPPED",
	artwork_reject: "ARTWORK_REJECTED",
	finished: "FINISHED",
	canceled: "CANCELED",
};

export function isBriefExist(state: string) {
	return state == states.idle;
}

export function isCommissionEnded(state: string) {
	return (state === states.brief_reject) || (state === states.finished) || (state === states.canceled)
}


export function isCommissionReject(state: string) {
	return state == states.canceled || state == states.brief_reject;
}
