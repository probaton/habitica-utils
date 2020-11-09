import callHabApi from "../requests/callHabitica";

export async function toDo(message: string): Promise<string> {
    if (!message) {
        return "To-do message is required";
    }
    const json = {
        text: message, 
        type: "todo",
        priority: "1.5",
    }
    await callHabApi("post", "/api/v3/tasks/user", { json, errorMessage: "Failed to post to-do" });
    return "To-do posted";
}

export async function fppTestToDo(jiraNumber: number) {
    return toDo(`[Test FPP-${jiraNumber}](https://jira.homeadvisor.com/browse/FPS-${jiraNumber})`);
}
