import { Router } from "express";
import path from "path";
import axios, { AxiosResponse } from "axios";

const routers = Router();

// /home으로 돌어오면 리액트 홈페이지로
routers.get("/home", function (req, res) {
  res.sendFile(path.join(__dirname, "../my-react-pjt/build/index.html"));
});

// /sdkhome은 main index
routers.get("/sdkhome", function (req, res) {
  res.sendFile(path.join(__dirname, "../Kore_bot_SDKApp/sdk/main/index.html"));
});
// /UI로 링크타면 챗봇
routers.get("/UI", function (req, res) {
  res.sendFile(path.join(__dirname, "../Kore_bot_SDKApp/sdk/UI/index.html"));
});

// 특정 엔드포인트에 요청을 받으면 로컬 백엔드로 요청을 전달하고 응답을 반환합니다.
routers.get("/api/Item/:id?", async (req, res) => {
  const { id } = req.params; // /api/Item/1에서 1을 가져옵니다.
  try {
    let url = `http://127.0.0.1:8000/Item/`;

    if (id) {
      url += id;
    }
    // 로컬 백엔드로 요청을 전달합니다.
    const response: AxiosResponse = await axios.get(url);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default routers;
