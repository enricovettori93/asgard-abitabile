import {SafeParseReturnType} from "zod";
import {ValidationErrors} from "@/types/common";

export function transformValidationErrors(validationResult: SafeParseReturnType<any, any>): ValidationErrors {
    return validationResult.error?.issues.reduce((acc, issue) => {
        return {
            ...acc,
            [issue.path[0]]: {
                message: issue.message,
                type: issue.code
            }
        }
    }, {}) || {};
}

export function mapDateToStringForInputs(date: Date) {
    return date.toISOString().substring(0, 10);
}
