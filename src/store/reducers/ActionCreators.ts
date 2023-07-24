import axios from "axios";
import { API_URL } from "../../api/api";
import { AppDispatch } from "../store";
import { contributionSlice } from "./ApiSlice";

export const getApiDataList = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(API_URL);
    dispatch(contributionSlice.actions.getApiData(response.data));
    // console.log("data", response.data);
  } catch (error) {
    console.log("error", error);
  }
};
