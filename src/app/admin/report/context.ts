import { createContext, Dispatch, SetStateAction } from "react";
import { ReportStatus } from "@/common/model";

export const reportContext = createContext<{
	reportStatus: ReportStatus | null;
	setReportStatus: Dispatch<SetStateAction<ReportStatus | null>> | null;
}>({
	reportStatus: null,
	setReportStatus: null,
});