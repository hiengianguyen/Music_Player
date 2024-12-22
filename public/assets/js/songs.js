const listSong = ["K_Right24", "Anh Tu Voi", "ATSH", "RAPVIET4"];

const songs = [
  {
    id: "1",
    K_Right24: [
      {
        name: "Một Nửa Sự Thật",
        singer: "24K.RIGHT [feat. Ngắn]",
        image: "../img/24kR.jpg",
        path: "../music/24K.R/motnuasuthat.mp3",
      },
      {
        name: "Phụ Hộ Cho Con",
        singer: "24K.RIGHT [feat. B RAY, HUỲNH CÔNG HIẾU, HIPZ]",
        image: "../img/24kR.jpg",
        path: "../music/24K.R/phuhochocon.mp3",
      },
      {
        name: "Bao Giờ Lấy Vợ",
        singer: "24K.RIGHT [feat. Anh Tú]",
        image: "../img/24kR.jpg",
        path: "../music/24K.R/baogiolayvo.mp3",
      },
      {
        name: "Từ A đến Z",
        singer: "24K.RIGHT",
        image: "../img/24kR.jpg",
        path: "../music/24K.R/tuadenz.mp3",
      },
      {
        name: "Truy Lùng Báo Vật",
        singer: "24K.RIGHT ft Sofia, producer: Masew,../.",
        image: "../img/24kR.jpg",
        path: "../music/24K.R/truylungbaovat.mp3",
      },
      {
        name: "Khoá Chân",
        singer: "24K.RIGHT [Feat. MASON NGUYỄN, NAM COCAIN, TUANN]",
        image: "../img/24kR.jpg",
        path: "../music/24K.R/khoachan.mp3",
      },
    ],
  },
  {
    id: "2",
    "Anh Tu Voi": [
      {
        name: "Ngày Mai Người Ta Lấy Chồng",
        singer: "Vôi Bản Đôn",
        image: "../img/anhtu.jpg",
        path: "../music/AnhTuVoi/ngaymainguoitalaychong.mp3",
      },
      {
        name: "Đừng Quên Tên Anh",
        singer: "Anh Tú",
        image: "../img/anhtu.jpg",
        path: "../music/AnhTuVoi/dungquentenanh.mp3",
      },
      {
        name: "Duyên Do Trời, Phận Tại Ta",
        singer: "Anh Tú",
        image: "../img/anhtu.jpg",
        path: "../music/AnhTuVoi/duyendotroiphantaita.mp3",
      },
      {
        name: "Rời Bỏ",
        singer: "Anh Tú",
        image: "../img/anhtu.jpg",
        path: "../music/AnhTuVoi/roibo.mp3",
      },
      {
        name: "Đoá Hồng Chơi Vơi",
        singer: "Anh Tú",
        image: "../img/anhtu.jpg",
        path: "../music/AnhTuVoi/doahongchoivoi.mp3",
      },
      {
        name: "Khoá Ly Biệt",
        singer: "Anh Tú",
        image: "../img/anhtu.jpg",
        path: "../music/AnhTuVoi/khoalibiet.mp3",
      },
    ],
  },
  {
    id: "3",
    ATSH: [
      {
        name: "Love Sand",
        singer: "HTH,JSOL,ALI Hoàng Dương",
        image: "../img/anhtraisayhi.jpg",
        path: "../music/ATSH/lovesand.mp3",
      },
      {
        name: "Reget",
        singer: "Quân A.P, Quang Trung, ALi HD, Pháp Kiều FT Lâm Bảo Ngọc",
        image: "../img/anhtraisayhi.jpg",
        path: "../music/ATSH/reget.mp3",
      },
      {
        name: "Sao Hạng A",
        singer: "Song Luân x HIEUTHUHAI x JSOL x Dương Domic",
        image: "../img/anhtraisayhi.jpg",
        path: "../music/ATSH/saohanga.mp3",
      },
      {
        name: "Đầu Đội Sừng",
        singer: "HURRYKNG x Quân AP x Gemini Hùng Huỳnh",
        image: "../img/anhtraisayhi.jpg",
        path: "../music/ATSH/daudoisung.mp3",
      },
      {
        name: "Đều Là Của Em",
        singer: "Anh Tú x Atus x Song Luân x Dương Domic x Quang Trung",
        image: "../img/anhtraisayhi.jpg",
        path: "../music/ATSH/deulacuaem.mp3",
      },
      {
        name: "Kim Phút Kim Giờ",
        singer: "Negav, Pháp Kiều, ISAAC, HIEUTHUHAI, HURRYKNG",
        image: "../img/anhtraisayhi.jpg",
        path: "../music/ATSH/kimphutkimgio.mp3",
      },
      {
        name: "Trói Em Lại",
        singer: "Quang Hùng MasterD",
        image: "../img/anhtraisayhi.jpg",
        path: "../music/ATSH/troiemlai.mp3",
      },
      {
        name: "Tinh Đầu Quá Chén",
        singer: "Quang Hùng MasterD, Negav, Erik, Pháp Kiều",
        image: "../img/anhtraisayhi.jpg",
        path: "../music/ATSH/tinhdauquachen.mp3",
      },
      {
        name: "Quay Đi Quay Lại",
        singer: "HIEUTHUHAI",
        image: "../img/anhtraisayhi.jpg",
        path: "../music/ATSH/quaydiquaylai.mp3",
      },
      {
        name: "Anh Biết Rồi",
        singer: "RHYDER",
        image: "../img/anhtraisayhi.jpg",
        path: "../music/ATSH/anhbietroi.mp3",
      },
    ],
  },
  {
    id: "4",
    RAPVIET4: [
      {
        name: "Anh Đã Làm Gì Đâu",
        singer: "Nhật Hoàng",
        image: "../img/rapviet.webp",
        path: "../music/RV4/anhdalamgidau.mp3",
      },
      {
        name: "1TinhYeu",
        singer: "HS Robber",
        image: "../img/rapviet.webp",
        path: "../music/RV4/1tinhyeu.mp3",
      },
      {
        name: "Qua Từng Khung Hình",
        singer: "HS Robber x Ngắn",
        image: "../img/rapviet.webp",
        path: "../music/RV4/quatungkhunghinh.mp3",
      },
      {
        name: "Hustlang All Day",
        singer: "HS Robber",
        image: "../img/rapviet.webp",
        path: "../music/RV4/hustlangallday.mp3",
      },
      {
        name: "Lại Là DG House",
        singer: "CoolKid x RHYDER",
        image: "../img/rapviet.webp",
        path: "../music/RV4/lailadghouse.mp3",
      },
      {
        name: "Chờ Một Người",
        singer: "Gill x Captain",
        image: "../img/rapviet.webp",
        path: "../music/RV4/chomotnguoi.mp3",
      },
      {
        name: "Lướt Trên Con Sóng",
        singer: "DangRangTo",
        image: "../img/rapviet.webp",
        path: "../music/RV4/luottrenconsong.mp3",
      },
      {
        name: "Tuyết Trên Phố",
        singer: "Gill",
        image: "../img/rapviet.webp",
        path: "../music/RV4/tuyettrenpho.mp3",
      },
      {
        name: "Love Somebody",
        singer: "CoolKid x YoungPuppy",
        image: "../img/rapviet.webp",
        path: "../music/RV4/lovesomebody.mp3",
      },
    ],
  },
];

export { listSong, songs };
