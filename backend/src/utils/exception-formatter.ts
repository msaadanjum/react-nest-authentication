import { ValidationError } from "@nestjs/common";


function findErrorRecursively(error: ValidationError) {
    const errorMessages = {};
    if (error.constraints) {
        errorMessages[error.property] = Object.values(error?.constraints).join('. ').trim().replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()
    } else if (error?.children && error?.children.length) {
        error?.children.forEach(err => {
            errorMessages[error.property] = findErrorRecursively(err)
        })
    }
    return errorMessages;
}

export function formatValidationError(errors: ValidationError[]) {

    let errorMessages = {};
    try {
        errors.forEach(error => {
            errorMessages = findErrorRecursively(error)
        });
    } catch (exceptions) {
        console.error('exceptions :>> ', exceptions);
    }
    return errorMessages
}
