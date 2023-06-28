import { Router } from "express";
import path from "path";
import axios, { AxiosResponse } from "axios";
import { getVideoList, putVideoList, deleteVideoList } from "../services/Dass";

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
    res.status(500).json();
  }
});

routers.get("/api/dass/getVideoList", async (req, res) => {
  try {
    const returnValue = await getVideoList();
    res.status(200).json(returnValue.data.queryResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fetch API 호출 중 오류가 발생했습니다." });
  }
});

routers.post("/api/dass/putVideoList", async (req, res) => {
  try {
    const insertValue = req.body;
    if (insertValue.title && insertValue.urlLink) {
      await putVideoList(insertValue);
      res.status(200).json({ message: "정상적으로 입력완료" });
    } else {
      res.status(400).json({ message: "insertValue 값 오류" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Put API 호출 중 오류가 발생했습니다." });
  }
});

routers.get("/api/dass/deleteVideoList", async (req, res) => {
  try {
    const { title } = req.query;
    let returnValue;
    if (title) {
      await deleteVideoList(title);
      res.status(200).json({ message: "정상적으로 삭제완료" });
    } else {
      returnValue = { error: "Title parameter is missing" };
      res.status(400).json(returnValue);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Delete API 호출 중 오류가 발생했습니다." });
  }
});

export default routers;
