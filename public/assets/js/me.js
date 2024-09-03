const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "User";

const heading = $(".dashboard__name-song");
const cdThumd = $(".cd__thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const cd = $(".cd");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playList = $("#playlist");

const app = {
  isPlay: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

  currentIndex: 0,
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  songs: [
    {
      name: "Truy Lùng Báo Vật",
      singer: "24K.RIGHT ft Sofia, producer: Masew,...",
      image: "./assets/img/rapviet.webp",
      path: "./assets/music/truylungbaovat.mp3",
    },
    {
      name: "Khoá Chân",
      singer: "24K.RIGHT [Feat. MASON NGUYỄN, NAM COCAIN, TUANN]",
      image: "./assets/img/khoachan.jpg",
      path: "./assets/music/khoachan.mp3",
    },
    {
      name: "Phụ Hộ Cho Con",
      singer: "24K.RIGHT [feat. B RAY, HUỲNH CÔNG HIẾU, HIPZ]",
      image: "./assets/img/phuhochocon.jpg",
      path: "./assets/music/phuhochocon.mp3",
    },
    {
      name: "Love Sand",
      singer: "HTH,JSOL,ALI Hoàng Dương",
      image: "./assets/img/anhtraisayhi.jpg",
      path: "./assets/music/lovesand.mp3",
    },
    {
      name: "Reget",
      singer: "Quân A.P, Quang Trung, ALi HD, Pháp Kiều FT Lâm Bảo Ngọc",
      image: "./assets/img/anhtraisayhi.jpg",
      path: "./assets/music/reget.mp3",
    },
    {
      name: "Cô Đơn Trên Sofa",
      singer: "Trung Quân",
      image: "./assets/img/codontrensofa.jpg",
      path: "./assets/music/codontrensofa.mp3",
    },
    {
      name: "Ngày Mai Người Ta Lấy Chồng",
      singer: "Vôi Bản Đôn",
      image: "./assets/img/anhtu.png",
      path: "./assets/music/ngaymainguoitalaychong.mp3",
    },
    {
      name: "Đừng Quên Tên Anh",
      singer: "Anh Tú",
      image: "./assets/img/dungquentenanh.jpg",
      path: "./assets/music/dungquentenanh.mp3",
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render() {
    const htmls = this.songs.map((song, index) => {
      return `
      <div  class="song ${
        index === this.currentIndex ? "active" : ""
      }" data-index="${index}">
          <div
            class="thumb"
            style="background-image: url('${song.image}')"
          ></div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="singer">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fa-solid fa-ellipsis"></i>
          </div>
        </div>`;
    });
    playList.innerHTML = htmls.join("");
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumd.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    //xử lí CD quay / dừng
    const cdThumdAnimate = cdThumd.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iteration: Infinity,
    });
    cdThumdAnimate.pause();

    //xử lí phóng to/thu nhỏ CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    //xử lí khi nhấn play
    playBtn.onclick = function () {
      _this.isPlay ? audio.pause() : audio.play();
    };
    //khi audio bi pause
    audio.onpause = function () {
      _this.isPlay = false;
      playBtn.classList.remove("playing");
      cdThumdAnimate.pause();
    };
    //khi audio duoc play
    audio.onplay = function () {
      _this.isPlay = true;
      playBtn.classList.add("playing");
      cdThumdAnimate.play();
    };

    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // xử lí khi tua nhạc
    progress.onchange = function (e) {
      const seekTime = (audio.duration * e.target.value) / 100;
      audio.currentTime = seekTime;
    };

    //xử lí khi next nhạc
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    //xử lí khi prev nhạc
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    //xử lí khi random nhạc
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active");
    };

    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    audio.onended = function () {
      _this.isRepeat ? audio.play() : nextBtn.click();
    };

    playList.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      const optionNode = e.target.closest(".option");
      if (songNode || optionNode) {
        if (songNode) {
          _this.currentIndex = Number(songNode.getAttribute("data-index"));
          _this.render();
          _this.loadCurrentSong();
          audio.play();
        }
        if (optionNode) {
          // option
        }
      }
    };
  },
  loadConfigs: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },

  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }

    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }

    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 300);
  },

  start: function () {
    this.loadConfigs();
    this.defineProperties();
    this.handleEvents();
    this.loadCurrentSong();
    this.render();

    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
};

app.start();
