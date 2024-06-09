"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
// if you have a client component which is a child of a form that is using server action, so you have a server component which is firing off a server action...if inside of your form you have a child component which for example in this case is submit button then you can tap into something  useFormStatus and through this we can check whether form is pending (the status when we are submitting, when form is submitted then it comes back as false  )
function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={disabled || pending}
      className="bg-blue-500 hover:bg-blue-600 w-full lg:w-fit"
    >
      {pending ? "Translating..." : "Translate"}
    </Button>
  );
}

export default SubmitButton;
