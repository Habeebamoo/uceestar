import { Loader } from "lucide-react"

const Loading = () => {
  return (
    <div className="fixed z-40 top-0 bottom-0 left-0 right-0 flex-center bg-black/70">
      <Loader 
        size={40} 
        color="white" 
        className="animate-spin" 
      />
    </div>
  )
}

export default Loading