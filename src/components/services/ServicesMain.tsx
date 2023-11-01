import type { Component } from 'solid-js'
import { createSignal, createEffect } from 'solid-js'
import { supabase } from '../../lib/supabaseClient'
import { CategoryCarousel} from './CategoryCarousel'
import { ViewCard } from './ViewCard';
import { LocationFilter } from './LocationFilter';
import { SearchBar } from './SearchBar'
import { ui } from '../../i18n/ui'
import type { uiObject } from '../../i18n/uiType';
import { getLangFromUrl, useTranslations } from "../../i18n/utils";
import * as allFilters from '../posts/fetchPosts';

const lang = getLangFromUrl(new URL(window.location.href));
const t = useTranslations(lang);

//get the categories from the language files so they translate with changes in the language picker
const values = ui[lang] as uiObject
const productCategories = values.productCategoryInfo.categories

const { data: user, error: userError } = await supabase.auth.getSession();
if(userError){
    console.log(userError)
}
if (user.session === null || user.session === undefined) {
    alert(t('messages.signIn'));
    location.href = `/${lang}/login`;
}

const { data, error } = await supabase.from('providerposts').select('*');

data?.map(item => {
    productCategories.forEach(productCategories => {
        if (item.service_category.toString() === productCategories.id) {
            item.category = productCategories.name
        }
    })
    delete item.service_category
})

interface ProviderPost {
    content: string;
    id: number;
    category: string;
    title: string;
    provider_name: string;
    major_municipality: string;
    minor_municipality: string;
    governing_district: string;
    user_id: string;
    image_urls: string;
}

