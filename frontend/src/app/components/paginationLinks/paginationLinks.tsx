'use client'

import {FC} from "react";
import classes from "./paginationLinks.module.scss";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

type Props = {
    contentCount?: number,
}

const PaginationLinks: FC<Props> = ({contentCount}) => {
    const searchParams = useSearchParams()

    if (contentCount === undefined) {
        return null
    }

    const pagesCount = Math.ceil(contentCount / 20)
    const queryParamSearch = searchParams.get('page')
    const currentPage = queryParamSearch ? +queryParamSearch : 1

    return (
        <div className={classes.paginationLinks}>
            {currentPage !== 1 && <>
                <Link href={`?page=${currentPage - 1}`} className={classes.paginationLinks__link}>{'<'}</Link>
                <Link href={`?page=${1}`} className={classes.paginationLinks__link}>1</Link>
            </>}
            {currentPage === 4 &&
                <Link href={`?page=${2}`} className={classes.paginationLinks__link}>2</Link>
            }
            {currentPage > 4 &&
                <div className={classes.paginationLinks__disabled}>...</div>
            }
            {currentPage !== 1 && currentPage !== 2 &&
                <Link href={`?page=${currentPage - 1}`} className={classes.paginationLinks__link}>
                    {currentPage - 1}
                </Link>
            }
            <div className={`${classes.paginationLinks__link} ${classes['paginationLinks__link--current']}`}>
                {currentPage}
            </div>
            {currentPage !== pagesCount && currentPage !== pagesCount - 1 &&
                <Link href={`?page=${currentPage + 1}`} className={classes.paginationLinks__link}>
                    {currentPage + 1}
                </Link>
            }
            {currentPage < pagesCount - 3 &&
                <div className={classes.paginationLinks__disabled}>...</div>
            }
            {currentPage === pagesCount - 3 &&
                <Link href={`?page=${pagesCount - 3}`} className={classes.paginationLinks__link}>
                    {pagesCount - 3}
                </Link>
            }
            {currentPage !== pagesCount && <>
                <Link href={`?page=${pagesCount}`} className={classes.paginationLinks__link}>
                    {pagesCount}
                </Link>
                <Link href={`?page=${currentPage + 1}`} className={classes.paginationLinks__link}>{'>'}</Link>
            </>}
        </div>
    );
};

export default PaginationLinks;