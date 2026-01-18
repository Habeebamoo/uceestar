import { Variants } from "framer-motion";

const navVariant: Variants = {
  hidden: { opacity: 0, x: 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
}

export { navVariant }