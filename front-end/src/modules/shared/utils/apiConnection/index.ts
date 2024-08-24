import { httpFactory } from "../../services/httpClientAdapter";
import { env } from "../../validations/envValidation";

export const API = httpFactory(env.API_BASE_URL);
