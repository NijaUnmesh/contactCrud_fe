import { BaseUrl } from "./BaseUrl";
import CommonApi from "./CommonApi";

export const getContact = async () => {
  return await CommonApi('GET', `${BaseUrl}/contact`, "");
};

export const createContact = async (reqBody) => {
  // remove { reqBody } wrapper
  return await CommonApi('POST', `${BaseUrl}/contact`, reqBody);
};

export const deleteContact = async (id) => {
  return await CommonApi('DELETE', `${BaseUrl}/contact/${id}`, {});
};

export const editContact = async (id, reqBody) => {
  return await CommonApi('PATCH', `${BaseUrl}/contact/${id}`, reqBody);
};
