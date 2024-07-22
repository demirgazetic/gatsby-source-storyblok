import type { SbGatsbyStory, StoryblokBridgeConfigV2 } from '../types';
export declare const useStoryblokBridge: (id: Number, cb: (newStory: any) => void, options?: StoryblokBridgeConfigV2) => void;
export declare function useStoryblokState(originalStory: SbGatsbyStory, bridgeOptions?: StoryblokBridgeConfigV2): SbGatsbyStory;
export { useStoryblokBridge as registerStoryblokBridge };
