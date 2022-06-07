export const LoginStart = () => ({
    type: "LOGIN_START",
  });
  export const Logout = (user) => ({
    type: "LOGOUT",
    payload: user,
  });
  export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
  });
  export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
  });
  export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
  });
  export const ProfileImg = (profilePicture) => ({
    type: "PROFILE_IMG",
    payload: profilePicture,
  });
  export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
  });
  export const ChangeCity = (city) => ({
    type: "CITY",
    payload: city,
  });