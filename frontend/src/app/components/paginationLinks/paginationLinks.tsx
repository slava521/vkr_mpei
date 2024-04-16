'use client'

import {FC} from "react";

import Link from "next/link";
import {useSearchParams} from "next/navigation";

import classes from "./paginationLinks.module.scss";

type Props = {
    contentCount?: number,
}

const PaginationLinks: FC<Props> = ({contentCount}) => {
    const searchParams = useSearchParams()

    if (contentCount === undefined || contentCount === 0) {
        return null
    }

    const pagesCount = Math.ceil(contentCount / 20)
    const queryParamSearch = searchParams.get('page')
    const currentPage = queryParamSearch ? +queryParamSearch : 1

    const newParams = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page + '')
        return '?'+params.toString()
    }

    return (
        <div className={classes.paginationLinks}>
            {currentPage !== 1 && <>
                <Link href={newParams(currentPage - 1)} className={classes.paginationLinks__link}>{'<'}</Link>
                <Link href={newParams(1)} className={classes.paginationLinks__link}>1</Link>
            </>}
            {currentPage === 4 &&
                <Link href={newParams(2)} className={classes.paginationLinks__link}>2</Link>
            }
            {currentPage > 4 &&
                <div className={classes.paginationLinks__disabled}>...</div>
            }
            {currentPage !== 1 && currentPage !== 2 &&
                <Link href={newParams(currentPage - 1)} className={classes.paginationLinks__link}>
                    {currentPage - 1}
                </Link>
            }
            <div className={`${classes.paginationLinks__link} ${classes['paginationLinks__link--current']}`}>
                {currentPage}
            </div>
            {currentPage !== pagesCount && currentPage !== pagesCount - 1 &&
                <Link href={newParams(currentPage + 1)} className={classes.paginationLinks__link}>
                    {currentPage + 1}
                </Link>
            }
            {currentPage < pagesCount - 3 &&
                <div className={classes.paginationLinks__disabled}>...</div>
            }
            {currentPage === pagesCount - 3 &&
                <Link href={newParams(pagesCount - 3)} className={classes.paginationLinks__link}>
                    {pagesCount - 3}
                </Link>
            }
            {currentPage !== pagesCount && <>
                <Link href={newParams(pagesCount)} className={classes.paginationLinks__link}>
                    {pagesCount}
                </Link>
                <Link href={newParams(currentPage + 1)} className={classes.paginationLinks__link}>{'>'}</Link>
            </>}
        </div>
    );
};

export default PaginationLinks;
