import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// The About content lives on the main dashboard (per the project brief).
// This route scrolls a visitor straight to that section.
export default function About() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/#about", { replace: true });
    setTimeout(() => {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [navigate]);
  return null;
}
