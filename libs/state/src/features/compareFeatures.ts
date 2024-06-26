import { Feature, compareStringArrays } from "@my-solution/shared";

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
    if (a.key !== b.key) {
        match = false;
    }
    if (a.status !== b.status) {
        match = false;
    }
    if (!compareStringArrays(a.groups, b.groups)) {
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