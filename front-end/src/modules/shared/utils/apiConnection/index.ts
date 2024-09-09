import { httpFactory } from "../../services/httpClientAdapter";
import { env } from "../../validations/envValidation";

// Conexão com a API
export const API = httpFactory(env.API_BASE_URL);
