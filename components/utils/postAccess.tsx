import axios from "axios";
import { mutate } from "swr";
import { ToastFailure } from "./alert";

export const likePost = async (id: any, post: any, user: any) => {
  let postID = post.map(
    (p: any) =>
      p.likes.filter((p: any) => p.user.toString() === user.user._id.toString())
        .length
  );

  return await mutate(`/api/posts/${id}`, async () => {
    if (id && Number(postID) === 0) {
      await axios.post(`/api/posts/like/${id}`);
      mutate(`/api/posts/${id}`);
    }
    if (id && Number(postID) > 0) {
      await axios.patch(`/api/posts/unlike/${id}`);
      mutate(`/api/posts/${id}`);
    }
  });
};

export const deletePost = async (id: any, setloading: any) => {
  if (id) {
    try {
      setloading(true);
      const { data } = await axios.delete(`/api/posts/${id}`);
      console.log(data);
      ToastFailure(data);
      setloading(false);

      mutate(`/api/posts/${id}`);

      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error: any) {
      console.log(error);
      ToastFailure(error.data);
    }
  }
};
