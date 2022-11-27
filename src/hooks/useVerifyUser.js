import { useQueryClient, useMutation } from "@tanstack/react-query";
import React from "react";

function useupdateUser() {
  const client = useQueryClient();

  return useMutation();
}

export default useupdateUser;
