export const requestHtml = async (url: string): Promise<string> => {
    try {
        const res = await fetch(url);
        if (res && res.status === 200) {
            return await res.text();
        } else {
            throw new Error(`Error while requestiong ${url}`);
        }
    } catch (err) {
        console.error(`RequestHtml Error: ${err}`);
        throw new Error('RequestHtml error thrown');
    } 
}
