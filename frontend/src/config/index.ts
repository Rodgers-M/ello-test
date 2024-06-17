import Joi from "joi";

const envVariablesSchema = Joi.object({
  VITE_APP_BOOK_SERVER_URL: Joi.string().required(),
})
  .unknown()
  .required();

type AppConfig = {
  bookServerUrl: string;
};

export function getConfig(): AppConfig {
  // validate the env variables before starting the app
  const { error, value: validatedVariables } = envVariablesSchema.validate(
    import.meta.env,
  );
  if (error) throw new Error(`config validation error: ${error}`);
  const config: AppConfig = {
    bookServerUrl: validatedVariables.VITE_APP_BOOK_SERVER_URL,
  };

  return config;
}
