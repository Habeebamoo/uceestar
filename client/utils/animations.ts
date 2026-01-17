import { Variants } from "framer-motion";

const navVariant: Variants = {
  hidden: { x: 100 },
  show: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
}

export { navVariant }