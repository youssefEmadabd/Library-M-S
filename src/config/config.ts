import path from 'path';

import * as dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema: Joi.AnySchema = Joi.object()
    .keys({
        PORT: Joi.number().required().default(5000),
        NODE_ENV: Joi.string().valid('development', 'production').default('development'),
        JWT_SECRET: Joi.string().required(),
        DB_URL: Joi.string().required()
    })
    .unknown()

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env)

if (error) throw new Error(`Config validation error: ${error.message}`);

export const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    jwt: {
        secret: envVars.JWT_SECRET,
    },
    db:{
        dbUrl: envVars.DB_URL
    }
}