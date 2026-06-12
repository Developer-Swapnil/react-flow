import type { InputHTMLAttributes } from "react";

type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const Slider = (props: SliderProps) => <input className="slider" type="range" {...props} />;
