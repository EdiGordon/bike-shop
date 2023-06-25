import { httpService } from "./http.service";
import { storageService } from "./storage.service";



export const authService = {
    login,
    logout,
    register,
    getBikes,
    addNew,
};

async function login(email: string, password: string) {
    try {
        const response = await httpService.post('users/login', {
            email,
            password
        })
        const user = response.user;
        // if (user) user.username = email;
        if (user !== undefined) {
            storageService.setRefreshToken(user?.token);
            // delete user.refresh_token;
            // user.sessionExpirationTs = Date.now() + user.idle_minutes_time;
            storageService.setToLocalStorage("loggedinUser", user);
        }

        return user;
    } catch (error: any) {
        throw error;
    }
}

export interface RegistrationInfo {
    username: string;
    password: string;
    email: string;
}
async function register(registrationInfo: RegistrationInfo) {
    try {
        const response = await httpService.post("users", registrationInfo);
        console.log(response);
        if (response !== undefined) {
            storageService.setRefreshToken(response?.token);
            // delete user.refresh_token;
            // user.sessionExpirationTs = Date.now() + user.idle_minutes_time;
            storageService.setToLocalStorage("loggedinUser", response);
        }

        return response;
    } catch (error: any) {
        throw error;
    }
}

async function logout() {
    try {
        const response = await httpService.post("logout");
        const { status_code } = response;
        if (status_code !== 0) {
            throw response;
        }
        storageService.removeFromLocalStorage("loggedinUser");
        storageService.removeFromLocalStorage("refresh_token");

        return true;
    } catch (error) {
        throw error;
    }
}


export interface BikeDto {
    name: string;
    type: string;
    price: number;
    // file: File;
}

async function addNew(bike: BikeDto, file: File) {
    try {
        const json = JSON.stringify(bike);
        // const blob = new Blob([json], {
        //     type: 'application/json'
        // });
        const data = new FormData();
        data.append("name", bike.name);
        data.append("price", bike.price.toString());

        data.append("type", bike.type);
        data.append("file", file);


        const response = await httpService.post('bikes',
            data
            ,
            {
                "Content-Type": "multipart/form-data",
            });
        const { status_code } = response;
        if (status_code !== 0) {
            throw response;
        }

        return true;
    } catch (error) {
        throw error;
    }
}


export async function getBikes() {
    try {
        const response = await httpService.get('bikes');
        // const { status_code } = response;
        // if (status_code !== 0) {
        //     throw response;
        // }

        return response;
    } catch (error) {
        throw error;
    }
}




