import dotenv from "dotenv";
import joi from "joi";

dotenv.config();

const envSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid("development", "production", "test")
      .required(),
    PORT: joi.number().default(80), // Changed to 80 as per Galxe requirements
    RPC_URL: joi.string().required(),
    AERODROME_ADDRESS: joi.string().required(),
  })
  .unknown();

const { value: env, error } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: env.NODE_ENV,
  port: env.PORT,
  rpcUrl: env.RPC_URL,
  aerodromeAddress: env.AERODROME_ADDRESS,
  fallbackRpcUrls: env.FALLBACK_RPC_URLS?.split(",") || [],
};
