export default function ImgDownButton() {
  const downloadTestImage = () => {
    const link = document.createElement("a");
    link.href = "/deviceInfo-test.png";
    link.download = "deviceInfo-test.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div style={{ margin: "20px 0" }}>
      <button
        onClick={downloadTestImage}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}>
        테스트 이미지 다운로드
      </button>
    </div>
  );
}
