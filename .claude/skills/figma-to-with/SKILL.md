---
name: figma-to-with
description: WITH 앱(이 폴더의 정적 HTML/CSS/JS 모바일 웹)에 Figma 화면을 추가하거나 고칠 때 쓰는 절차. 사용자가 마이디어 Figma 링크(figma.com/design/Uejw8CLMLDIqE85LwQ7QS2/...?node-id=...)를 주거나 "이 화면 만들어줘", "이 화면으로 수정해줘", "버튼 누르면 나오는 화면"이라고 할 때 사용.
---

# Figma → WITH 화면 만들기

WITH는 빌드 없는 정적 사이트다. 화면 하나 = `<이름>.html` + `<이름>.css`, 393px 폭 모바일 레이아웃.
라이브: https://gracegray20.github.io/with/ (main 브랜치 루트를 GitHub Pages가 배포)

## 1. 디자인 가져오기

1. 링크에서 fileKey(`Uejw8CLMLDIqE85LwQ7QS2`)와 node-id(`1340-279` → `1340:279`)를 뽑는다.
2. `figma:figma-design-to-code` 스킬을 먼저 불러온 뒤 `get_design_context`를 호출한다
   (`skillNames: "figma-design-to-code"`, `clientLanguages: "html,css,javascript"`, `clientFrameworks: "unknown"`).
   Figma 세션이 없으면 `create_session`부터.
3. 응답에 "animated nodes"가 있으면 `get_motion_context`(recursive)로 애니메이션 값도 받는다.
4. 사용자가 함께 준 설명("~를 누르면 나오는 화면")으로 **어느 화면의 어느 버튼에서 들어오는지** 정한다.

## 2. 이 프로젝트의 규칙

- **iPhone 상태바는 만들지 않는다.** Figma에는 프로토타입용으로 들어 있을 뿐이다.
  상태바 높이(보통 59 또는 60px)만큼 모든 y좌표를 빼서 배치한다. CSS 파일 맨 위 주석에 몇 px 뺐는지 적는다.
- Figma의 absolute 좌표를 그대로 옮기지 말고 flex/grid + margin/padding으로 바꾼다.
  간격은 Figma 좌표 차이로 계산한다(예: 이름 top 145, 다음 이름 top 201 → 행 간격).
- 모든 페이지 `<head>`: Pretendard CDN
  (`https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css`) → `community.css` → 화면 CSS.
  상세 헤더(← + 가운데 제목)가 필요하면 `post.css`의 `.detail-header`를 재사용한다.
- 공통 토큰은 `community.css`의 `:root`(--navy #1c1f3b, --gray-text, --gray-stat, --line 등). 같은 색이면 변수를 쓴다.
- 메인 탭 화면(커뮤니티·사진)은 공통 상단바(`.header__logo` + 회전 링 `.header__profile`)와
  하단 메뉴(`.bottom-nav` + `<script src="nav.js">`)를 쓴다. 하단 메뉴는 4개 탭(커뮤니티·사진·채팅·더보기).
- 화면 안의 버튼이 실제로 동작하게 만든다(탭 전환, 입력 전송, 패널 열기 등).
  디자인에 없는 다음 동작은 최소한으로만 만들고, 사용자에게 "디자인 없음"이라고 알린다.
- 뒤로가기(←)는 `document.referrer`가 있으면 `history.back()`, 없으면 href로.
  오버레이/패널은 `history.pushState`(#이름)로 열어서 폰의 뒤로가기·Esc로 닫히게 한다.
- 애니메이션은 `@media (prefers-reduced-motion: reduce)`에서 끈다.
- 사용자가 넣은 텍스트를 innerHTML에 넣지 않는다(textContent 사용).

## 3. 에셋

- `public/assets/<화면이름>/`에 `curl -sL <url> -o <파일>`로 하나씩 받는다.
  zsh에서는 `for f in "a b"` 식의 단어 분리가 안 되니 curl을 파일마다 따로 쓴다.
  Figma 임시 URL을 코드에 남기지 않는다.
- 받은 뒤 `file *`로 확인한다. 이미 있는 파일과 같은 이미지면(예: 판테온 배경 = `public/assets/join/bg.jpg`) 재사용하고 새 파일은 지운다.
  내용이 빈 SVG, 다른 레이어에 완전히 가려진 이미지도 지운다.
- 큰 PNG 사진(수백 KB 이상)은 `sips -s format jpeg -s formatOptions 80 a.png --out a.jpg`로 줄인다.
- SVG/이미지의 width·height 속성은 Figma 값 그대로 둔다.

## 4. 연결

- 들어오는 화면의 버튼/링크 href를 새 화면으로 바꾼다(버튼이면 `<a>`로 바꾸거나 클릭 핸들러).
- `README.md`의 화면 표에 한 줄 추가: 파일, 화면 설명(어디서 들어오는지), Figma 노드 링크.

## 5. 확인 (반드시)

- 로컬 서버는 Terminal 탭에서 `python3 -m http.server 5180`으로 돈다
  (macOS 권한 때문에 미리보기 도구가 Desktop 폴더 서버를 직접 못 띄움).
  꺼져 있으면 터미널 탭에서 다시 실행하고, `preview_start`에 이름 `with`(.claude/launch.json의 url 연결)를 쓴다.
- 브라우저 캐시 때문에 고친 파일이 안 보일 수 있다:
  `await fetch('/파일', {cache:'reload'})`로 바뀐 파일을 새로 받은 뒤 `location.reload()`.
- 들어오는 버튼부터 실제로 눌러서 흐름을 확인한다.
- `getBoundingClientRect()`로 주요 요소 위치를 `.phone` 기준으로 재서 Figma 좌표(상태바만큼 뺀 값)와 비교한다.
  1–2px 차이는 괜찮고, 그보다 크면 고친다. 숫자 비교 후 스크린샷으로 눈으로도 본다.
- 미리보기 탭이 백그라운드면 `requestAnimationFrame`·CSS transition·scroll 이벤트가 멈춰 있을 수 있다.
  스크린샷이 이상하면 computed style을 확인하고 한 번 더 찍는다.
  화면 여는 코드는 rAF 대신 `void el.offsetWidth` 후 클래스 추가로 쓴다.
- sed로 한꺼번에 바꿀 때 같은 값이 다른 규칙에도 있는지 먼저 grep한다(실제로 `gap: 4px`가 같이 바뀐 적 있음).

## 6. 마무리

- 사용자가 요청하기 전에는 커밋하지 않는다. 끝나면 한국어로 짧게 보고:
  만든 것, 연결된 흐름, Figma와 다른 점, 디자인이 없어 임의로 만든 부분.
- "Commit and push"라고 하면:
  `git add -A` → 내용을 설명하는 영어 커밋 메시지(끝에 Co-Authored-By 줄) → `git push origin main`
  → 라이브 주소를 10초 간격으로 curl 해서 새 파일이 반영됐는지 확인 → 걸린 시간과 주소를 알려준다.
