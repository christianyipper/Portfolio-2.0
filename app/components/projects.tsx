"use client";

import NotchCardGrid from "./NotchCardGrid";
import motionProjectsData from "../data/motion-projects";
import { toSlug } from "../lib/slug";

export default function Projects() {
    return (
        <NotchCardGrid
            heading="My Projects"
            entries={motionProjectsData}
            keyPrefix="motion"
            hrefFor={(entry) => `/projects/${toSlug(entry.title)}`}
        />
    );
}
