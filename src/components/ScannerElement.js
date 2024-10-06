import React, { useRef, useEffect, useState } from 'react';
import QrScanner from 'qr-scanner';
import { useNavigate } from 'react-router-dom';

export default function ScannerElement() {
    const videoRef = useRef(null);
    const [qrCodeResult, setQrCodeResult] = useState('');
    const [error, setError] = useState('');
    const [scanning, setScanning] = useState(false);
    const navigate = useNavigate();
    let qrScanner;

    const startScanner = async () => {
        if (videoRef.current) {
            try {
                qrScanner = new QrScanner(
                    videoRef.current,
                    result => {
                        setQrCodeResult(result.data);
                        setScanning(false);
                        qrScanner.stop();
                        if (result.data.includes("InspectionForm")) {
                            navigate(`/form?data=${encodeURIComponent(result.data)}&formType=InspectionForm`);
                        // } else if (result.data.includes("SecurityForm")) {
                        //     navigate(`/form?data=${encodeURIComponent(result.data)}&formType=SecurityForm`);
                        // } else if (result.data.includes("TimekeeperForm")) {
                        //     navigate(`/form?data=${encodeURIComponent(result.data)}&formType=TimekeeperForm`);
                        } else if (result.data.includes("CheckerForm")) {
                            navigate(`/form?data=${encodeURIComponent(result.data)}&formType=CheckerForm`);
                        }
                         else {
                            setError('Unrecognized QR code');
                        }
                    },
                    {
                        onDecodeError: error => console.warn(error),
                        highlightScanRegion: true,
                        highlightCodeOutline: true
                    }
                );

                const hasCamera = await QrScanner.hasCamera();
                if (hasCamera) {
                    qrScanner.start();
                    setScanning(true);
                } else {
                    setError('No camera found.');
                }
            } catch (e) {
                setError(`Error accessing the camera: ${e.message}`);
            }
        }
    };

    useEffect(() => {
        return () => {
            if (qrScanner) {
                qrScanner.stop();
                qrScanner.destroy();
            }
        };
    }, [qrScanner]);

    const handleScanButtonClick = () => {
        if (!scanning) {
            setQrCodeResult('');
            setError('');
            startScanner();
        }
    };

    return (
        <div className="scanner-container">
            <button onClick={handleScanButtonClick} className="scan-button">Scan QR Code</button>
            <video ref={videoRef} className={scanning ? 'video-scanner' : 'video-scanner hidden'}></video>
            {qrCodeResult && <p>QR Code Result: {qrCodeResult}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
}
