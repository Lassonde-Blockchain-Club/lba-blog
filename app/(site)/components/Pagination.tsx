"use client";
import React, { useState } from "react";

interface PaginationProps {
  currentPage: number;
  numTotalPages: number;
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage,  numTotalPages, onChangePage }) => {
  const pages = Array.from({ length:  numTotalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-x-4 text-base">  
       {currentPage > 1 && 
        <button onClick={() => onChangePage(currentPage - 1)}> Prev </button>
        }{pages.map((page) => {
        let buttonClasses = "";
        if (currentPage === page) {
            buttonClasses = "active text-blue-300";
        }
        return (
            <button key={page} onClick={() => onChangePage(page)} className={buttonClasses}>{page} </button>
        );
        })}
       {currentPage <  numTotalPages && 
        <button onClick={() => onChangePage(currentPage + 1)} > Next </button>
        }
    </div>
  );
};

export default Pagination;

