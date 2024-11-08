import { useParams, useMatches } from '@remix-run/react';
import React from 'react';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "#app/components/ui/breadcrumb";
import { docsNavigation } from "#app/utils/docs/docs-nav.js";

const DocsBreadcrumb = () => {
    const params = useParams();
    const slug = params.slug;

    // Find the current page in the navigation
    const currentPage = React.useMemo(() => {
        let section;
        let item;

        for (const navSection of docsNavigation.navMain) {
            const foundItem = navSection.items.find(
                navItem => navItem.url === slug || navItem.url === `/${slug}`
            );
            if (foundItem) {
                section = navSection;
                item = foundItem;
                break;
            }
        }

        return { section, item };
    }, [slug]);

    if (!currentPage.section || !currentPage.item) {
        return null;
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink 
                        href={`/engine/${currentPage.section.url}`}
                    >
                        {currentPage.section.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                    <BreadcrumbPage>{currentPage.item.title}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default DocsBreadcrumb;