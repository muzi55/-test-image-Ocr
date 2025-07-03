import { useState } from "react";
import Tesseract from "tesseract.js";

function ImageOCR() {
  const [image, setImage] = useState(null);
  const [extractedData, setExtractedData] = useState({ EID: "", IMEI: "", IMEI2: "", MEID: "" });
  const [error, setError] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setError(""); // 에러 상태 초기화

    // Tesseract로 이미지에서 텍스트 추출
    Tesseract.recognize(
      URL.createObjectURL(file),
      "eng",
      "kor", // 영어로 인식 (필요 시 한국어 'kor' 추가)
      { logger: (info) => console.log(info) }
    )
      .then(({ data: { text } }) => {
        console.log(`Extracted Text: ${text}`);
        const lines = text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line);

        // 기기 정보 유효성 검사: EID, IMEI, IMEI2, MEID 중 최소 하나라도 있는지 확인
        const hasEID = lines.some((line) => line === "EID" || line.startsWith("EID"));
        const hasIMEI = lines.some((line) => line.startsWith("IMEI") && !line.startsWith("IMEI2"));
        const hasIMEI2 = lines.some((line) => line.startsWith("IMEI2"));
        const hasMEID = lines.some((line) => line === "MEID" || line.startsWith("MEID"));

        console.log("Device info check:", { hasEID, hasIMEI, hasIMEI2, hasMEID });

        // 필수 필드들이 모두 없는 경우 에러 발생
        if (!hasEID && !hasIMEI && !hasIMEI2 && !hasMEID) {
          throw new Error(
            "기기 정보를 찾을 수 없습니다. EID, IMEI, IMEI2, MEID 중 하나 이상이 포함된 이미지를 업로드해주세요."
          );
        }

        const data = {};

        // EID, IMEI, IMEI2, MEID 추출 로직
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          // EID 추출
          if (line === "EID" && i + 1 < lines.length) {
            data.EID = lines[i + 1];
          } else if (line.startsWith("EID")) {
            data.EID = line.replace("EID", "").trim();
          }

          // IMEI 추출 (첫 번째 IMEI)
          if (line.startsWith("IMEI") && !line.startsWith("IMEI2")) {
            const imeiValue = line.replace("IMEI", "").trim();
            if (!data.IMEI) {
              // 첫 번째 IMEI만 저장
              data.IMEI = imeiValue;
            }
          }

          // IMEI2 추출
          if (line.startsWith("IMEI2")) {
            data.IMEI2 = line.replace("IMEI2", "").trim();
          }

          // MEID 추출
          if (line === "MEID" && i + 1 < lines.length) {
            data.MEID = lines[i + 1];
          } else if (line.startsWith("MEID")) {
            data.MEID = line.replace("MEID", "").trim();
          }
        }

        setExtractedData(data);
      })
      .catch((error) => {
        console.error("OCR Error:", error.message);
        setError(error.message);
      });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: "300px" }} />}
      {error && (
        <div style={{ color: "red", margin: "10px 0", padding: "10px", border: "1px solid red", borderRadius: "4px" }}>
          <strong>오류:</strong> {error}
        </div>
      )}
      <div>
        <h3>Extracted Data:</h3>
        <p>EID: {extractedData.EID}</p>
        <p>IMEI: {extractedData.IMEI}</p>
        <p>IMEI2: {extractedData.IMEI2}</p>
        <p>MEID: {extractedData.MEID}</p>
      </div>
    </div>
  );
}

export default ImageOCR;
