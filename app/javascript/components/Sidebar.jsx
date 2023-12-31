import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  Cog6ToothIcon,
  ShoppingCartIcon,
  CircleStackIcon,
  PlusIcon,
  SignalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "./Logo";
import Favicon from "../../assets/images/favicon.svg";
import styled from "styled-components";

const navigation = [
  {
    name: "Fishing Rigs",
    icon: CircleStackIcon,
    href: "/rigs",
  },
  {
    name: "Rig Parts",
    icon: CircleStackIcon,
    href: "/fishing_components",
  },
  {
    name: "Gear",
    icon: ShoppingCartIcon,
    href: "#",
  },
  { name: "Activity", href: "#", icon: SignalIcon },
  { name: "Settings", href: "#", icon: Cog6ToothIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MobileOnlyDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media screen and (min-width: 640px) {
    display: none;
  }
`;

function SidebarItem({ item, current_url }) {
  return (
    <li key={item.name}>
      <div
        className={classNames(
          item.href == current_url
            ? "bg-gray-400 dark:bg-gray-800 text-white"
            : "text-gray-400 hover:text-white hover:bg-gray-400 dark:hover:bg-gray-800",
          "flex group justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
        )}
      >
        <a href={item.href} className="flex gap-x-3 w-full">
          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
          {item.name}
        </a>
        <a href={`${item.href}/new`} className="flex-none">
          <PlusIcon className="h-6 w-6 shrink-0" />
        </a>
      </div>
    </li>
  );
}

export default function Sidebar({ current_url }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between dark:invert">
        <MobileOnlyDiv className="xl:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-8 w-8" aria-hidden="true" />
          </button>
        </MobileOnlyDiv>
        <MobileOnlyDiv className="xl:hidden">R I G S</MobileOnlyDiv>
        <MobileOnlyDiv className="xl:hidden">
          <img className="p-1 h-8 w-8" src={Favicon} alt="Logo" />
        </MobileOnlyDiv>
      </div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 xl:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                  <div className="flex shrink-0 items-center justify-center">
                    <Logo />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      {navigation.map((item) => (
                        <SidebarItem
                          key={item.name}
                          item={item}
                          current_url={current_url}
                        />
                      ))}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
          <Logo />
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-4">
              {navigation.map((item) => (
                <SidebarItem
                  key={item.name}
                  item={item}
                  current_url={current_url}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
