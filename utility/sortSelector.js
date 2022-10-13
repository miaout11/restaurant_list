function sortSelector (sort) {
  switch (sort) {
    case 'a-z':
      return { name: 'asc' }
    case 'z-a':
      return { name: 'desc' }
    case 'category':
      return { category: 'asc' }
    case 'location':
      return { location: 'asc' }
    case 'rating':
      return { rating: 'desc' }
  }
}

module.exports = sortSelector
