export interface MemeResponse {
    isVideo: boolean;
    nsfw: boolean;
    createdAt: Date;
    url: string;
    ratings: {
        upvote: number;
        downvote: number;
        comments: number;
    };
    subreddit: string;
    title: string;
    link: string;
}

export interface PokemonResponse {
    name: string;
    id: number;
    baseExperience: number;
    height: number;
    weight: number;
    type: string;
    moves: string[];
    stats: string[];
    image: string;
}

export interface DenoResponse {
    registry: string;
    icon: string;
    url: string;
    module: {
        name: string;
        url: string;
        description: string;
        version: string;
        stars: string;
        developer: {
            name: string;
            url: string;
        },
        github: string;
        createdAt: Date;
    }
}

export interface NPMResponse {
    registry: string;
    icon: string;
    url: string;
    runkit: string;
    module: {
        name: string;
        url: string;
        description: string;
        version: string;
        main: string;
        license: string;
        author: string;
        maintainers: string[];
        dependencies: string[];
        repository: {
            type: string;
            url: string;
        };
        banner: string;
    }
}

export interface PypiResponse {
    registry: string;
    icon: string;
    url: string;
    module: {
        name: string;
        description: string;
        url: string;
        version: string;
        author: string;
        updatedAt: Date;
        documentation: string;
        homepage: string;
    }
}

export interface TokenInfo {
    type: string;
    token: string;
    id: string;
    username: string;
    discriminator: string;
    avatar?: string;
    avatarURL: string;
    snowflakeInfo: {
        epoch: number;
        timestamp: number;
        workerID: number;
        processID: number;
        increment: number;
        binary: string;
        date: Date;
        snowflake: string;
    }
}

export interface StatsResponse {
    total_requests: number;
    free_users: number;
    pro_users: number;
    total_users: number;
    banned_users: number;
    os: string;
    processor: {
        model: string;
        count: number;
    },
    memory: {
        heap_total: number;
        heap_used: number;
        rss: number;
        external: number;
        ab: number;
    }
}

export interface MeResponse {
    user: string;
    pro: boolean;
    ratelimits: number;
    banned: boolean;
    requests: string;
    tokenCreatedTimestamp: number;
    createdTimestamp: number;
}

export interface AIChatbotInterface {
    name?: string;
    gender?: string;
    user?: string;
    message: string;
}