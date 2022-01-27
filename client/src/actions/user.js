import axios from "axios";
import {API_URL} from "../config";

export const registration = async (form, history) => {
    try {
        await axios.post(`${API_URL}api/auth/registration`, {...form}, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => console.log(res))

        history('/')

    } catch (e) {
        console.log(e)
    }
}

export const authorization = async (form, login) => {
    try {
        await axios.post(`${API_URL}api/auth/login`, {...form}, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => login(res.data.token, res.data.userId))
    } catch (e) {
        console.log(e)
    }
}
