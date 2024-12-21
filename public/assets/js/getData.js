import { songs } from "../js/songs.js";
import {API} from "./api.js";

const boxs = document.querySelectorAll(".box");

for(const box of boxs) {
    box.onclick = () => {
        // box.getAttribute("data-value")
        // const obj = songs[box.getAttribute("data-value")];
        // fetch(API, {
        //     method: 'POST',  // Phương thức POST để gửi dữ liệu
        //     headers: {
        //         'Content-Type': 'application/json'  // Xác định kiểu dữ liệu gửi lên là JSON
        //     },
        //     body: JSON.stringify(obj)  // Chuyển đối tượng thành chuỗi JSON
        // }).finally(function() {
        //     console.log(123)
        // })
    }
            
}

// URL của API mà bạn muốn lấy dữ liệu

try {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
  } catch (error) {
    console.error(error)
  }
