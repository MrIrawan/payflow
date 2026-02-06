/**
 * this validator for admin authentication
 */

export function adminAuthValidator(status: number) {
    if (status === 401) {
        // session admin habis
        window.location.href = "/admin/login";
        return true;
    }

    return false;
}
