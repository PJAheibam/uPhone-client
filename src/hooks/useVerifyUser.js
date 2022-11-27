import { useQueryClient, useMutation } from "@tanstack/react-query";
import React from "react";

function useVerifyUser() {
  const client = useQueryClient();

  return useMutation();
}

export default useVerifyUser;
