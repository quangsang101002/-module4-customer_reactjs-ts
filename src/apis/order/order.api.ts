import api from "../base.api";
import { LoginResponse } from "../auth/auth/responses/login.response";
import { getAccessToken } from "../../utilities/token.util";

const addOrder = async (bodyOrder: any) => {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const param: LoginResponse = {
      token: accessToken,
    };
    for (const order of bodyOrder) {
      try {
        await api.post("/order", order, {
          params: param,
        });
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    }
  } else {
    alert("lỗi tooken");
  }
};

const orderAPI = {
  addOrder,
};
export default orderAPI;
