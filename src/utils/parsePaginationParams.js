export function parseNumber(maybeNumber, defaultValue) {
  if (typeof maybeNumber !== 'string') {
    return defaultValue;
  }

  const parsedNumber = parseInt(maybeNumber, 10);

  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }

  return parsedNumber;
}

export function parsePaginationParams(query) {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  console.log(parsedPage, parsedPerPage);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
}
