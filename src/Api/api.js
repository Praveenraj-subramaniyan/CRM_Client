import axios from "axios";
import Cookies from "js-cookie";
const cookieValue = Cookies.get("crm_login");
const loginDataFromCookie = cookieValue ? JSON.parse(cookieValue) : null;
const url = "http://localhost:3000/";

export const LoginAPI = async (loginData) => {
  try {
    const response = await axios.post(url + "login", loginData);
    const responseLoginData = response.data;
    return responseLoginData;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const DashboardAPI = async () => {
  try {
    const response = await axios.post(url + "home", loginDataFromCookie);
    return response.data;
  } catch (error) {
    console.error(error);
    return "login";
  }
};

export const LeadAPI = async () => {
  try {
    const response = await axios.post(url + "leads", loginDataFromCookie);
    return response.data;
  } catch (error) {
    console.error(error);
    return "login";
  }
};

export const CreateLeadAPI = async (create) => {
  try {
   const  payLoad={
      loginDataFromCookie,
      create
    }
    console.log(payLoad)
    const response = await axios.post(url + "leads/create", payLoad);
    return response.data;
  } catch (error) {
    console.error(error);
    return "login";
  }
};

export const EditLeadAPI = async (edit) => {
  const  payLoad={
    loginDataFromCookie,
    edit
  }
  try {
    const response = await axios.post(url + "leads/edit", payLoad);
    return response.data;
  } catch (error) {
    console.error(error);
    return "login";
  }
};

export const StatusLeadAPI = async (id,status) => {
  const  payLoad={
    loginDataFromCookie,
    id,
    status
  }
  console.log(payLoad)
  try {
    const response = await axios.post(url + "leads/status", payLoad);
    return response.data;
  } catch (error) {
    console.error(error);
    return "login";
  }
};

export const ServicesAPI = async () => {
  try {
    const response = await axios.post(url + "Services", loginDataFromCookie);
    return response.data;
  } catch (error) {
    console.error(error);
    return "login";
  }
};

export const CreateServicesAPI = async (create) => {
  try {
   const  payLoad={
      loginDataFromCookie,
      create
    }
    const response = await axios.post(url + "Services/create", payLoad);
    return response.data;
  } catch (error) {
    console.error(error);
    return "login";
  }
};

export const EditServicesAPI = async (edit) => {
  const  payLoad={
    loginDataFromCookie,
    edit
  }
  try {
    const response = await axios.post(url + "Services/edit", payLoad);
    return response.data;
  } catch (error) {
    console.error(error);
    return "login";
  }
};

export const StatusServicesAPI = async (id,status) => {
  const  payLoad={
    loginDataFromCookie,
    id,
    status
  }
  try {
    const response = await axios.post(url + "Services/status", payLoad);
    return response.data;
  } catch (error) {
    console.error(error);
    return "login";
  }
};

