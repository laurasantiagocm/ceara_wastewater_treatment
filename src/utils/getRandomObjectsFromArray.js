const getRandomObjectsFromArray = (array, count) => {
  const result = [];
  const arrayLength = array.length;

  if (count >= arrayLength) {
    // If the count is greater than or equal to the array length, return a copy of the original array
    return array.slice();
  }

  const indices = new Set();

  while (indices.size < count) {
    // Generate a random index within the range of the array length
    const randomIndex = Math.floor(Math.random() * arrayLength);

    // Add the index to the set to ensure uniqueness
    indices.add(randomIndex);
  }

  // Retrieve the objects at the randomly generated indices and store them in the result array
  for (const index of indices) {
    result.push(array[index]);
  }

  return result;
}

export default getRandomObjectsFromArray;