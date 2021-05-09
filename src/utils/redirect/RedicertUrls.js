export const home = "/";

export const loginUrl = "/login";
export const registerUrl = "/register";
export const myProfileUrl = "/profile";

export function questionUrl(question) {
    return `/questions/${question.id}`;
}