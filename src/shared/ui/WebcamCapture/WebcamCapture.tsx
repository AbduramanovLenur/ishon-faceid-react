import { useRef, useState, type FC } from "react";
import Webcam from "react-webcam";
import { CameraOutlined, DeleteOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useTranslation } from "react-i18next";

import { dataUrlToFile } from "@shared/utils";

import styles from "./WebcamCapture.module.scss";

interface IWebcamCaptureProps {
  onCapture: (file: File) => void;
  onDelete?: () => void;
  className?: string;
}

const WebcamCapture: FC<IWebcamCaptureProps> = ({
  onCapture,
  onDelete,
  className,
}) => {
  const { t } = useTranslation();
  const webcamRef = useRef<Webcam>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    setPreview(imageSrc);
    onCapture(dataUrlToFile(imageSrc, `photo-${Date.now()}.jpg`));
  };

  const handleDelete = () => {
    setPreview(null);
    onDelete?.();
  };

  const handleUserMedia = () => {
    message.success(t("common.cameraEnabled"));
  };

  const handleUserMediaError = (error: string | DOMException) => {
    console.error("CAMERA ERROR:", error);
  };

  return (
    <div className={`${styles["webcam"]}${className ? ` ${className}` : ""}`}>
      {cameraActive && (
        <Webcam
          ref={webcamRef}
          className={styles["webcam__media"]}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
          audio={false}
          onUserMedia={handleUserMedia}
          onUserMediaError={handleUserMediaError}
          videoConstraints={{
            width: { ideal: 1280 },
            height: { ideal: 1280 },
            facingMode: "user",
          }}
          style={{ display: preview ? "none" : "block" }}
        />
      )}

      {preview && (
        <img className={styles["webcam__media"]} src={preview} alt="Captured" />
      )}

      {!cameraActive && !preview && (
        <div className={styles["webcam__start"]}>
          <button
            type="button"
            className={`${styles["webcam__btn"]} ${styles["webcam__btn--capture"]}`}
            onClick={() => setCameraActive(true)}
            aria-label="Start camera"
          >
            <CameraOutlined />
          </button>
        </div>
      )}

      <div className={styles["webcam__controls"]}>
        {preview ? (
          <button
            type="button"
            className={`${styles["webcam__btn"]} ${styles["webcam__btn--delete"]}`}
            onClick={handleDelete}
            aria-label="Delete"
          >
            <DeleteOutlined />
          </button>
        ) : cameraActive ? (
          <button
            type="button"
            className={`${styles["webcam__btn"]} ${styles["webcam__btn--capture"]}`}
            onClick={capture}
            aria-label="Capture"
          >
            <CameraOutlined />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default WebcamCapture;
