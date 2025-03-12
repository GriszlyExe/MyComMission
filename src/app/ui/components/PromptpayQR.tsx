export default function PromptPayQR() {
    return (
        <div className="flex justify-center items-center h-[400px]">
            <div className="flex flex-col items-center h-full border-2 border-gray-500">
                <img
                    src="/qr_logo_head.png"
                    alt="PromptPay Logo"
                    width={300}
                />
                <img
                    src="/QR_test.png"
                    alt="PromptPay QR Code"
                    width={175}
                />
            </div>
        </div>
    );
}