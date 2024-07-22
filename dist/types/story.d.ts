import React from "react";
import { SbGatsbyStory, StoryblokBridgeConfigV2 } from "./types";
interface StoryblokStoryProps {
    story: SbGatsbyStory;
    bridgeOptions: StoryblokBridgeConfigV2;
    [key: string]: unknown;
}
declare const StoryblokStory: React.ForwardRefExoticComponent<Omit<StoryblokStoryProps, "ref"> & React.RefAttributes<HTMLElement>>;
export default StoryblokStory;