export const ServicesView: Component = () => {
    const [posts, setPosts] = createSignal<Array<ProviderPost>>([])
    const [searchPost, setSearchPost] = createSignal<Array<ProviderPost>>([])
    const [currentPosts, setCurrentPosts] = createSignal<Array<ProviderPost>>([])
    const [filters, setFilters] = createSignal<Array<number>>([])
    const [locationFilters, setLocationFilters] = createSignal<Array<string>>([])
    const [minorLocationFilters, setMinorLocationFilters] = createSignal<Array<string>>([])
    const [governingLocationFilters, setGoverningLocationFilters] = createSignal<Array<string>>([])
    const [searchString, setSearchString] = createSignal<string>("");
    // start the page as displaying all posts
    if (!data) {
        let noPostsMessage = document.getElementById("no-posts-message");
        noPostsMessage?.classList.remove("hidden")

        setPosts([])
        setCurrentPosts([])
    } else {
        setPosts(data)
        setCurrentPosts(data)  
    }

    createEffect(async() => {
        const res = await allFilters.fetchFilteredPosts(filters(), locationFilters(), minorLocationFilters(), governingLocationFilters(), searchString());

        if(res === null || res === undefined) {
            let noPostsMessage = document.getElementById("no-posts-message");
            noPostsMessage?.classList.remove("hidden")

            setPosts([])
            setCurrentPosts([])

            console.error()
        } else if(Object.keys(res).length === 0) {
            let noPostsMessage = document.getElementById("no-posts-message");
            noPostsMessage?.classList.remove("hidden")

            setPosts(res)
            setCurrentPosts(res)
        } else {
            let noPostsMessage = document.getElementById("no-posts-message");
            noPostsMessage?.classList.add("hidden")

            setPosts(res)
        }
    })

    const searchPosts = async (searchText: string) => {
        if(searchText === "") {
            alert(t('messages.noSearchTerm'))
        } else {
            setSearchString(searchText)
        }

        filterPosts();
    }

    const setCategoryFilter = (currentCategory: number) => {

        if (filters().includes(currentCategory)) {
            let currentFilters = filters().filter((el) => el !== currentCategory)
            setFilters(currentFilters)
        } else {
            setFilters([...filters(), currentCategory])
        }

        filterPosts() 
    }

    const filterPosts = async() => {
        if (!data) {
            let noPostsMessage = document.getElementById("no-posts-message");
            noPostsMessage?.classList.remove("hidden")

            setPosts([])
            setCurrentPosts([])
        } else (
            setPosts(data)
        )

        const res = await allFilters.fetchFilteredPosts(filters(), locationFilters(), minorLocationFilters(), governingLocationFilters(), searchString())

        if(res === null || res === undefined) {
            console.error()
        } else {
            res.map(post => {
                productCategories.forEach(productCategory => {
                    if(post.service_category.toString() === productCategory.id) {
                        post.category = productCategory.name
                    }
                })
                delete post.service_category
            })

            setPosts(res)
            setCurrentPosts(res)
        }
    }

    const filterPostsByMajorMunicipality = (location: string) => {
        if (locationFilters().includes(location)) {
            let currentLocationFilters = locationFilters().filter((el) => el !== location)
            setLocationFilters(currentLocationFilters)
        } else {
            setLocationFilters([...locationFilters(), location])
        }

        filterPosts()
    }

    const filterPostsByMinorMunicipality = (location: string) => {
        if (minorLocationFilters().includes(location)) {
            let currentLocationFilters = minorLocationFilters().filter((el) => el !== location)
            setMinorLocationFilters(currentLocationFilters)
        } else {
            setMinorLocationFilters([...minorLocationFilters(), location])
        }

        filterPosts()
    }

    const filterPostsByGoverningDistrict = (location: string) => {
        if (governingLocationFilters().includes(location)) {
            let currentLocationFilters = governingLocationFilters().filter((el) => el !== location)
            setGoverningLocationFilters(currentLocationFilters)
        } else {
            setGoverningLocationFilters([...governingLocationFilters(), location])
        }

        filterPosts()
    }

    const clearAllFilters = () => {
        let searchInput = document.getElementById("search") as HTMLInputElement;
        let selectedCategories = document.querySelectorAll(".selected");
        const majorMuniCheckboxes = document.querySelectorAll("input[type='checkbox'].major-muni") as NodeListOf<HTMLInputElement>;
        const minorMuniCheckboxes = document.querySelectorAll("input[type='checkbox'].minor-muni") as NodeListOf<HTMLInputElement>;
        const districtCheckboxes = document.querySelectorAll("input[type='checkbox'].district") as NodeListOf<HTMLInputElement>;

        if(searchInput.value !== null ) {
            searchInput.value = "";
        }

        selectedCategories.forEach((category) => {
            category.classList.remove("selected");
        })
        
        selectedCategories.forEach((category) => {
            category.classList.remove("selected");
        })
        
        majorMuniCheckboxes.forEach((checkbox) => {
            if(checkbox && checkbox.checked) checkbox.checked = false;
        })

        minorMuniCheckboxes.forEach((checkbox) => {
            if(checkbox && checkbox.checked) checkbox.checked = false;
        })

        districtCheckboxes.forEach((checkbox) => {
            if(checkbox && checkbox.checked) checkbox.checked = false;
        })

        setSearchPost([]);
        setSearchString("");
        setFilters([]);
        setLocationFilters([]);
        setMinorLocationFilters([]);
        setGoverningLocationFilters([]);
        filterPosts();
    }

    const clearServiceCategories = () => {
        let selectedCategories = document.querySelectorAll(".selected");
        
        selectedCategories.forEach((category) => {
            category.classList.remove("selected");
        })
        
        setFilters([]);
        filterPosts();
    }

    const clearMajorMunicipality = () => {
        const majorMuniCheckboxes = document.querySelectorAll("input[type='checkbox'].major-muni") as NodeListOf<HTMLInputElement>;
        
        majorMuniCheckboxes.forEach((checkbox) => {
          if(checkbox && checkbox.checked) checkbox.checked = false;
        })
    
        setLocationFilters([]);
        filterPosts();
    }

    const clearMinorMunicipality = () => {
        const minorMuniCheckboxes = document.querySelectorAll("input[type='checkbox'].minor-muni") as NodeListOf<HTMLInputElement>;
        
        minorMuniCheckboxes.forEach((checkbox) => {
          if(checkbox && checkbox.checked) checkbox.checked = false;
        })
    
        setMinorLocationFilters([]);
        filterPosts();
    }

    const clearDistrict = () => {
        const districtCheckboxes = document.querySelectorAll("input[type='checkbox'].district") as NodeListOf<HTMLInputElement>;
    
        districtCheckboxes.forEach((checkbox) => {
          if(checkbox && checkbox.checked) checkbox.checked = false;
        })

        setGoverningLocationFilters([]);
        filterPosts();
    }

    return (
        <div class=''>
            <div>
                <SearchBar search={searchPosts} />
                {/* <SearchBar search={ searchString } /> */}
            </div>
            
            <div class="clear-filters-btns flex flex-wrap justify-center items-center ">
                <button class="clearBtnRectangle" onclick={ clearAllFilters } aria-label={t('clearFilters.filterButtons.0.ariaLabel')}>
                    <p class="text-xs">{t('clearFilters.filterButtons.0.text')}</p>
                </button>
                
                <button class="clearBtnRectangle" onclick={ clearServiceCategories } aria-label={t('clearFilters.filterButtons.1.ariaLabel')}>
                    <p class="text-xs">{t('clearFilters.filterButtons.1.text')}</p>
                </button>

                <button class="clearBtnRectangle" onclick={ clearMajorMunicipality } aria-label={t('clearFilters.filterButtons.2.ariaLabel')}>
                    <p class="text-xs">{t('clearFilters.filterButtons.2.text')}</p>
                </button>

                <button class="clearBtnRectangle" onclick={ clearMinorMunicipality } aria-label={t('clearFilters.filterButtons.3.ariaLabel')}>
                    <p class="text-xs">{t('clearFilters.filterButtons.3.text')}</p>
                </button>

                <button class="clearBtnRectangle" onclick={ clearDistrict } aria-label={t('clearFilters.filterButtons.4.ariaLabel')}>
                    <p class="text-xs">{t('clearFilters.filterButtons.4.text')}</p>
                </button>
            </div>

            <div>
                <CategoryCarousel
                    filterPosts={setCategoryFilter}
                />
            </div>

            <div class="md:h-full flex flex-col md:flex-row items-center md:items-start ">
                <div class="md:w-48 md:mr-4 w-11/12">
                    <LocationFilter filterPostsByMajorMunicipality={filterPostsByMajorMunicipality} filterPostsByMinorMunicipality={filterPostsByMinorMunicipality} filterPostsByGoverningDistrict={filterPostsByGoverningDistrict} />
                </div>
                
                <div class="md:flex-1 w-11/12 items-center">
                    <div id="no-posts-message" class="hidden">
                        <h1>{ (t('messages.noPosts')) }</h1>
                    </div>
                    <ViewCard posts={currentPosts()} />
                </div>
            </div>
        </div>
    )
}