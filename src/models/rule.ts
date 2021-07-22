import { RuleOptionsProperties } from "./ruleOptions";

export interface RuleProperties {
    // this id would be generated from Twitter API which is utilised for deleting Rules
    readonly id?: number;
    // will be generated once it is verified by the Twitter API and could be utilised to deduplicate objects within DB
    readonly twitterGenId?: number;
    // A _id would also be generated from MongoDB which is a object containing a timestamp
    // TODO: unmarshal the object to get this timestamp
    readonly createdAt?: Date;
    readonly keyword?: string;
    readonly emoji?: string;
    readonly mentionedUserId?: string;
    readonly phrase?: string;
    readonly hashtags?: string;
    readonly url?: string;
    readonly fromUser?: string;
    readonly toUser?: string;
    readonly retweetsOfUser?: string;
    readonly context?: string;
    readonly entity?: string;
    readonly conversationId?: string;
    readonly options?: RuleOptionsProperties;
}

export class Rule implements RuleProperties {
    public readonly id?: number;
    public readonly twitterGenId?: number;
    public readonly createdAt?: Date;
    public readonly keyword?: string;
    public readonly emoji?: string;
    public readonly mentionedUserId?: string;
    public readonly phrase?: string;
    public readonly hashtags?: string;
    public readonly url?: string;
    public readonly fromUser?: string;
    public readonly toUser?: string;
    public readonly retweetsOfUser?: string;
    public readonly context?: string;
    public readonly entity?: string;
    public readonly conversationId?: string;
    public readonly options?: RuleOptionsProperties;

    public toProps(): RuleProperties {
        return {
            id: this.id,
            twitterGenId: this.twitterGenId,
            createdAt: this.createdAt,
            keyword: this.keyword,
            emoji: this.emoji,
            mentionedUserId: this.mentionedUserId,
            phrase: this.phrase,
            hashtags: this.hashtags,
            url: this.url,
            fromUser: this.fromUser,
            toUser: this.toUser,
            retweetsOfUser: this.retweetsOfUser,
            context: this.context,
            entity: this.entity,
            conversationId: this.conversationId,
            options: this.options,
        };
    }
}