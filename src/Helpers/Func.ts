export async function base64ToText(base64String): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const text = atob(base64String);
            resolve(text);
        } catch (error) {
            reject(error);
        }
    });
}

export async function textToBase64(text): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const base64String = btoa(text);
            resolve(base64String);
        } catch (error) {
            reject(error);
        }
    });
}

export async function base64ToArray(base64String): Promise<unknown> {
    return new Promise((resolve, reject) => {
        try {
            const text = decodeURIComponent(atob(base64String));
            resolve(JSON.parse(text));
        } catch (error) {
            reject(error);
        }
    });
}

export async function ArrayToBase64<T>(obj: T): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const base64String = btoa(encodeURIComponent(JSON.stringify(obj)));
            resolve(base64String);
        } catch (error) {
            reject(error);
        }
    });
}
