import { Control, Controller } from "react-hook-form";

type HFInputProps = {
  name: string;
  label: string;
  error: string | undefined;
  multiline?: number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
};

export const HFInput: React.FC<HFInputProps> = ({ name, error, control }) => {
  return (
    
  );
};
