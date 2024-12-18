export const PAGE_SIZE = 10;

export const CUSTOM_HEADERS = {
    X_TOTAL_COUNT: "X-Total-Count"
}

export const ADULTS_PER_NIGHT = {
    MIN: 1,
    MAX: 20
}

export const ROUTES = {
    HOME: "/",
    AUTH: "/auth",
    MY_ACCOUNT: "/account/me",
    MY_LOCATIONS: "/account/locations",
    MY_RESERVATIONS: "/account/reservations",
    ADD_LOCATION: "/account/locations/add",
    LOCATIONS: "/locations"
}

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpeg", "image/webp"];

export const SEARCH_BASE_URI = "https://nominatim.openstreetmap.org";
export const SEARCH_COUNTRY_CODES = ["IT"].join(",");
export const SEARCH_RADIUS = 0.5;
export const QUERY_CLIENT_KEYS = {
    MY_RESERVATIONS: "my-reservations",
    MY_RESERVATIONS_DETAIL: "my-reservations-detail",
    MY_LOCATIONS: "my-locations",
    TAGS: "tags",
    LINK_TAG: "link-tag",
    LINK_TAGS: "link-tags",
    UNLINK_TAG: "unlink-tag"
}
