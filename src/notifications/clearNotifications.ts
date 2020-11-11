import callHabitica from "../requests/callHabitica";
import { getUserData } from "../userData/userData";

export default async function clearNotifications() {
    const userData = await getUserData();
    return userData
        .notifications
        .filter(note => note.type == "NEW_CHAT_MESSAGE")
        .map(note => note.id)
        .forEach(id => callHabitica("post", `/api/v3/notifications/${id}/read`, { errorMessage: "Failed to clear notifications" }));
}
