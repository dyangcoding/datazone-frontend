import { Status } from "../app/store";
import { TweetProperties } from "../models/tweet";
import { Action, ActionType } from "./actions";

interface TweetState {
    readonly value: ReadonlyArray<TweetProperties>,
    readonly loading: Status,
    readonly error: string | undefined,
};

const initialState: TweetState = {
    value: [] as TweetProperties[],
    loading: "idle",
    error: undefined
};

export function tweetReducer(state: TweetState = initialState, action: Action): TweetState {
    switch (action.type) {
        case ActionType.LoadTweetsStartedAction:
            return {
                ...state,
                loading: "loading"
            }
        case ActionType.LoadTweetsCompletedAction:
            const uniqueTweets = Array.from(new Set(action.tweets.concat(state.value)));
            return {
                ...state,
                loading: "completed",
                value: uniqueTweets
            }
        case ActionType.LoadTweetsFailedAction:
            return {
                ...state,
                loading: "failed",
                error: action.error.message
            }
        default:
            return state;
    }
}