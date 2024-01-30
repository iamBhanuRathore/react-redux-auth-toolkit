import { useForm } from "react-hook-form";
import { CardWrapper } from "./auth/card-wrapper";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRegisterUserMutation } from "@/service/authApi";
import { useEffect } from "react";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "@/features/authSlice";

export const RegisterSchema = z.object({
  firstName: z.string().min(1, {
    message: "firstName is required",
  }),
  lastName: z.string().min(1, {
    message: "lastName is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  confirmPassword: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});
const RegisterForm = ({
  handleFormChange,
}: {
  handleFormChange: () => void;
}) => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
    },
  });
  const [registerUser, { data, isError, isLoading, isSuccess }] =
    useRegisterUserMutation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    console.log(values);
    await registerUser(values);
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
      className="w-[600px]"
      backButtonLabel="Already have a account?">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      //   disabled={isPending}
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      //   disabled={isPending}
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-2">
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
            <FormField
              control={form.control}
              name="confirmPassword"
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
          {/* <FormError message={error} /> */}
          {/* <FormSuccess message={success} /> */}
          <Button
            // disabled={isPending}
            type="submit"
            className="w-full">
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
