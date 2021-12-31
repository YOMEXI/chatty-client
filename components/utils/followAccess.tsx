import axios from "axios";
import { useSelector } from "react-redux";
import { mutate } from "swr";
import { ToastFailure, ToastSuccess } from "./alert";

export const followUser = async (
  userToFollowId: any,
  followerId: any,
  username: any,
  user: any
) => {
  try {
    await axios.post(`/api/user/follow/${userToFollowId}`);
    await axios.post(`/api/conversation`, {
      senderId: user?.user?._id,
      recieverId: userToFollowId,
    });
    await mutate(`/api/followers/${followerId}`);
    await mutate(`/api/${username}`);
  } catch (error: any) {
    ToastFailure(error);
  }
};

export const unFollowUser = async (
  userToFollowId: any,
  followerId: any,
  username: any
) => {
  try {
    await axios.put(`/api/user/unfollow/${userToFollowId}`);
    await mutate(`/api/followers/${followerId}`);
    await mutate(`/api/${username}`);
  } catch (error: any) {
    ToastFailure(error);
  }
};

export const updatePassword = async (password: any, setloading: any) => {
  const { CurrentPassword, NewPassword } = password;

  try {
    setloading(true);

    const { data } = await axios.post(`/api/me/updatepassword`, {
      CurrentPassword,
      NewPassword,
    });
    setloading(false);
    ToastSuccess(data);
  } catch (error: any) {
    setloading(false);
    ToastFailure(error.data.message);
  }
};

export const toggleMessagePopup = async (
  popupsetings: any,
  setpopupsettings: any
) => {
  try {
    const { data } = await axios.post(`/api/messagePopup`);
    setpopupsettings(!popupsetings);
    ToastSuccess(data);
  } catch (error: any) {
    ToastFailure(error.data.message);
  }
};
