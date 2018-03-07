import {nodes} from "./emulator/NodeStore";
import {setMaxNodes, shutdown} from "./emulator/Emulator";

export const reset = () => {
    wrapAsync(() => Promise.all(shutdown()))();
    setMaxNodes(1);
    browser.waitUntil(() => nodes.keys().length);
};
