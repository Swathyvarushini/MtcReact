import React, { useRef, useEffect, useState } from 'react';
import QrScanner from 'qr-scanner';

export default function ScannerElement() {
    const videoRef = useRef(null);
    const [qrCodeResult, setQrCodeResult] = useState('');
    const [error, setError] = useState('');
    const [scanning, setScanning] = useState(false);
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
