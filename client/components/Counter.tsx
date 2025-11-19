import { Minus, Plus } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

interface Props {
  count: number,
  setCount: Dispatch<SetStateAction<number>>
}

const Counter = ({ count, setCount }: Props) => {
  const subtract = () => {
    if (count < 1) return
    setCount(count - 1)
  }

  const add = () => {
    setCount(count + 1)
  }

  return (
    <div className="grid grid-cols-3 bg-gray-200 border-1 border-gray-300 rounded-lg py-3 px-4">
      <div className="cursor-pointer flex-center" onClick={subtract}>
        <Minus />
      </div>
      <input 
        type="number" 
        className="focus:outline-none no-spin text-center"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <div className="text-xl cursor-pointer flex-center" onClick={add}>
        <Plus />
      </div>
    </div>
  )
}

export default Counter