import React, { Fragment } from "react";
import { User, UserMetrics, MatchingRule, Tweet, PublicMetrics } from "../models/tweet"
import { ReplyIcon, HeartIcon } from "@heroicons/react/solid";
import { useGetTweetsQuery } from "../services/api";

const RenderUserMetrics = ({ metrics } : { metrics : UserMetrics | undefined}) => {
    if (!metrics) {
        return null;
    }
    return (
        <div className="text-sm text-gray-500">
            <span className="pr-2">{metrics.followingCount} following</span>
            <span className="pr-2">{metrics.followersCount} followers</span>
            <span className="pr-2">{metrics.tweetCount} tweets</span>
        </div>
    );
}

const RenderUser = ({ author } : { author: User | undefined }) => {
    return (
        <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
                <img className="h-10 w-10 rounded-full" src={author?.profileImageUrl} alt="" />
            </div>
            <div className="ml-4">
                <div className="text-sm font-medium text-gray-900 whitespace-pre-line">
                    <span className="pr-2">{author?.name}</span>
                    {author && author.createdAt 
                        ? 
                        <span>Joined {new Date(author.createdAt).toDateString()}</span>
                        :
                        undefined
                    }
                </div>
                <RenderUserMetrics metrics={author?.metrics} />
            </div>
        </div>
    );
}

const RenderMatchingRules = ({ matchingRules } : { matchingRules: ReadonlyArray<MatchingRule> | undefined }) => {
    if (!matchingRules || !matchingRules.length) {
        return null;
    }
    return (
        <Fragment>
            {matchingRules.map(rule => (
                <span key={rule.id} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 whitespace-nowrap">
                    {rule.tag}
                </span>
            ))}
        </Fragment>
    );
}

const RenderHashtags = ({ hashtags } : { hashtags : ReadonlyArray<string> | undefined}) => {
    if (!hashtags || !hashtags.length) {
        return null;
    }
    return (
        <Fragment>
            {hashtags.map(hashtag => (
                <span key={hashtag} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 whitespace-nowrap">
                    {hashtag}
                </span>
            ))}
        </Fragment>
    )
}

const RenderMentionedUsers = ( { mentionedUsers } : { mentionedUsers: ReadonlyArray<User> | undefined}) => {
    if (!mentionedUsers || !mentionedUsers.length) {
        return null;
    }
    return (
        <Fragment>
            {mentionedUsers.map(user => (
                <span key={user.id} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 whitespace-nowrap">
                    {user.name}
                </span>
            ))}
        </Fragment>
    )
}

const RenderPublicMetrics = ( { metrics } : { metrics: PublicMetrics | undefined}) => {
    if (!metrics) {
        return null;
    }
    return (
        <div className="flex">
            {metrics.retweetCount > 0 
                ? 
                <div className="inline-flex items-center text-sm px-1">
                    <ReplyIcon className="h-4 w-4 mr-1" /> 
                    <span>{metrics.retweetCount}</span>
                </div> 
                : undefined
            }
            {metrics.replyCount > 0 
                ?
                <div className="inline-flex items-center text-sm px-1">
                    <ReplyIcon className="h-4 w-4" />
                    <span>{metrics.replyCount}</span>
                </div>
                : undefined
            }
            {metrics.likeCount > 0 
                ?
                <div className="inline-flex items-center text-sm px-1">
                    <HeartIcon className="h-4 w-4" />
                    <span>{metrics.likeCount}</span>
                </div>
                : undefined
            }
        </div>
    )
}

const RenderTableHeader = () => {
    return (
        <Fragment>
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Text
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Matching Rules
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hashtags
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mentioned Users
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metrics
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Source
                    </th>
                </tr>
            </thead>
        </Fragment>
    );
}

const RenderTableBody = ( { tweets }: { tweets: ReadonlyArray<Tweet> | undefined }) => {
    if (!tweets || !tweets.length) {
        return null;
    }
    return (
        <Fragment>
            <tbody className="bg-white divide-y divide-gray-200">
                {tweets.map((tweet) => (
                    <tr key={tweet.id}>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <RenderUser author={tweet.author} />
                        </td>
                        <td className="px-4 py-4 whitespace-normal">
                            <div className="text-sm text-gray-900">{tweet.text}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-normal">
                            <RenderMatchingRules matchingRules={tweet.matchingRules} />
                        </td>
                        <td className="px-4 py-4 whitespace-normal">
                            <RenderHashtags hashtags={tweet.entities?.hashtags} />
                        </td>
                        <td className="px-4 py-4 whitespace-normal">
                            <RenderMentionedUsers mentionedUsers={tweet.mentionedUsers} />
                        </td>
                        <td className="px-4 py-4 whitespace-normal">
                            <RenderPublicMetrics metrics={tweet.publicMetrics} />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {tweet.source}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Fragment>
    );
}

const TweetsList = () => {
    const { data: tweets, isLoading } = useGetTweetsQuery()
    return (
        <Fragment>
            {!tweets ? <div>No Tweets !</div> : undefined}
            <div className="flex flex-col my-4">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <RenderTableHeader />
                                <RenderTableBody tweets={tweets} />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading ? 'Loading' : null}
        </Fragment>
    );
}

export default TweetsList
