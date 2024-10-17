import { API } from "../../utils/apiConnection";

import type { Tokens } from "@/modules/auth/pages/SignIn/types";
import type { HttpResponse } from "../httpClientAdapter/interfaces/IHttpClientAdapter";

// Responsável por fazer o refresh do token
export const refreshToken = async (
  refreshToken: string
): Promise<HttpResponse<Tokens>> => {
  const response = await API.request<Tokens>({
    method: "POST",
    path: "/auth/refreshToken",
    body: JSON.stringify({
      refreshToken: refreshToken,
    }),
    cache: "no-store",
  });

  return response;
};
