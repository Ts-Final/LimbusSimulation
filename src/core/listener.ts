import {Storage} from "@/core/storage.ts";

export default function Listener (e: KeyboardEvent) {
  const code = e.code
  console.log(code)
  if (code === "KeyS" && e.ctrlKey) {
    e.preventDefault()
    Storage.save()
  } else if (code === "Delete") {
    e.preventDefault()
    Storage.fuck()
  } else if(code==="KeyI") {
    console.timeEnd("I")
    console.time("I")
  }
}