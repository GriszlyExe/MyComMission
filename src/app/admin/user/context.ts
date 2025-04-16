import { createContext, Dispatch, SetStateAction } from "react";

export const userReportContext = createContext<{
	banStatus: boolean | null;
	setBanStatus: Dispatch<SetStateAction<boolean | null>> | null;
}>({
	banStatus: null,
	setBanStatus: null,
});