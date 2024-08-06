function parseIsFavourite(maybeIsFavourite) {
  if (typeof maybeIsFavourite === 'string') {
    return maybeIsFavourite.toLowerCase() === 'true';
  }

  return undefined;
}

function parseContactType(maybeContactType) {
  if (typeof maybeContactType !== 'string') {
    return undefined;
  }

  return maybeContactType;
}

export function parseFilterParams(query) {
  const { isFavourite, contactType } = query;

  const parsedIsFavourite = parseIsFavourite(isFavourite);
  const parsedContactType = parseContactType(contactType);

  const filter = {};

  if (typeof parsedIsFavourite !== 'undefined') {
    filter.isFavourite = parsedIsFavourite;
  }

  if (parsedContactType) {
    filter.contactType = parsedContactType;
  }

  return filter;
}
