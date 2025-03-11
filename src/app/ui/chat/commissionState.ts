export const states = {
    idle: "idle",
    brief: "brief",
    brief_reject: "brief-reject",
    proposal: "proposal",
    proposal_reject: "proposal-reject",
    working: "working",
    finished: "finished",
    canceled: "canceled"
}

export function isBriefExist(state: string) {
    return (state == states.idle)
}
export function isComissionReject(state: string) {
    return (state == states.canceled) || (state == states.brief_reject)
}