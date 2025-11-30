

import { useMutation } from "@tanstack/react-query";
import { createProperty } from "@/utils/admin-client";

export function useCreateProperty() {
  return useMutation({
    mutationFn: createProperty,
  });
}
