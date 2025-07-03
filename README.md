# OCR Test 프로젝트

이 프로젝트는 React + Vite를 기반으로 한 이미지 OCR(Optical Character Recognition) 애플리케이션입니다.

## 주요 기능

- **이미지 다운로드 기능**: 테스트를 위한 샘플 이미지를 다운로드할 수 있습니다.
- **OCR 기능**: 업로드된 이미지에서 텍스트를 추출하여 다음 정보를 인식합니다:
  - EID (Embedded Identity Document)
  - IMEI (International Mobile Equipment Identity)
  - IMEI2 (두 번째 IMEI)
  - MEID (Mobile Equipment Identifier)

## 기술 스택

- **React 19.1.0**: 프론트엔드 라이브러리
- **Vite**: 빌드 도구 및 개발 서버
- **Tesseract.js 6.0.1**: OCR 라이브러리
- **ESLint**: 코드 품질 관리

## 설치 및 실행

### 1. 종속성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 빌드

```bash
npm run build
```

### 4. 빌드 결과 미리보기

```bash
npm run preview
```

## 사용 방법

1. **테스트 이미지 다운로드**: "테스트 이미지 다운로드" 버튼을 클릭하여 샘플 이미지를 다운로드합니다.
2. **이미지 업로드**: 파일 선택 버튼을 클릭하여 분석할 이미지를 업로드합니다.
3. **OCR 결과 확인**: 업로드된 이미지에서 자동으로 기기 정보를 추출하여 화면에 표시됩니다.

## 주의사항

- 이미지는 EID, IMEI, IMEI2, MEID 중 하나 이상의 정보를 포함해야 합니다.
- 영어와 한국어 텍스트를 지원합니다.
- 이미지 품질이 OCR 정확도에 영향을 미칠 수 있습니다.
