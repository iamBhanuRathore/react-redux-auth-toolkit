import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logOutUser } from "@/features/authSlice";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { token, name } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(logOutUser());
    navigate("/auth");
  };
  return (
    <div className="h-full flex items-center justify-center">
      <Card className={cn("max-w-[400px] shadow-md")}>
        <CardHeader>
          <Header label="Dashboard Page" />
        </CardHeader>
        <CardContent className="flex break-all flex-col items-center justify-center">
          <p className="capitalize">Name:{name}</p>
          <p>Token:{token}</p>
          <Button onClick={handleClick}>Logout User</Button>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default DashboardPage;
