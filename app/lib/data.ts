import { GeneralResultModel, GetUserDataPayload } from "./definitions";

const baseURL = process.env.API_BASE_URL;

const headers = {
  "Content-Type": "application/json",
};

async function postApi(endPoint: string, body: any) {
  try {
    const response = await fetch(`${baseURL}${endPoint}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });

    if (response.ok) {
      return response.json() as Promise<GeneralResultModel>;
    }
    return Promise.reject(response.status);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getUser(payload: GetUserDataPayload) {
  try {
    const result = await postApi("auth/user", payload);
    if (result) return result.value;
  } catch (error) {
    console.error("Error getting user data:", error);
  }
}
