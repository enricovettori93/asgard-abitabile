import {SafeParseReturnType} from "zod";

export function transformValidationErrors(validationResult: SafeParseReturnType<any, any>) {
    return Object.fromEntries(
        validationResult.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
    );
}

export function mapDateToStringForInputs(date: Date) {
    return date.toISOString().substring(0, 10);
}
