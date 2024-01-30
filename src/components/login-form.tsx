import * as z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "@/service/authApi";
import { CardWrapper } from "./auth/card-wrapper";
import {
  FormControl,
  FormField,
  FormItem,
  Form,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "@/features/authSlice";
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
const LoginForm = ({ handleFormChange }: { handleFormChange: () => void }) => {
  const [loginUser, { isError, isLoading, isSuccess, data }] =
    useLoginUserMutation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    await loginUser(values);
  };
  useEffect(() => {
    if (isLoading) {
      toast({
        title: "Logging In",
        description: "Wait a moment for verification",
        className: "bg-yellow-300",
      });
    }
    if (isError) {
      toast({
        title: "Something Went Wrong",
        description: "Retry for verification",
        className: "bg-red-300",
      });
    }
    if (isSuccess) {
      dispatch(setUser({ name: data.name, token: data.token }));
      toast({
        title: "Logged In",
        description: "Redirect to Dashboard",
        className: "bg-green-300",
      });
      navigate("/dashboard");
    }
  }, [isError, isLoading, isSuccess]);
  return (
    <CardWrapper
      handleFormChange={handleFormChange}
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      //   disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      //   disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <FormError message={error || urlError} /> */}
          {/* <FormSuccess message={success} /> */}
          <Button
            //    disabled={isPending}
            type="submit"
            className="w-full">
            Login
            {/* {showTwoFactor ? "Confirm" : "Login"} */}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
