import axios from "axios";

interface InsertValue {
  title: string;
  urlLink: string;
  description: string;
}

// Read All Dass videoList table
export const getVideoList = async () => {
  const apiUrl = process.env.KORE_DASS_API_URL;
  const authToken = process.env.KORE_DASS_AUTH_TOKEN;
  try {
    const headers = {
      "Content-Type": "application/json", // Content-Type 헤더 설정
      auth: authToken, // 인증 토큰을 포함한 Authorization 헤더 설정
    };

    const data = {
      query: {
        expressions: [
          {
            field: "sys_Id",
            operand: ">",
            value: 0,
          },
        ],
        operator: "and",
      },
    };

    const response = await axios.post(
      apiUrl + "/VideoList/query?sys_limit=100&sys_offset=0",
      data,
      { headers }
    );

    if (response.status === 200) {
      return response;
    } else {
      throw new Error(
        "Fetch API 호출이 실패했습니다. 응답 코드: " + response.status
      );
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Insert One Dass videoList table
export const putVideoList = async (insertValue: InsertValue) => {
  const apiUrl = process.env.KORE_DASS_API_URL;
  const authToken = process.env.KORE_DASS_AUTH_TOKEN;
  try {
    const headers = {
      "Content-Type": "application/json", // Content-Type 헤더 설정
      auth: authToken, // 인증 토큰을 포함한 Authorization 헤더 설정
    };

    const data = {
      data: {
        title: insertValue.title,
        urlLink: insertValue.urlLink,
        description: insertValue.description,
      },
    };
    const response = await axios.post(apiUrl + "/VideoList", data, { headers });
    // {
    //     "title": "test",
    //     "urlLink": "test",
    //     "description": "test",
    //     "Updated_On": 1687329183657,
    //     "Created_On": 1687329183657,
    //     "Updated_By": "cs-2de3c068-e30f-5962-983b-bc45958ebf82",
    //     "Created_By": "cs-2de3c068-e30f-5962-983b-bc45958ebf82",
    //     "sys_Id": "sys-df8df5d7-bf7f-57d5-ba6f-3442d16c6e91",
    //     "_id": "6492999f765e303c29f1859d"
    // }

    if (response.status === 200) {
      return response;
    } else {
      throw new Error(
        "Add API 호출이 실패했습니다. 응답 코드: " + response.status
      );
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Delete One Dass videoList table
export const deleteVideoList = async (deleteTitle: any) => {
  const apiUrl = process.env.KORE_DASS_API_URL;
  const authToken = process.env.KORE_DASS_AUTH_TOKEN;
  try {
    const headers = {
      "Content-Type": "application/json",
      auth: authToken,
    };

    const data = {
      query: {
        expressions: [{ field: "title", operand: "=", value: deleteTitle }],
        operator: "and",
      },
    };

    const response = await axios.delete(apiUrl + "/VideoList", {
      headers,
      data,
    });
    // {
    //     "nDeleted": 1
    // }
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(
        "Delete API 호출이 실패했습니다. 응답 코드: " + response.status
      );
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
