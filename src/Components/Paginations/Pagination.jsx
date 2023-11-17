import React, { useState } from "react";
import PropTypes from "prop-types";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import clsx from "clsx";

function Pagination(props) {
	return (
		<nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
			<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
				Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span>
			</span>
			<ul className="inline-flex -space-x-px text-sm h-8">
				<li className={clsx(page <= 1 ? "hidden" : "")}>
					<Link
						className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						onClick={() => {
							handlePageChange(page - 1);
						}}
					>
						<AiFillCaretLeft />
					</Link>
				</li>
				{numbersPage.map((iPage, index) => (
					<li key={index}>
						<Link
							className={
								("flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
								page === iPage ? "active" : "")
							}
						>
							{iPage}
						</Link>
					</li>
				))}
				<li className={clsx(page >= totalPages ? "hidden" : "")}>
					<Link
						className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						onClick={() => {
							handlePageChange(page + 1);
						}}
					>
						<AiFillCaretRight />
					</Link>
				</li>
			</ul>
		</nav>
	);
}

Pagination.propTypes = {
	pagination: PropTypes.object.isRequired,
	onPageChange: PropTypes.func,
};

export default Pagination;
