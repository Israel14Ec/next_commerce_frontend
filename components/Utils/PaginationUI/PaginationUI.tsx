"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { MouseEvent } from "react"
import { Pagination, PaginationProps } from "semantic-ui-react"
import styles from "./Pagination.module.scss"

type PaginationUIProps = {
  totalPages:number
}

export function PaginationUI({totalPages} : PaginationUIProps) {
  
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onPageChange = (_:MouseEvent<HTMLAnchorElement>, data: PaginationProps) => {
    const { activePage } = data
    const params = new URLSearchParams(searchParams)
    params.set('page', activePage!.toString()); // Cambia el valor de 'page'
    router.replace(`${pathname}?${params}`, {scroll: false})
  }

  return (
    <div className={styles.container}>
      <Pagination 
        totalPages={totalPages}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        onPageChange={onPageChange}
      />
    </div>
  )
}
