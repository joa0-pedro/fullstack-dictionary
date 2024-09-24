"use client"

import DropdownIconMenu from "./DropdownMenu"

export default function Header() {

  return (
	<div className="flex flex-row pt-9 p-3  w-full justify-between items-center">
		<DropdownIconMenu />
		<h1 className="flex text-4xl font-bold justify-center text-[#020817] dark:text-[#F8FAFC]">Dictionary</h1>
		<div className="w-6 h-6"/>
	</div>
  )
}
