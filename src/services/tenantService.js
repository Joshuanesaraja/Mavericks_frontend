const DEFAULT_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function getTenantApiUrl(subdomain) {
    if (!subdomain) {
        return DEFAULT_API_BASE_URL;
    }

    const url = new URL(DEFAULT_API_BASE_URL);

    if (url.hostname === "localhost") {
        url.hostname = `${subdomain}.localhost`;
    } else {
        url.hostname = `${subdomain}.${url.hostname}`;
    }

    return url.toString().replace(/\/$/, "");
}

const tenantService = {
    getTenantApiUrl
};

export default tenantService;