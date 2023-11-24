import React from "react";
import { homeMotCua } from "../../../Services/Static/dataStatic.js";
import ModuleItemMotCua from "../../../Components/ModuleItemMotCua/ModuleItemMotCua.jsx";
import SlideMotCua from "./Slides/SlideMotCua.jsx";
import ChartMotCua from "./Charts/ChartMotCua.jsx";

function HomeMotCua() {
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4">
				{homeMotCua.map((moduleItemMotCua, index) => {
					return (
						<React.Fragment key={index}>
							<ModuleItemMotCua moduleItemMotCua={moduleItemMotCua} />
						</React.Fragment>
					);
				})}
			</div>
			<div className="my-5 max-w-7xl">
				<SlideMotCua />
			</div>
			<div className="my-5 rounded-lg">
				<ChartMotCua />
			</div>
		</>
	);
}

export default HomeMotCua;
