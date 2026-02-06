/**
 * this validator for user authentication
 */

export function userAuthValidator(status: number) {
    if (status === 401) {
        // session user habis / refresh token expired
        window.location.href = "/signIn";
        return true;
    }

    return false;
}
