import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logOutUser } from "@/features/authSlice";
import { clearUserDetails, setUserDetails } from "@/features/userDetailsSlice";
import { useVerifyUserMutation } from "@/service/authApi";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [verifyUser, { isError, isLoading, isSuccess, isUninitialized, data }] =
    useVerifyUserMutation();

  // for performing first time calling the api for getting the user details
  useEffect(() => {
    if (!token) {
      console.log("Hello");
      localStorage.removeItem("authToken");
      navigate("/auth");
    }
    if (token) {
      verifyUser(token);
    }
  }, []);
  useEffect(() => {
    // initialize hi nhi hua abhi tak
    if (isUninitialized) return;
    if (isLoading) return;
    if (isSuccess && data) {
      dispatch(
        setUserDetails({
          name: "bhanu",
          age: "22",
          role: "User",
          designation: ["a", "b", "c"],
          userId: "1212122112",
        })
      );
      return;
    }
    dispatch(logOutUser(), clearUserDetails());
  }, [data, isSuccess, isLoading, isError, isUninitialized]);
  return <div>children</div>;
};

export default ProtectedRoute;
