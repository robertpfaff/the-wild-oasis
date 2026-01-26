import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Success! Account created! Please verify the new account from the user's email address."
      );
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error creating account. Please try again.");
    },
  });

  return { signup, isPending };
}