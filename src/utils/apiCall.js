import axios from "axios";

// const baseUrl = process.env.BASE_URL;

export const apiCall = async (type, url, token, post) => {
  const res = await axios({
    method: type,
    url: `/api/${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: post,
  });
  return res;
};
