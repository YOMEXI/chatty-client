export interface UserInput {
  name: string;
  placeholder: string;
  type: string;
  showPassword: boolean | string;
  setshowPassword: any;
}

export interface PostInput {
  text: string;
  formData: any;
  title: string;
}

export interface POST {
  post?: any[];
  deletePost?: any;
  error?: any;
  success?: any;
  loading?: boolean;
  likePost?: any;
  like?: boolean;
  Like?: any;
}

export interface COMMENT {
  post?: any;
}

export interface PROFILE {
  profile: any;
  username?: any;
}
