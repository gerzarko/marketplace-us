import type { Component } from "solid-js";
import type { Post } from "@lib/types";
import { createSignal, createEffect, onMount, Show } from "solid-js";
import { ViewCard } from "./ViewCard";
import { MobileViewCard } from "./MobileViewCard";
import { FiltersMobile } from "./FiltersMobile";
import { SearchBar } from "./SearchBar";
import { getLangFromUrl, useTranslations } from "../../i18n/utils";
import { useStore } from "@nanostores/solid";
import { windowSize } from "@components/common/WindowSizeStore";
import type { FilterPostsParams } from "@lib/types";

const lang = getLangFromUrl(new URL(window.location.href));
const t = useTranslations(lang);

async function fetchPosts({
    subjectFilters,
    gradeFilters,
    searchString,
    resourceFilters,
    secularFilter,
    listing_status,
    draft_status,
}: FilterPostsParams) {
    const response = await fetch("/api/fetchFilterPosts", {
        method: "POST",
        body: JSON.stringify({
            subjectFilters: subjectFilters,
            gradeFilters: gradeFilters,
            searchString: searchString,
            resourceFilters: resourceFilters,
            secularFilter: secularFilter,
            lang: lang,
            listing_status: listing_status,
            draft_status: draft_status,
        }),
    });
    const data = await response.json();

    return data;
}

