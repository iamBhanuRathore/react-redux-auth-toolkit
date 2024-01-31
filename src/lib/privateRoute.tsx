import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logOutUser } from "@/features/authSlice";
import { clearUserDetails } from "@/features/userDetailsSlice";
import { useVerifyUserQuery } from "@/service/authApi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  shouldProtect?: boolean;
};

const ProtectedRoute = ({ children, shouldProtect = true }: Props) => {
  const { token } = useAppSelector((state) => state.auth);
  // const userDetails = useAppSelector((state) => state.userDetails);
  const [goodRender, setGoodRender] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { refetch, data, isError, isLoading, isUninitialized, isSuccess } =
    useVerifyUserQuery(token);
  useEffect(() => {
    setGoodRender(true);
    if (token) {
      (async () => {
        refetch();
      })();
    }
  }, [token]);

  if (!goodRender) return children;
  if (!token) {
    // if the token is not found after updaing the redux state
    if (shouldProtect) {
      navigate("/auth");
    }
    // return <Navigate to="/auth" />;
    return children;
  }

  // if authentication is in process
  if (isLoading || isUninitialized) {
    return children;
  }
  // if authentication is rejected
  if (isError) {
    dispatch(logOutUser(), clearUserDetails());
    navigate("/auth");
    return null;
  }

  // if authentication is completed and the user is authenticated
  if (isSuccess && data.name) {
    if (shouldProtect) {
      return children;
    }
    navigate("/dashboard");
    // return children;
  }
  return children;
};

export default ProtectedRoute;
