import { useAppDispatch, useAppSelector } from "@/app/hooks";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  shouldProtected: boolean;
};

const PrivateRoute = ({ children, shouldProtected = false }: Props) => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  if (!token) {
    console.log("Hello");
    localStorage.removeItem("authToken");
    navigate("/auth");
  }
  if (token) {
  }
  console.log(shouldProtected);
  return <div>children</div>;
};

export default PrivateRoute;
