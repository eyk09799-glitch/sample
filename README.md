## 사이트 주소
https://eyk09799-glitch.github.io/sample/

# 🧠 참/거짓 논리 퀴즈

명제, 역·이·대우, '그리고/또는'에 관한 문장을 읽고 O/X로 답하는 간단한 웹 퀴즈입니다.
HTML, CSS, JavaScript만 사용해서 설치 없이 바로 실행됩니다.

## 기능
- 10문제를 무작위 순서로 출제
- 답을 고르면 바로 정답/오답과 해설 표시
- 마지막에 점수와 한 줄 평가

## 파일 구성
| 파일 | 역할 |
|---|---|
| `index.html` | 화면 구조 (시작 / 문제 / 결과 화면) |
| `style.css` | 디자인 |
| `script.js` | 문제 데이터와 퀴즈 동작 |

## 실행 방법
`index.html` 파일을 더블클릭해서 브라우저로 열면 됩니다.

## 문제 추가하기
`script.js` 맨 위의 `questions` 배열에 아래 형식으로 추가하세요.

```js
{
  text: "문제 문장",
  answer: true,          // O가 정답이면 true, X가 정답이면 false
  explain: "해설 문장"
},
```

## GitHub Pages로 배포하기
1. 이 저장소를 GitHub에 올립니다.
2. 저장소의 **Settings → Pages**로 들어갑니다.
3. **Branch**를 `main`, 폴더를 `/ (root)`로 고르고 **Save**를 누릅니다.
4. 잠시 뒤 표시되는 주소로 접속하면 퀴즈를 할 수 있습니다.
