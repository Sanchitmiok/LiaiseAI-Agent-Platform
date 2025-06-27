import { Button } from "@/components/ui/button";

import { ChevronLeft, ChevronRight } from "lucide-react";
interface Props {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const DataPagination = ({
    page,
    totalPages,
    onPageChange
}: Props) => {
    return (
        <div className="flex items-center justify-between">
            <Button
                variant="outline"
                onClick={() => onPageChange(Math.max(page - 1, 1))}
                disabled={page === 1}
            >
                <ChevronLeft className="mr-2" />
                <span className="hidden md:inline">Previous</span>
            </Button>
            <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
            </span>
            <Button
                variant="outline"
                onClick={() => onPageChange(Math.min(page + 1, totalPages))}
                disabled={page === totalPages}
            >
                <span className="hidden md:inline">Next</span>
                <ChevronRight className="ml-2" />
            </Button>
        </div>
    );
};