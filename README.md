# WITH

Figma 디자인([마이디어](https://www.figma.com/design/Uejw8CLMLDIqE85LwQ7QS2/))에서 변환한 여행 동행 커뮤니티 모바일 웹 화면입니다. 빌드 없이 정적 파일만으로 동작합니다.

## 실행

```bash
cd "/Users/seunghyunpark/Desktop/ai 프로젝트 테스트/with"
python3 -m http.server 5180
```

브라우저에서 http://localhost:5180 열기 (첫 화면 = 커뮤니티)

## 화면

| 파일 | 화면 | Figma |
| --- | --- | --- |
| `index.html` + `community.css` | 커뮤니티 · 동행구해요 목록 (홈) | [1236:27](https://www.figma.com/design/Uejw8CLMLDIqE85LwQ7QS2/?node-id=1236-27) |
| `post.html` + `post.css` | 글 상세 (목록의 글 클릭) | [1239:430](https://www.figma.com/design/Uejw8CLMLDIqE85LwQ7QS2/?node-id=1239-430) |
| `join.html` + `join.css` | 채팅 참여 (글 상세의 '참여하기') | [1340:185](https://www.figma.com/design/Uejw8CLMLDIqE85LwQ7QS2/?node-id=1340-185) |
| `chat.html` + `chat.css` | 채팅방 (참여 화면의 '참여하기') | [1340:279](https://www.figma.com/design/Uejw8CLMLDIqE85LwQ7QS2/?node-id=1340-279) |
| `photo.html` + `photo.css` | 사진 · 도시별 앨범 표지 (하단 메뉴 '사진') | [1563:77](https://www.figma.com/design/Uejw8CLMLDIqE85LwQ7QS2/?node-id=1563-77) |
| `album.html?city=<id>` + `album.css` | 도시 앨범 · 날짜별 사진, 전체화면 보기 (표지 클릭) | 디자인 없음 |
| `profile.html` + `profile.css` | 내 프로필 (상단 오른쪽 프로필 사진 클릭) | 디자인 없음 |

## 구조

- `community.css` — 공통 스타일(리셋, 하단 메뉴 등)과 커뮤니티 화면 스타일. 다른 화면도 이 파일을 먼저 불러옵니다.
- `nav.js` — 하단 메뉴 동작(탭 모션, 화면 이동)
- `albums.js` — 도시별 앨범 데이터. 사진마다 장소·촬영 시각이 있고, 가장 최근 사진이 앨범 표지가 됩니다.
- `public/assets/<화면>/` — Figma에서 내보낸 아이콘·이미지
- `public/assets/albums/<도시>/` — 앨범 샘플 사진 (출처는 `CREDITS.md`)
