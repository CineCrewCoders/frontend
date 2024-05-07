import { AxiosError } from "axios";

export const getAxiosErrorMessages = (error: AxiosError): string => {
    const res = error.response?.data as object;
    if (res && "error" in res) {
        return res.error as string
    }
    return `An error occurred: ${(error as AxiosError).message}`;
}