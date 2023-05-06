import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-type": "application/json",
  },
});

class MessageService {
  async getMessages(data) {
    try {
      return await http.get("/chat/", { params: data });
    } catch (error) {}
  }

  async postMessage(data) {
    try {
      return await http.post("/chat/", data);
    } catch (error) {}
  }

  async postLogin(data) {
    try {
      return await http.post("login/", data);
    } catch (error) {
      console.log(`Error in Message Service/postLogin: ${error}`);
    }
  }

  async postRegister(data) {
    try {
      return await http.post("register/", data);
    } catch (error) {
      console.log(`Error in Message Service/postRegister: ${error}`);
    }
  }

  async getContacts(data) {
    try {
      console.log(data)
      return await http.post("/chat/contacts/", data);
    } catch (error) {
      console.log(`Error in Message Service/getContacts: ${error}`);
    }
  }
}
export default new MessageService();
