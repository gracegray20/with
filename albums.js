// Photo albums, one per city.
// In the real app these are built automatically from the location of each photo;
// here they are sample data. The cover of every album is its most recent photo.
(() => {
  const A = "public/assets/albums";
  const raw = [
    {
      id: "switzerland",
      name: "스위스",
      photos: [
        { src: "public/assets/photo/switzerland.jpg", place: "그린델발트", takenAt: "2024-12-11T19:00" },
        { src: `${A}/switzerland/switzerland-1.jpg`, place: "체르마트", takenAt: "2024-12-10T09:40" },
        { src: `${A}/switzerland/switzerland-2.jpg`, place: "그린델발트", takenAt: "2024-12-11T10:05" },
        { src: `${A}/switzerland/switzerland-3.jpg`, place: "그린델발트", takenAt: "2024-12-11T08:30" },
        { src: `${A}/switzerland/switzerland-4.jpg`, place: "루체른", takenAt: "2024-12-08T16:10" },
        { src: `${A}/switzerland/switzerland-5.jpg`, place: "루체른", takenAt: "2024-12-08T11:45" },
        { src: `${A}/switzerland/switzerland-6.jpg`, place: "인터라켄", takenAt: "2024-12-09T14:20" },
      ],
    },
    {
      id: "london",
      name: "런던",
      photos: [
        { src: "public/assets/photo/london.jpg", place: "사우스뱅크", takenAt: "2024-12-11T14:00" },
        { src: `${A}/london/london-1.jpg`, place: "웨스트민스터", takenAt: "2024-12-11T12:40" },
        { src: `${A}/london/london-2.jpg`, place: "타워 브리지", takenAt: "2024-12-10T17:05" },
        { src: `${A}/london/london-3.jpg`, place: "타워 브리지", takenAt: "2024-12-10T13:20" },
        { src: `${A}/london/london-4.jpg`, place: "웨스트민스터", takenAt: "2024-12-11T11:10" },
        { src: `${A}/london/london-5.jpg`, place: "노팅힐", takenAt: "2024-12-09T15:30" },
        { src: `${A}/london/london-6.jpg`, place: "노팅힐", takenAt: "2024-12-09T14:50" },
      ],
    },
    {
      id: "tokyo",
      name: "도쿄",
      photos: [
        { src: "public/assets/photo/tokyo.png", place: "도쿄", takenAt: "2024-12-11T09:00" },
        { src: `${A}/tokyo/tokyo-1.jpg`, place: "시부야", takenAt: "2024-12-10T19:15" },
        { src: `${A}/tokyo/tokyo-2.jpg`, place: "시부야", takenAt: "2024-12-10T20:00" },
        { src: `${A}/tokyo/tokyo-3.jpg`, place: "미나토", takenAt: "2024-12-09T21:10" },
        { src: `${A}/tokyo/tokyo-4.jpg`, place: "미나토", takenAt: "2024-12-09T15:40" },
        { src: `${A}/tokyo/tokyo-5.jpg`, place: "아사쿠사", takenAt: "2024-12-08T10:20" },
        { src: `${A}/tokyo/tokyo-6.jpg`, place: "아사쿠사", takenAt: "2024-12-08T11:00" },
      ],
    },
  ];

  const pad = (n) => String(n).padStart(2, "0");
  const fmtDate = (d) => `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;

  const albums = raw
    .map((a) => {
      const photos = a.photos
        .map((p) => ({ ...p, date: new Date(p.takenAt) }))
        .sort((x, y) => y.date - x.date); // newest first
      return { ...a, photos, cover: photos[0], latest: photos[0].date, oldest: photos[photos.length - 1].date };
    })
    .sort((x, y) => y.latest - x.latest); // most recently visited album first

  window.WITH_ALBUMS = { albums, fmtDate, find: (id) => albums.find((a) => a.id === id) };
})();
