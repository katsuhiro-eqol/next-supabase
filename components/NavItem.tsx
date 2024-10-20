"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";

type Props = {
    title: string,
    to: string
    dir: string
  }

const NavItem = (props:Props) => {
    const pathName = usePathname()
    const rootPath = pathName.split("/")[1]
    return (
        <>
        <Link href={props.to} className="flex flex-col cursor-pointer group w-15">
        {(rootPath == props.dir) ? (
            <p className="font-semibold opacity-50 group-hover:opacity-100 mb-1">{props.title}</p>
        ):(
            <p className="font-semibold opacity-20 group-hover:opacity-100 mb-1">{props.title}</p>
        )}
        </Link>
        </>
    )
}

export default NavItem;