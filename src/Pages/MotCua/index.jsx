import React from "react";
import { homeMotCua } from "../../Services/Utils/dataStatic.js";
import ModuleItemMotCua from "../../Components/ModuleItemMotCua/ModuleItemMotCua.jsx";
import SlideMotCua from "./Slides/SlideMotCua.jsx";

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
			<SlideMotCua />
		</>
	);
}

export default HomeMotCua;
