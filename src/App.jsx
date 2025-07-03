import "./App.css";
import ImgDownButton from "./component/ImgDownButton";
import ImageOCR from "./component/OCRComponent";

function App() {
  return (
    <>
      <h1>Image OCR Converter</h1>

      <ImageOCR />

      <ImgDownButton />
    </>
  );
}

export default App;
