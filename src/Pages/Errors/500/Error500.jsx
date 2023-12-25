import React from "react";
import "./Error500.scss";
import { colors } from "@mui/material";
function Error500() {
	return (
		<main>
			<div id="wrap">
				<div class="hand hand-left">
					<span class="hand-part part-top"></span>
					<span class="hand-part part-middle"></span>
					<span class="hand-part part-bottom"></span>
				</div>
				<div class="hand hand-right">
					<span class="hand-part part-top"></span>
					<span class="hand-part part-middle"></span>
					<span class="hand-part part-bottom"></span>
				</div>
				<div class="line line-1">
					<div class="ball">5</div>
				</div>
				<div class="line line-2">
					<div class="ball">0</div>
				</div>
				<div class="line line-3">
					<div class="ball">0</div>
				</div>
				<div id="server">
					<div class="eye eye-left">
						<span></span>
					</div>
					<div class="eye eye-right">
						<span></span>
					</div>
					<div class="block">
						<div class="light"></div>
					</div>
					<div class="block">
						<div class="light"></div>
					</div>
					<div class="block">
						<div class="light"></div>
					</div>
					<div class="block">
						<div class="light"></div>
					</div>
					<div class="block">
						<div class="light"></div>
					</div>
					<div id="bottom-block">
						<div class="bottom-line"></div>
						<div id="bottom-light"></div>
					</div>
				</div>
			</div>

			<div id="code-error">
				<h2>
					Lỗi máy chủ! <br />
					<span style={{ color: "red" }}>Internal Server Error!!!</span> <br />
					Vui lòng liên hệ bộ phận kỹ thuật để khắc phục!
				</h2>
			</div>
		</main>
	);
}

export default Error500;
