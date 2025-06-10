// useCOTC.tsx - React hook to manage and validate COTC contracts against schema.

import { useState, useEffect } from 'react';
import Ajv, { JSONSchemaType } from 'ajv';
import cotcSchema from './cotc.schema.comprehensive.v1.json';

const ajv = new Ajv();

export const useCOTC = (contract: any) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const validate = ajv.compile(cotcSchema as JSONSchemaType<any>);
    const valid = validate(contract);

    setIsValid(valid as boolean);
    setErrors(validate.errors ? validate.errors.map(e => e.message || '') : []);
  }, [contract]);

  return { isValid, errors };
};
