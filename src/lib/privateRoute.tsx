import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logOutUser } from "@/features/authSlice";
import { clearUserDetails, setUserDetails } from "@/features/userDetailsSlice";
import { useVerifyUserQuery } from "@/service/authApi";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  shouldProtect?: boolean;
};

const ProtectedRoute = ({ children, shouldProtect = true }: Props) => {
  const { token } = useAppSelector((state) => state.auth);
  // const userDetails = useAppSelector((state) => state.userDetails);
  // const [goodRender, setGoodRender] = useState(false);
  const isFirstRender = useRef(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { refetch, data, isError, isLoading, isUninitialized, isSuccess } =
    useVerifyUserQuery(token);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    if (token) {
      (async () => {
        refetch();
      })();
    }
  }, [token]);

  if (isFirstRender.current) return children;
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
    return children;
  }

  // if authentication is completed and the user is authenticated
  if (isSuccess && data.name) {
    console.log(data);
    dispatch(setUserDetails({ ...data }));
    if (shouldProtect) {
      return children;
    }
    navigate("/dashboard");
    return children;
  }
  return children;
};

export default ProtectedRoute;
