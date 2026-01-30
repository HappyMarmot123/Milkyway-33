# ReactBits Components

이 폴더는 [ReactBits](https://reactbits.dev)에서 복사한 컴포넌트들을 저장합니다.

## 사용 방법

1. [ReactBits 웹사이트](https://reactbits.dev)에서 원하는 컴포넌트를 선택합니다.
2. 컴포넌트 페이지의 **Code** 탭으로 이동합니다.
3. 필요한 의존성을 설치합니다 (컴포넌트마다 다를 수 있음).
4. 컴포넌트 코드를 복사하여 이 폴더에 저장합니다.
5. 프로젝트에서 컴포넌트를 import하여 사용합니다.

## 설치된 의존성

- ✅ `framer-motion` - 이미 설치됨
- ✅ `gsap` - 설치됨

## 예시

```jsx
import SplitText from "@/components/reactbits/SplitText";

function App() {
  return (
    <SplitText
      text="Hello, you!"
      delay={100}
      duration={0.6}
    />
  );
}
```

## 참고

- 각 컴포넌트는 독립적으로 작동합니다.
- 컴포넌트 코드는 자유롭게 수정 가능합니다.
- 스타일링과 기능을 프로젝트에 맞게 커스터마이징할 수 있습니다.

