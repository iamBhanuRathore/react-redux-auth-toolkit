"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
// import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  handleFormChange: () => void;
  className?: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  handleFormChange,
  className,
}: CardWrapperProps) => {
  return (
    <Card className={cn("w-[400px] shadow-md", className)}>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={handleFormChange} />
      </CardFooter>
    </Card>
  );
};
