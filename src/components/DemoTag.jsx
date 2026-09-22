import { FlaskConical } from "lucide-react";

export default function DemoTag({ children = "Demo data — not real patient information" }) {
  return (
    <span className="demo-tag">
      <FlaskConical size={12} />
      {children}
    </span>
  );
}