export const ResourcesView: Component = () => {
    const [posts, setPosts] = createSignal<Array<Post>>([]);
    const [searchPost, setSearchPost] = createSignal<Array<Post>>([]);
    const [subjectFilters, setSubjectFilters] = createSignal<Array<string>>([]);
    const [gradeFilters, setGradeFilters] = createSignal<Array<string>>([]);
    const [resourceTypesFilters, setResourceTypeFilters] = createSignal<
        Array<string>
    >([]);
    const [resourceFilters, setResourceFilters] = createSignal<Array<string>>(
        []
    );
    const [searchString, setSearchString] = createSignal<string>("");
    const [noPostsVisible, setNoPostsVisible] = createSignal<boolean>(false);
    const [secularFilters, setSecularFilters] = createSignal<boolean>(false);
    const [clearFilters, setClearFilters] = createSignal<boolean>(false);

    const screenSize = useStore(windowSize);

    onMount(async () => {
        const localSubjects = localStorage.getItem("selectedSubjects");
        const localGrades = localStorage.getItem("selectedGrades");
        const localSearch = localStorage.getItem("searchString");
        const localResourceTypes = localStorage.getItem(
            "selectedResourceTypes"
        );
        if (localSubjects !== null && localSubjects) {
            setSubjectFilters([
                ...subjectFilters(),
                ...JSON.parse(localSubjects),
            ]);
        }
        if (localGrades !== null && localGrades) {
            setGradeFilters([...gradeFilters(), ...JSON.parse(localGrades)]);
        }
        if (localSearch !== null && localSearch !== undefined) {
            const searchStringValue = localSearch || "";
            setSearchString(searchStringValue);
        }
        if (localResourceTypes !== null && localResourceTypes) {
            setResourceFilters([
                ...resourceFilters(),
                ...JSON.parse(localResourceTypes),
            ]);
        }
        await filterPosts();
    });

    window.addEventListener("beforeunload", () => {
        localStorage.removeItem("selectedGrades");
        localStorage.removeItem("selectedSubjects");
        localStorage.removeItem("searchString");
        localStorage.removeItem("selectedResourceTypes");
    });

    const searchPosts = async (searchString: string) => {
        if (searchString !== null) {
            setSearchString(searchString);
        }
        filterPosts();
    };

    const setCategoryFilter = (currentCategory: string) => {
        if (subjectFilters().includes(currentCategory)) {
            let currentFilters = subjectFilters().filter(
                (el) => el !== currentCategory
            );
            setSubjectFilters(currentFilters);
        } else {
            setSubjectFilters([...subjectFilters(), currentCategory]);
        }
        filterPosts();
    };

    let timeouts: (string | number | NodeJS.Timeout | undefined)[] = [];

    const filterPosts = async () => {
        console.log("Filtering posts...");
        const noPostsMessage = document.getElementById("no-posts-message");

        const res = await fetchPosts({
            subjectFilters: subjectFilters(),
            gradeFilters: gradeFilters(),
            searchString: searchString(),
            resourceFilters: resourceTypesFilters(),
            secularFilter: secularFilters(),
            lang: lang,
            listing_status: true,
            draft_status: false,
        });

        console.log(res);

        if (
            res.body === null ||
            res.body === undefined ||
            res.body.length < 1
        ) {
            noPostsMessage?.classList.remove("hidden");
            setTimeout(() => {
                noPostsMessage?.classList.add("hidden");
            }, 3000);

            setPosts([]);
            console.error();

            timeouts.push(
                setTimeout(() => {
                    //Clear all filters after the timeout otherwise the message immediately disappears (probably not a perfect solution)
                    clearAllFilters();
                }, 3000)
            );

            let allPosts = await fetchPosts({
                subjectFilters: [],
                gradeFilters: [],
                searchString: "",
                resourceFilters: [],
                secularFilter: false,
                lang: lang,
                listing_status: true,
                draft_status: false,
            });

            setPosts(allPosts);
            console.log(allPosts);
        } else {
            for (let i = 0; i < timeouts.length; i++) {
                clearTimeout(timeouts[i]);
            }

            timeouts = [];

            setPosts(res.body);
        }
    };

    const filterPostsByGrade = (grade: string) => {
        if (gradeFilters().includes(grade)) {
            let currentGradeFilters = gradeFilters().filter(
                (el) => el !== grade
            );
            setGradeFilters(currentGradeFilters);
        } else {
            setGradeFilters([...gradeFilters(), grade]);
        }

        filterPosts();
    };

    const filterPostsByResourceTypes = (type: string) => {
        if (resourceTypesFilters().includes(type)) {
            let currentResourceTypesFilter = resourceTypesFilters().filter(
                (el) => el !== type
            );
            setResourceTypeFilters(currentResourceTypesFilter);
        } else {
            setResourceTypeFilters([...resourceTypesFilters(), type]);
        }

        filterPosts();
    };

    const filterPostsBySecular = (secular: boolean) => {
        setSecularFilters(secular);
        filterPosts();
    };

    const clearAllFilters = () => {
        let searchInput = document.getElementById(
            "headerSearch"
        ) as HTMLInputElement;

        if (searchInput !== null && searchInput.value !== null) {
            searchInput.value = "";
        }

        setClearFilters(true);

        setSearchPost([]);
        setSearchString("");
        setSubjectFilters([]);
        setGradeFilters([]);
        setResourceTypeFilters([]);
        setSecularFilters(false);

        filterPosts();
        setClearFilters(false);
    };

    const clearSubjects = () => {
        setSubjectFilters([]);
        filterPosts();
    };

    const clearGrade = () => {
        setGradeFilters([]);
        filterPosts();
    };

    const clearResourceTypes = () => {
        setResourceTypeFilters([]);
        filterPosts();
    };

    const clearSecular = () => {
        setSecularFilters(false);
        filterPosts();
    };

    return (
        <div class="">
            <div>
                <SearchBar search={searchPosts} clearFilters={clearFilters()} />
                {/* <SearchBar search={ searchString } /> */}
            </div>

            <Show when={screenSize() === "sm"}>
                <FiltersMobile
                    clearSubjects={clearSubjects}
                    clearGrade={clearGrade}
                    clearAllFilters={clearAllFilters}
                    clearFilters={clearFilters()}
                    filterPostsByGrade={filterPostsByGrade}
                    filterPostsBySubject={setCategoryFilter}
                    secularFilter={filterPostsBySecular}
                    clearSecular={clearSecular}
                    filterPostsByResourceTypes={filterPostsByResourceTypes}
                    clearResourceTypes={clearResourceTypes}
                />
            </Show>

            <Show when={screenSize() === "sm"}>
                <div class="mb-2 rounded-lg bg-btn1 py-2 dark:bg-btn1-DM">
                    <h1 class="text-lg text-ptext1-DM dark:text-ptext1">
                        {t("pageTitles.services")}
                    </h1>
                </div>
            </Show>

            <div class="flex w-full flex-col items-center md:h-full md:w-auto md:flex-row md:items-start">
                <Show when={screenSize() !== "sm"}>
                    <FiltersMobile
                        clearSubjects={clearSubjects}
                        clearGrade={clearGrade}
                        clearAllFilters={clearAllFilters}
                        clearFilters={clearFilters()}
                        filterPostsByGrade={filterPostsByGrade}
                        filterPostsBySubject={setCategoryFilter}
                        secularFilter={filterPostsBySecular}
                        clearSecular={clearSecular}
                        clearResourceTypes={clearResourceTypes}
                        filterPostsByResourceTypes={filterPostsByResourceTypes}
                    />
                </Show>

                <div class="w-11/12 items-center md:w-8/12 md:flex-1">
                    <div
                        id="no-posts-message"
                        class="my-1 hidden rounded bg-btn1 py-2 dark:bg-btn1-DM"
                    >
                        <h1 class="text-btn1Text dark:text-btn1Text-DM">
                            {t("messages.noPostsSearch")}
                        </h1>
                    </div>
                    <Show when={screenSize() !== "sm"}>
                        <div class="mb-2 flex w-full items-center justify-center rounded-lg bg-btn1 opacity-80 dark:bg-btn1-DM md:h-24">
                            <h1 class="text-center text-lg text-ptext1-DM dark:text-ptext1 md:text-3xl">
                                {t("pageTitles.services")}
                            </h1>
                        </div>
                    </Show>
                    <Show when={screenSize() !== "sm"}>
                        <div class="inline">
                            <ViewCard posts={posts()} />
                        </div>
                    </Show>
                    <Show when={screenSize() === "sm"}>
                        <div class="flex justify-center">
                            <MobileViewCard lang={lang} posts={posts()} />
                        </div>
                    </Show>
                </div>
            </div>
        </div>
    );
};
