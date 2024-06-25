import {MenuItem} from "@/app/_components/header/menu";
import Link from "next/link";
import {ROUTES} from "@/utils/constants";
import betterFetch from "@/utils/fetch";
import {Tag} from "@prisma/client";
import TagLink from "@/app/_components/navbar/tag-link";

async function getTags() {
    const {data} = await betterFetch<Tag[]>("tags");

    return {
        data
    }
}

const NavBar = async () => {
    const {data} = await getTags();

    return (
        <nav className="overflow-x-auto max-w-[90%]">
            <ul className="flex items-center gap-2">
                <MenuItem className="left-0 sticky bg-white z-10 min-w-max flex gap-2" iconName="fi fi-tr-people-roof">
                    <Link href={`${ROUTES.LOCATIONS}?page=1`} className="with-hover-border">Explore the locations</Link>
                    <span>|</span>
                </MenuItem>
                {data?.map(tag =>
                    <li key={tag.id}>
                        <TagLink tag={tag}/>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
