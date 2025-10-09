import { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'

export function handleServerError(error: unknown) {
  // eslint-disable-next-line no-console
  console.log(error)

  let errMsg = 'Something went wrong!'

  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    Number(error.status) === 204
  ) {
    errMsg = 'Content not found.'
  }

  if (error instanceof AxiosError) {
    errMsg = error.response?.data.title
  }

  toast({ variant: 'destructive', title: errMsg })
}

// utils/auth.ts
export const isTokenExpired = (token: string): boolean => {
  try {
    const payloadBase64 = token.split(".")[1];
    const decoded = JSON.parse(atob(payloadBase64));

    if (!decoded.exp) return true; // no expiry means invalid

    const expiry = decoded.exp * 1000; // exp is in seconds
    return Date.now() > expiry;
  } catch (err) {
    return true; // if decoding fails, treat as expired
  }
};

