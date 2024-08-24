import { HttpFactory } from "@/modules/shared/services/httpClientAdapter";
import { env } from "../../validations/envValidation";

export const API = HttpFactory(env.API_BASE_URL);
