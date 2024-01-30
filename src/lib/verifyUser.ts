import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
// import { logOutUser } from "@/features/authSlice";
import { useEffect } from "react";

export const VerifyUser = () => {
  const { token } = useAppSelector((state) => state.auth);
  //   const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      console.log("Hello");
      navigate("/auth");
    }
    if (token) {
      // call auth Api if there is token
      //
      //
      //
      //
    }
  }, [token]);
  return null;
};
