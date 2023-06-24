import { addNewFile, addNewFolder } from "@/services/redux/reducers/file-explorer-reducer"
import { useAppDispatch } from "@/services/redux/store"
import { FilePlus, FolderPlus } from "lucide-react"

import { IconButton } from "@/components/ui/icon-button"

export const SidebarAdd = () => {
  const dispatch = useAppDispatch()

  return (
    <div className="flex h-10 items-center gap-2 border-b border-stroke-base">
      <IconButton
        variant="ghost"
        onClick={() => {
          dispatch(addNewFile({ parentId: null, title: "Untitled" }))
        }}
      >
        <FilePlus className="h-5 w-5 text-shade-seondary" />
      </IconButton>

      <IconButton
        variant="ghost"
        onClick={() => {
          dispatch(addNewFolder({ parentId: null, title: "Untitled" }))
        }}
      >
        <FolderPlus className="h-5 w-5 text-shade-seondary" />
      </IconButton>
    </div>
  )
}