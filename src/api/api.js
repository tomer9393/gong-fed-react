export const BASE_URL = "https://gongfetest.firebaseio.com/";

/** Reset data here: https://9y9r481m5w.codesandbox.io/ */

/**
 * @typedef Employee
 * @property {number|string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} photo
 * @property {number|string} [managerId]
 */

function buildUrl(path) {
  return `${BASE_URL}/${path}.json`;
}

/**
 * @returns {Promise<Array<Employee>>}
 */
export async function fetchAllUsers() {
  const response = await fetch(buildUrl("users"));
  return response.json();
}

/**
 *
 * @param {number} index
 * @param {number|string} id Just to avoid updating the id
 */
export async function updateUser({ index, id, ...updates }) {
  const response = await fetch(buildUrl(`users/${index}`), {
    method: "PATCH",
    body: JSON.stringify(updates)
  });
  return response.json();
}

export async function deleteUser(index) {
  const response = await fetch(buildUrl(`users/${index}`), {
    method: "DELETE"
  });

  return response.json();
}
