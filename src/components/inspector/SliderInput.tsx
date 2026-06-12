import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";

type SliderInputProps = {
  value: number;
  onChange: (value: number) => void;
};

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export const SliderInput = ({ value, onChange }: SliderInputProps) => {
  const update = (rawValue: string) => {
    const nextValue = Number(rawValue);
    if (Number.isFinite(nextValue)) {
      onChange(clamp(nextValue));
    }
  };

  return (
    <div className="slider-input">
      <Slider max={100} min={0} onChange={(event) => update(event.target.value)} value={value} />
      <Input
        max={100}
        min={0}
        onChange={(event) => update(event.target.value)}
        type="number"
        value={value}
      />
    </div>
  );
};
