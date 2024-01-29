import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href: () => void;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button
      onClick={href}
      variant="link"
      className="font-normal w-full"
      size="sm">
      {label}
    </Button>
  );
};
