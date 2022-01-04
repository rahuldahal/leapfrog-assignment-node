export default function errorHandler(error) {
  const { message, name } = error;
  if (name === 'ValidationError') {
    const errorsOnly = message.split('users validation failed:')[1];
    const errorsArray = errorsOnly.split(',');
    const readableErrors = errorsArray.map((error) =>
      error.split(':')[1].trim()
    );
    return {
      reason: 'clientError',
      errorMessage: readableErrors,
    };
  }
  return { reason: 'serverError', errorMessage: message };
}
