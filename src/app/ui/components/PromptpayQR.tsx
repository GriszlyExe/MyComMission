export default function PromptPayQR({qrImageSrc}:{qrImageSrc:string}) {
    return (
        <div className="flex justify-center items-center h-[400px]">
            <div className="flex flex-col items-center h-full border-2 border-gray-500">
                <img
                    src="/qr_logo_head.png"
                    alt="PromptPay Logo"
                    width={300}
                />
                <img
                    src={qrImageSrc}
                    alt="PromptPay QR Code"
                    width={350}
                />
            </div>
        </div>
    );
}