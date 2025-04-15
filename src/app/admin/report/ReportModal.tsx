import ReportUserWidget from "./ReportUserWidget";
import { Report } from "@/common/model";
import { User } from "@/common/model";
import ReportStatus from "./ReportStatus";

export default function ReportModal({report}: {report: Report}) {

    let hasReportee = report.reporteeId;
    let hasPost = report.postId;
    let hasCommission = report.commissionId;

	return (
		<>
            <div className="modal-box">
                <div className="flex justify-between">
                    {/* Report Type */}
                    <h3 className="font-bold text:md md:text-lg mt-1 md:mt-0">Type: {report.reportType}</h3>

                    {/* Report Status */}
                    <ReportStatus reportStatus={report.reportStatus}/>

                </div>

                {/* Reporter */}
                <p className="py-4">Reporter:</p>
                <div className="overflow-x-hidden">
                    <ReportUserWidget key={'user.userId'} userInfo={report.reporter}/>
                </div>
                
                {/* Report Description */}
                <p className="my-2">Description:</p>
                <p className="border-2 rounded-md p-2">
                    {report.reportDescription}
                </p>

                {/* Reportee (if any) */}
                { hasReportee &&
                    <>
                        <p className="py-4">Reportee:</p>
                        <div className="overflow-x-hidden">
                            <ReportUserWidget key={`${report.reportId}-${report.reporterId}-report-${report.reporteeId}`} userInfo={report.reportee!}/>
                        </div>
                    </>
                }

                {/* Post (if any) */} 
                { hasPost &&
                    <>
                        <p className="my-2">Post Id:</p>
                        <p className="border-2 rounded-md p-2">
                            {report.postId}
                        </p>
                    </>
                }

                {/* Commission (if any) */} 
                { hasCommission &&
                    <>
                        <p className="my-2">Commission Id:</p>
                        <p className="border-2 rounded-md p-2">
                            {report.commissionId}
                        </p>
                    </>
                }


                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm text-sm md:text-md bg-primary text-white hover:bg-secondary hover:text-primary">Close</button>
                    </form>
                </div>
            </div>
		</>
	);
}
