"use client";

import NotchCardGrid from "./NotchCardGrid";
import photoGalleries from "../data/photos";
import { toSlug } from "../lib/slug";

export default function Photos() {
    return (
        <NotchCardGrid
            heading="Photo Gallery"
            entries={photoGalleries}
            keyPrefix="photo"
            hrefFor={(entry) => `/photos/${toSlug(entry.title)}`}
        />
    );
}
