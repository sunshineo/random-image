declare module 'text2png' {
	import { Canvas as CanvasLib } from 'canvas';
	type Params = {
		font?: string;
		textAlign?: string;
		color?: string;
		backgroundColor?: string;
		lineSpacing?: number;
		strokeWidth?: number;
		strokeColor?: string;
		padding?: number;
		borderWidth?: number;
		borderColor?: string;
		output?: 'buffer' | 'stream' | 'dataURL' | 'canvas';
	};
	interface ICanvas {
		(title: string, options?: Params): Buffer | string | CanvasLib;
	}
	const Canvas: ICanvas;
	export default Canvas;
}