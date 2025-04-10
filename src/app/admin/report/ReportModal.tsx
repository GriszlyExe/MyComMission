import ReportUserWidget from "./ReportUserWidget";
import { LinkForwardIcon } from "hugeicons-react";
import { User } from "@/common/model";

const dummyUser: User = {
    userId: "user_123456",
    birthDate: "1995-08-21",
    description: "Passionate digital artist who loves exploring abstract and surreal themes.",
    location: "Bangkok, Thailand",
    firstName: "Dummy",
    lastName: "Example",
    artistFlag: true,
    email: "dummy@example.com",
    displayName: "DummyArts",
    phone: "0123456789",
    profileUrl: "/default-profile-2.png",
    age: 99,
    pdfUrl: "https://example.com/portfolios/phuriphon_portfolio.pdf",
    artistRate: 5.0,
    enabled2FA: true,
    createdAt: "2024-11-01T10:00:00Z",
    updatedAt: "2025-04-10T08:30:00Z",
};


export default function ReportModal() {
    let isResolved = false
    let hasReportee = true
    let hasPost = false
    let hasCommission = true

	return (
		<>
            <div className="modal-box">
                <div className="flex justify-between">
                    {/* Report Type */}
                    <h3 className="font-bold text:md md:text-lg mt-1 md:mt-0">Type: Post Report</h3>

                    {/* Report Status */}
                    {isResolved ? (
                        <button className="btn btn-sm border-none bg-success font-md text-sm md:text-lg text-white hover:bg-green-800">
                            Resolved
                        </button>
                    ) : (
                        <button className="btn btn-sm border-none bg-error text-sm md:text-lg text-white hover:bg-pink-800">
                            Pending
                        </button>
                    )}
                </div>

                {/* Reporter */}
                <p className="py-4">Reporter:</p>
                <div className="overflow-x-hidden">
                    <ReportUserWidget key={'user.userId'} userInfo={dummyUser}/>
                </div>
                
                {/* Report Description */}
                <p className="my-2">Description:</p>
                <p className="border-2 rounded-md p-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Quis exercitationem illum facilis, iste blanditiis libero 
                    aliquam molestiae consequuntur eligendi possimus tenetur 
                    esse, corrupti accusamus sapiente perspiciatis dignissimos 
                    commodi quasi. Fuga!
                </p>

                {/* Reportee (if any) */}
                { hasReportee &&
                    <>
                        <p className="py-4">Reportee:</p>
                        <div className="overflow-x-hidden">
                            <ReportUserWidget key={'user.userId'} userInfo={dummyUser}/>
                        </div>
                    </>
                }

                {/* Post (if any) */} 
                { hasPost &&
                    <>
                        <p className="my-2">Post Id:</p>
                        <p className="border-2 rounded-md p-2">
                            1ac3a3ed-dba9-4581-9c70-3225ce3a35b3
                        </p>
                    </>
                }

                {/* Commission (if any) */} 
                { hasCommission &&
                    <>
                        <p className="my-2">Commission Id:</p>
                        <p className="border-2 rounded-md p-2">
                            1ac3a3ed-dba9-4581-9c70-3225ce3a35b3
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
