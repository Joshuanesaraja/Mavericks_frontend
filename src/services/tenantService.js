const DEFAULT_API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL;

export function getTenantSubdomain() {
    const hostname = window.location.hostname;

    // Landing application
    if (
        hostname === "localhost" ||
        hostname === "127.0.0.1"
    ) {
        return null;
    }

    // Local development:
    // testhospital.localhost
    if (hostname.endsWith(".localhost")) {
        return hostname.split(".")[0];
    }

    // Production:
    // testhospital.heal.com
    const parts = hostname.split(".");

    if (parts.length >= 3) {
        return parts[0];
    }

    return null;
}

export function getTenantApiUrl() {
    const subdomain = getTenantSubdomain();

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
    getTenantSubdomain,
    getTenantApiUrl
};

export default tenantService;