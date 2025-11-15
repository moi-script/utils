
export function optimizeQuery(url) {
    return new URLSearchParams(new URL(url).search);
}

// https://github.com/moi-script/utils.git