import { Link } from "@inertiajs/react";
import React from "react";

const Sidebar = () => {
    const list = [
        {
            group: "Fakultas",
            children: [
                {
                    title: "Master Fakultas",
                    link: "fakultas.index",
                },
                {
                    title: "Create Fakultas",
                    link: "fakultas.create",
                },
            ],
        },
        {
            group: "Program Studi",
            children: [
                {
                    title: "Master Program Studi",
                    link: "fakultas.index",
                },
                {
                    title: "Create Program Studi",
                    link: "fakultas.create",
                },
            ],
        },
    ];
    return (
        <div className="w-1/4 bg-gray-100 h-screen">
            <ul className="m-4">
                {list.map((item) => (
                    <li key={item.group}>
                        <p className="font-semibold text-xl">{item.group}</p>
                        <ul>
                            {item.children.map((child) => (
                                <li key={child.title}>
                                    <Link href={route(child.link)}>
                                        {child.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
