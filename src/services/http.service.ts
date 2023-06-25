import Axios, { AxiosRequestConfig, Method } from "axios";
// import { storageService } from "./storage.service";
// import { createTokens, getCSRF } from "./token.service";

type AxiosOptions = {} | AxiosRequestConfig;

interface HttpsModel {
    get: (endpoint: string, data?: any) => Promise<any>;
    post: (endpoint: string, data?: any, options?: AxiosOptions) => Promise<any>;
    put: (endpoint: string, data?: any) => Promise<any>;
    delete: (endpoint: string, data?: any) => Promise<any>;
}

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const BASE_URL = 'http://localhost:3010/api/';

export var axios = Axios.create({
    withCredentials: true,
    timeout: 10000,
});


export const httpService: HttpsModel = {
    get(endpoint, data) {
        return ajax(endpoint, "GET" as Method, data);
    },
    post(endpoint, data, options) {
        return ajax(endpoint, "POST" as Method, data, options);
    },
    put(endpoint, data) {
        return ajax(endpoint, "PUT" as Method, data);
    },
    delete(endpoint, data) {
        return ajax(endpoint, "DELETE" as Method, data);
    },
};

const ajax = async (
    endpoint: string,
    method = "GET" as Method,
    data = null,
    options = {}
): Promise<any> => {
    //response_language always sent in requests.
    // data = handleResponseLanguage(endpoint, data);

    //if current ajax is csrf_token or create_tokens,
    // const endpointsToSkip = ["csrf_token", "create_tokens", "logout"];
    // const isEndpointToSkip = endpointsToSkip.some((endpointToSkip) =>
    //     endpoint?.includes(endpointToSkip)
    // );
    try {
        const resp = await _ajax(endpoint, method, data, options);
        return resp;
    } catch (error) {
        throw error;
    }

    // const call = () => {
    // return new Promise((res, rej) => {
    //     addToStack(
    //         {
    //             endpoint,
    //             method,
    //             data,
    //             options,
    //         },
    //         res,
    //         rej
    //     );
    // });
    // }

    // return call();
};

// let isOpen = true;
// const stack: any[] = [];

// const addToStack = (data: any, res: any, rej: any) => {
//     stack.push([data, res, rej]);
//     nextAction();
// };

// const nextAction = () => {
//     if (!isOpen) {
//         return;
//     }

//     const next = stack.shift();
//     if (!next) {
//         return;
//     }
//     dispatchAction(next);
// };

// const dispatchAction = async (action: any) => {
//     isOpen = false;
//     const [d, res, rej] = action;

//     const { endpoint, method, data, options } = d;

//     try {
//         const newData = await handleCSRF(endpoint, data);
//         const resp = await _ajax(endpoint, method, newData, options);
//         res(resp);
//     } catch (error: any) {
//         if (isSessionExpired(error?.status_code)) {
//             await createTokens();
//             const newData = await handleCSRF(endpoint, data);
//             const resp = await _ajax(endpoint, method, newData, options);
//             res(resp);
//         } else {
//             rej(error);
//         }
//     }
//     isOpen = true;
//     nextAction();
// };

async function _ajax(
    endpoint: string,
    method = "GET" as Method,
    data = null,
    options = {}
) {
    let error;
    const res = await axios({
        url: `${BASE_URL}${endpoint}`,
        method,
        data,
        params: method === "GET" ? data : null,
        ...options,
    }).catch((e) => {
        error = e?.response?.data;
    });
    return res?.data || error;
}