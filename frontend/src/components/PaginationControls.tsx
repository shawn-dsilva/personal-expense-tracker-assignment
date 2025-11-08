import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ITEM_COUNT_PER_PAGE = 4;

const PaginationControls = ({ transactions, currPage, setCurrPage }) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Button variant="outline" onClick={() => setCurrPage((prev) => Math.max(prev - 1, 1))} disabled={!transactions.previous}>
                        <ChevronLeft />
                        Prev
                    </Button>
                </PaginationItem>
                {
                    Array.from({ length: Math.ceil(transactions.count / ITEM_COUNT_PER_PAGE) }, (_, index) => index).map((_, index) => (
                        <PaginationItem key={index}>
                            <Button variant="outline" className={currPage === index + 1 ? 'bg-blue-500 text-white' : ""} onClick={() => setCurrPage(index + 1)}>
                                {index + 1}
                            </Button>
                        </PaginationItem>
                    ))
                }
                <PaginationItem>
                    <Button variant="outline" onClick={() => transactions.next && setCurrPage((prev) => prev + 1)} disabled={!transactions.next}>
                        Next
                        <ChevronRight />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationControls