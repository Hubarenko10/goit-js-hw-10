export const fetchCountries = name => {("https://restcountries.com/v3.1/name/{name}")
    .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .catch(error => {
    // Error handling
  });
}