import { Feature } from "@my-solution/shared";

export function compareFeatures(a: Feature | undefined, b: Feature | undefined): boolean {
    let match = true;
    if (a === undefined || b === undefined) {
        match = false;
        return match;
    }
    if (a.id !== b.id) {
        match = false;
    }
    if (a.serverId !== b.serverId) {
        match = false;
    }
    if (a.title !== b.title) {
        match = false;
    }
    if (a.status !== b.status) {
        match = false;
    }
    if (a.rating !== b.rating) {
        match = false;
    }
    if (a.content !== b.content) {
        match = false;
    }
    if (a.author !== b.author) {
        match = false;
    }
    if (a.createdAt !== b.createdAt) {
        match = false;
    }
    if (a.updatedAt !== b.updatedAt) {
        match = false;
    }
    return match;
}