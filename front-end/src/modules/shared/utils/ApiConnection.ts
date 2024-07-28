import { HttpFactory } from "../services/HttpClientAdapter/HttpClientAdapter";
import { env } from "../validations/envValidation";

export const API = HttpFactory(env.API_BASE_URL);
