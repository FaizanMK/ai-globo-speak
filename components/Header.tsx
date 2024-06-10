import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { userId } = auth();

  return (
    <header className="flex justify-between px-8 border-b mb-5">
      <div className="flex items-center h-20 overflow-hidden ">
        <Link href="/">
          <Image
            src="https://links.papareact.com/xgu"
            alt="logo"
            width={200}
            height={100}
            className="object-contain h-32 cursor-pointer"
          />
        </Link>
      </div>

      {userId ? (
        <UserButton />
      ) : (
        // forceRedirectUrl: after user sign in redirect the user to /translate page
        // mode: Determines what happens when a user clicks on the <SignInButton>. Setting this to 'redirect' will redirect the user to the sign-in route. Setting this to 'modal' will open a modal on the current route.
        <SignInButton forceRedirectUrl={"/translate"} mode="modal" />
      )}
    </header>
  );
};

export default Header;
